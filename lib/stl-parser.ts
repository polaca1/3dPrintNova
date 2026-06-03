// ---------------------------------------------------------------------------
// lib/stl-parser.ts – Client-side STL / OBJ file parser
// ---------------------------------------------------------------------------

export interface BoundingBox {
  /** Width in mm */
  widthMm: number;
  /** Height in mm */
  heightMm: number;
  /** Depth in mm */
  depthMm: number;
  /** Width in cm */
  width: number;
  /** Height in cm */
  height: number;
  /** Depth in cm */
  depth: number;
}

export interface ModelInfo {
  volumeCm3: number;
  boundingBox: BoundingBox;
  triangleCount: number;
  fileName: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

type Triangle = [
  [number, number, number],
  [number, number, number],
  [number, number, number],
];

/**
 * Signed volume of a tetrahedron formed by a triangle and the origin.
 * Sum over every triangle → total mesh volume (assuming a closed manifold).
 */
function signedVolumeOfTriangle(
  [x1, y1, z1]: [number, number, number],
  [x2, y2, z2]: [number, number, number],
  [x3, y3, z3]: [number, number, number],
): number {
  return (
    (x1 * (y2 * z3 - y3 * z2) +
      x2 * (y3 * z1 - y1 * z3) +
      x3 * (y1 * z2 - y2 * z1)) /
    6
  );
}

function computeMetrics(triangles: Triangle[]) {
  if (triangles.length === 0) {
    throw new Error("El archivo no contiene geometría válida (0 triángulos).");
  }

  let volumeMm3 = 0;
  let minX = Infinity,
    minY = Infinity,
    minZ = Infinity;
  let maxX = -Infinity,
    maxY = -Infinity,
    maxZ = -Infinity;

  for (const [v1, v2, v3] of triangles) {
    volumeMm3 += signedVolumeOfTriangle(v1, v2, v3);

    for (const [x, y, z] of [v1, v2, v3]) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (z < minZ) minZ = z;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (z > maxZ) maxZ = z;
    }
  }

  const widthMm = maxX - minX;
  const heightMm = maxY - minY;
  const depthMm = maxZ - minZ;

