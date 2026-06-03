import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.QA_URL ?? "http://localhost:3000";
const outDir = path.resolve("visual-artifacts");

const viewports = [
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2 },
  { name: "desktop", width: 1440, height: 1100, deviceScaleFactor: 1 },
];

async function launchBrowser() {
  const candidates = [
    { channel: "chrome" },
    { channel: "msedge" },
    {},
  ];

  let lastError;

  for (const candidate of candidates) {
    try {
      return await chromium.launch({
        ...candidate,
        args: ["--disable-gpu-sandbox"],
        headless: true,
      });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

async function canvasProbe(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector("canvas");

    if (!canvas) {
      return {
        found: false,
        litPixels: 0,
        motionDelta: 0,
        samplePixels: 0,
        width: 0,
        height: 0,
      };
    }

    const rect = canvas.getBoundingClientRect();

    function sample() {
      const probe = document.createElement("canvas");
      const sampleWidth = 96;
      const sampleHeight = 96;
      probe.width = sampleWidth;
      probe.height = sampleHeight;

      const ctx = probe.getContext("2d", { willReadFrequently: true });

      if (!ctx) {
        return { hash: 0, litPixels: 0, samplePixels: 0 };
      }

      ctx.drawImage(canvas, 0, 0, sampleWidth, sampleHeight);
      const data = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
      let litPixels = 0;
      let hash = 0;

      for (let index = 0; index < data.length; index += 4) {
        const alpha = data[index + 3];
        const luminance = data[index] + data[index + 1] + data[index + 2];

        if (alpha > 12 && luminance > 34) {
          litPixels += 1;
        }

        if (index % 32 === 0) {
          hash = (hash + luminance * (index + 17)) % 1_000_000_007;
        }
      }

      return { hash, litPixels, samplePixels: sampleWidth * sampleHeight };
    }

    const first = sample();

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const second = sample();

        resolve({
          found: true,
          litPixels: second.litPixels,
          motionDelta: Math.abs(second.hash - first.hash),
          samplePixels: second.samplePixels,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }, 700);
    });
  });
}

async function layoutProbe(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const sections = [
      "inicio",
      "confianza",
      "catalogo",
      "builder",
      "proceso",
      "showcase",
      "social",
      "contacto",
    ];

    return {
      horizontalOverflow: doc.scrollWidth - window.innerWidth,
      missingSections: sections.filter((id) => !document.getElementById(id)),
      heroHeadingVisible: Boolean(
        [...document.querySelectorAll("h1")].find((node) =>
          node.textContent?.includes("Convertimos ideas"),
        ),
      ),
    };
  });
}

await mkdir(outDir, { recursive: true });

const browser = await launchBrowser();
const results = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      deviceScaleFactor: viewport.deviceScaleFactor,
      viewport: { width: viewport.width, height: viewport.height },
    });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60_000 });
    await page.waitForTimeout(3200);
    await page.locator("canvas").first().waitFor({ timeout: 20_000 });

    const heroShot = path.join(outDir, `${viewport.name}-hero.png`);
    await page.screenshot({ path: heroShot, fullPage: false });
    await page.locator("canvas").first().screenshot({
      path: path.join(outDir, `${viewport.name}-canvas.png`),
    });

    const canvas = await canvasProbe(page);
    const layout = await layoutProbe(page);
    const ctaBox = await page
      .getByRole("link", { name: /Crear mi diseño/i })
      .first()
      .boundingBox();

    results.push({
      viewport: viewport.name,
      canvas,
      layout,
      ctaVisible: Boolean(ctaBox && ctaBox.width > 80 && ctaBox.height > 36),
      screenshot: heroShot,
    });

    await context.close();
  }
} finally {
  await browser.close();
}

const failures = results.flatMap((result) => {
  const issues = [];

  if (!result.canvas.found) {
    issues.push(`${result.viewport}: canvas not found`);
  }

  if (result.canvas.litPixels < 420) {
    issues.push(`${result.viewport}: canvas appears blank (${result.canvas.litPixels} lit pixels)`);
  }

  if (result.canvas.motionDelta < 12) {
    issues.push(`${result.viewport}: canvas motion not detected (${result.canvas.motionDelta})`);
  }

  if (result.layout.horizontalOverflow > 2) {
    issues.push(`${result.viewport}: horizontal overflow ${result.layout.horizontalOverflow}px`);
  }

  if (result.layout.missingSections.length) {
    issues.push(`${result.viewport}: missing sections ${result.layout.missingSections.join(", ")}`);
  }

  if (!result.layout.heroHeadingVisible) {
    issues.push(`${result.viewport}: hero heading not visible`);
  }

  if (!result.ctaVisible) {
    issues.push(`${result.viewport}: primary CTA not visible`);
  }

  return issues;
});

console.log(JSON.stringify({ baseUrl, results, failures }, null, 2));

if (failures.length) {
  process.exitCode = 1;
}