  return {
    volumeCm3: Math.abs(volumeMm3) / 1000, // mm³ → cm³
    boundingBox: {
      widthMm: round2(widthMm),
      heightMm: round2(heightMm),
      depthMm: round2(depthMm),
      width: round2(widthMm / 10),
      height: round2(heightMm / 10),
      depth: round2(depthMm / 10),
    },
    triangleCount: triangles.length,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ── Binary STL ───────────────────────────────────────────────────────────────

function isBinaryStl(buffer: ArrayBuffer): boolean {
  // A binary STL has an 80-byte header + 4-byte triangle count, then each
  // triangle occupies 50 bytes. If the size matches, treat it as binary.
  if (buffer.byteLength < 84) return false;
  const view = new DataView(buffer);
  const triangleCount = view.getUint32(80, true);
  const expectedSize = 84 + triangleCount * 50;
  // Allow slight size mismatch (some exporters pad extra bytes)
  return Math.abs(buffer.byteLength - expectedSize) < 100;
}

function parseBinaryStl(buffer: ArrayBuffer): Triangle[] {
  const view = new DataView(buffer);
  const triangleCount = view.getUint32(80, true);

  if (triangleCount === 0) {
    throw new Error("El archivo STL binario indica 0 triángulos.");
  }

  // Sanity check – protect against absurdly large counts in corrupt files
  if (triangleCount > 20_000_000) {
    throw new Error(
      "El archivo STL indica más de 20 M de triángulos – puede estar dañado.",
    );
  }

  const triangles: Triangle[] = new Array(triangleCount);
  let offset = 84; // skip header (80) + count (4)

  for (let i = 0; i < triangleCount; i++) {
    // Skip normal vector (12 bytes)
    offset += 12;

    const v1: [number, number, number] = [
      view.getFloat32(offset, true),
      view.getFloat32(offset + 4, true),
      view.getFloat32(offset + 8, true),
    ];
    offset += 12;

    const v2: [number, number, number] = [
      view.getFloat32(offset, true),
      view.getFloat32(offset + 4, true),
      view.getFloat32(offset + 8, true),
    ];
    offset += 12;

    const v3: [number, number, number] = [
      view.getFloat32(offset, true),
      view.getFloat32(offset + 4, true),
      view.getFloat32(offset + 8, true),
    ];
    offset += 12;

    // Skip attribute byte count (2 bytes)
    offset += 2;

    triangles[i] = [v1, v2, v3];
  }

  return triangles;
}

// ── ASCII STL ────────────────────────────────────────────────────────────────

function parseAsciiStl(text: string): Triangle[] {
  const triangles: Triangle[] = [];

  // Match vertex lines
  const vertexRegex =
    /vertex\s+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)\s+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)\s+([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)/gi;

  const vertices: [number, number, number][] = [];
  let match: RegExpExecArray | null;

  while ((match = vertexRegex.exec(text)) !== null) {
    vertices.push([
      parseFloat(match[1]),
      parseFloat(match[2]),
      parseFloat(match[3]),
    ]);
  }

  if (vertices.length < 3 || vertices.length % 3 !== 0) {
    throw new Error(
      `STL ASCII inválido: se encontraron ${vertices.length} vértices (se necesitan múltiplos de 3).`,
    );
  }

  for (let i = 0; i < vertices.length; i += 3) {
    triangles.push([vertices[i], vertices[i + 1], vertices[i + 2]]);
  }

  return triangles;
}

// ── OBJ ──────────────────────────────────────────────────────────────────────

function parseObj(text: string): Triangle[] {
  const vertices: [number, number, number][] = [];
  const triangles: Triangle[] = [];

  const lines = text.split(/\r?\n/);

  for (const raw of lines) {
    const line = raw.trim();

    // Vertex line: v x y z
    if (/^v\s/.test(line)) {
      const parts = line.split(/\s+/);
      if (parts.length >= 4) {
        vertices.push([
          parseFloat(parts[1]),
          parseFloat(parts[2]),
          parseFloat(parts[3]),
        ]);
      }
    }

    // Face line: f v1 v2 v3 [v4 ...]  – indices can be v, v/vt, v/vt/vn, v//vn
    if (/^f\s/.test(line)) {
      const parts = line.split(/\s+/).slice(1);
      const faceIndices = parts.map((p) => {
        const idx = parseInt(p.split("/")[0], 10);
        // OBJ indices are 1-based; handle negative indices
        return idx > 0 ? idx - 1 : vertices.length + idx;
      });

      // Triangulate fan-style for faces with > 3 vertices
      for (let i = 1; i < faceIndices.length - 1; i++) {
        const i0 = faceIndices[0];
        const i1 = faceIndices[i];
        const i2 = faceIndices[i + 1];

        if (
          i0 < 0 ||
          i1 < 0 ||
          i2 < 0 ||
          i0 >= vertices.length ||
          i1 >= vertices.length ||
          i2 >= vertices.length
        ) {
          continue; // skip invalid face references
        }

        triangles.push([vertices[i0], vertices[i1], vertices[i2]]);
      }
    }
  }

  if (triangles.length === 0) {
    throw new Error(
      "El archivo OBJ no contiene caras válidas o está vacío.",
    );
  }

  return triangles;
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Parse an STL or OBJ file and return model information.
 * Runs entirely client-side using the File API.
 */
export async function parseModelFile(file: File): Promise<ModelInfo> {
  if (!file || file.size === 0) {
    throw new Error("El archivo está vacío o no se pudo leer.");
  }

  const name = file.name.toLowerCase();
  const isObj = name.endsWith(".obj");
  const isStl = name.endsWith(".stl");
  const is3mf = name.endsWith(".3mf");

  if (!isObj && !isStl && !is3mf) {
    throw new Error(
      "Formato no soportado. Sube un archivo .stl, .obj o .3mf.",
    );
  }

  if (is3mf) {
    throw new Error(
      "El formato .3mf aún no está soportado para análisis automático. Por favor, convierte a STL o envía el archivo por WhatsApp.",
    );
  }

  try {
    let triangles: Triangle[];

    if (isObj) {
      const text = await file.text();
      triangles = parseObj(text);
    } else {
      // STL – try binary first, fall back to ASCII
      const buffer = await file.arrayBuffer();

      if (isBinaryStl(buffer)) {
        triangles = parseBinaryStl(buffer);
      } else {
        const text = new TextDecoder("utf-8").decode(buffer);
        triangles = parseAsciiStl(text);
      }
    }

    const { volumeCm3, boundingBox, triangleCount } =
      computeMetrics(triangles);

    return {
      volumeCm3: round2(volumeCm3),
      boundingBox,
      triangleCount,
      fileName: file.name,
    };
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("Error inesperado al procesar el archivo 3D.");
  }
}
