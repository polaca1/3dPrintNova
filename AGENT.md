# AGENT.md

## Estado actual del proyecto

- Proyecto iniciado desde un workspace vacio en `C:\Users\elpop\antigravity\3dPrintNova`.
- No existian `package.json`, estructura de Next.js ni memoria tecnica previa.
- Se leyo el estado del workspace antes de empezar a programar. `AGENT.md` no existia y se crea en esta sesion.
- Sesion actual: landing + tienda online de 3DPrintNova implementada con Next.js 15 App Router, TypeScript, TailwindCSS, Framer Motion, GSAP, Lenis, React Three Fiber, Three.js, shadcn-style UI y lucide-react.
- La web esta disponible en dev server en `http://localhost:3000` cuando `npm.cmd run dev -- --port 3000` esta corriendo.
- El proyecto ya es un repositorio Git local en rama `main`.
- El remoto `origin` apunta a `https://github.com/polaca1/3dPrintNova.git` y `main` sigue a `origin/main`.
- Push realizado a GitHub: `https://github.com/polaca1/3dPrintNova`.
- GitHub Pages esta publicado en `https://polaca1.github.io/3dPrintNova/` desde la rama `gh-pages`.

## Ultimos cambios realizados

- Creado este archivo `AGENT.md` como diario tecnico obligatorio del proyecto.
- Creada configuracion base de Next.js 15: `package.json`, `tsconfig.json`, `next-env.d.ts`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `eslint.config.mjs` y `lib/utils.ts`.
- Creadas carpetas `app`, `components`, `components/site`, `components/ui` y `lib`.
- Sesion 2026-06-03: se leyo `AGENT.md` completo antes de modificar archivos.
- Instaladas dependencias declaradas con `npm.cmd install`; se creo `package-lock.json` y `node_modules`.
- Actualizado Next dentro de la rama 15 con `npm.cmd install next@15 eslint-config-next@15`; `package.json` queda en `next` y `eslint-config-next` `^15.5.19`.
- Creado `app/page.tsx` con JSON-LD de negocio local y ofertas/productos.
- Creado `components/site/home-page.tsx` como shell de secciones y registro GSAP/ScrollTrigger.
- Creado `components/site/site-nav.tsx` con navegacion responsive, mobile menu, dark/light toggle y CTA WhatsApp.
- Creado `components/site/hero-section.tsx` con hero cinematografico, CTAs, mouse parallax y escena 3D.
- Creado `components/site/nova-scene.tsx` con escena React Three Fiber: impresora 3D, pieza por capas, filamento curvo, particulas, luces, OrbitControls y objetos 3D flotantes de catalogo.
- La escena 3D se enriquecio tras feedback del usuario porque la primera captura se veia demasiado plana; se añadieron jarron, engranaje/repuesto, dock gaming, placa/logo y miniatura orbitando.
- Creado `components/site/trust-section.tsx` con trust cards, cobertura local y ticker de ciudades.
- Creado `components/site/catalog-section.tsx` con categorias, filtros animados, quick view, wishlist y CTA de pedido por WhatsApp.
- Creado `components/site/custom-builder.tsx` con subida de STL/referencia, tamaño, material, color, cantidad, precio dinamico y preview.
- Creado `components/site/process-section.tsx` con timeline sticky y scroll-driven line.
- Creado `components/site/showcase-section.tsx` con galeria masonry premium.
- Creado `components/site/social-proof-section.tsx` con reviews, contadores animados y bloque TikTok.
- Creado `components/site/contact-footer.tsx` con CTA final, WhatsApp, email, TikTok, logistica y footer glass.
- Actualizado `app/globals.css` con tema claro/oscuro, utilidades de profundidad, hero grid, keyframes, timeline scroll-driven y estilos base.
- Creado `scripts/visual-qa.mjs` para capturas Playwright mobile/desktop, deteccion de canvas no vacio, motion, overflow horizontal, secciones y CTA visible.
- Instalado `@playwright/test` como devDependency y descargado Chromium de Playwright con `npx.cmd playwright install chromium`.
- Actualizado `eslint.config.mjs` para ignorar `.next/**`, `node_modules/**`, `visual-artifacts/**` y `next-env.d.ts`.
- Creado `.gitignore` para excluir `node_modules`, `.next`, logs, cache, `visual-artifacts` y `*.tsbuildinfo`.
- Inicializado repositorio Git local con `git init`.
- Añadido script `visual:qa` en `package.json` para ejecutar `node scripts/visual-qa.mjs`.
- Creado commit local inicial con mensaje `Build 3DPrintNova landing experience`.
- Renombrada rama local de `master` a `main`.
- Cambiado `dev` de `next dev --turbopack` a `next dev` estable; se dejo `dev:turbo` para uso opcional.
- Configurado remoto `origin` como `https://github.com/polaca1/3dPrintNova.git`.
- Ejecutado `git push -u origin main`; la rama local `main` queda siguiendo `origin/main`.
- Configurado despliegue a GitHub Pages mediante workflow `.github/workflows/deploy.yml`.
- Actualizado `next.config.ts` para usar `output: "export"`, `basePath: "/3dPrintNova"`, `assetPrefix` y `images.unoptimized` cuando `GITHUB_PAGES=true`.
- Marcadas `app/robots.ts` y `app/sitemap.ts` como `dynamic = "force-static"` para que funcionen con export estatico.
- Actualizado el contacto principal de la web a WhatsApp `+34 623 35 12 07`.
- Cambiado el workflow de Pages para publicar el export estatico en la rama `gh-pages` en vez de depender de `actions/configure-pages`.
- Actualizado `eslint.config.mjs` para ignorar `out/**`.
- Reconstruido `out` con `GITHUB_PAGES=true` y publicado manualmente en `gh-pages` con commit `5863a2a`.
- Verificada la URL publica `https://polaca1.github.io/3dPrintNova/`: responde `200 OK`, contiene `34623351207` y no contiene el numero antiguo.
- Sesion Safe Browsing: Chrome muestra pantalla roja "Sitio peligroso" para `https://polaca1.github.io/3dPrintNova/`.
- Revisado el export y la URL publicada: responde `200 OK`, sin redirects raros, sin scripts externos sospechosos, sin iframes y sin numero antiguo.
- Ejecutado `npm audit`; se detecto vulnerabilidad moderada de `postcss` dentro de Next 15.
- Actualizado `package.json` con `postcss` fijo en `8.5.15` y override global para que Next use la version parcheada; `npm install` paso a `found 0 vulnerabilities`.
- Reconstruido el export estatico limpio con `GITHUB_PAGES=true`, pero el push a `gh-pages` quedo pendiente porque el entorno corto acciones elevadas por limite de uso.

## Reglas del proyecto

- Leer siempre `AGENT.md` completo antes de escribir, modificar o borrar codigo/configuracion.
- Actualizar `AGENT.md` despues de cada cambio importante con archivos tocados, comandos, errores, soluciones y pendientes.
- Mantener la web con estetica premium AI/SaaS, cyberpunk elegante, motion avanzado, responsive mobile-first y alto impacto visual.
- Cuidar que el sitio se vea bonito tanto en movil como en PC antes de dar el trabajo por terminado.
- Mantener objetos 3D y profundidad visual; evitar que la landing vuelva a sentirse plana.
- Contacto principal actualizado: WhatsApp `+34 623 35 12 07`.
- Para presupuestos, calcular siempre a precio de amigo porque el cliente tiene 14 anos; priorizar una cifra clara, asequible y proporcional al alcance real.
- Separar precio de lo ya implementado y precio de futuras ampliaciones como ecommerce real, panel admin, fotos/productos reales o dominio.
- Al publicar en GitHub Pages, reconstruir el export estatico para no subir contenido antiguo.

## Presupuesto orientativo

- Trabajo ya implementado: landing premium, tienda visual preparada, builder de presupuesto, animaciones, escena 3D, SEO, responsive, QA, GitHub y Pages.
- Precio realista de mercado: 700-1.200 EUR por alcance y complejidad.
- Precio de amigo recomendado para este cliente: 160-220 EUR cerrado.
- Recomendacion actual: 180 EUR por todo lo hecho y publicado, dejando claro que ecommerce real con pagos, stock y panel se presupuesta aparte.

## Errores encontrados

- `Get-Content -Raw -LiteralPath AGENT.md` fallo porque el archivo no existia.
- `Get-Content -Raw -LiteralPath package.json` fallo porque el proyecto aun no estaba inicializado.
- `npm.cmd install` mostro aviso deprecado para `next@15.3.3` por CVE, aunque `npm.cmd audit` termino con `found 0 vulnerabilities`.
- Tras actualizar Next, `npm.cmd install next@15 eslint-config-next@15` mostro temporalmente "2 moderate severity vulnerabilities"; un `npm.cmd audit` posterior reporto `found 0 vulnerabilities`.
- `next build` dentro del sandbox fallo con `spawn EPERM`; se soluciono ejecutando el build con permisos elevados.
- `npm.cmd run dev -- --port 3000` dentro del sandbox fallo con `spawn EPERM`; se soluciono levantando el dev server con permisos elevados.
- `Start-Process` fallo por error de entorno de PowerShell: clave duplicada `Path/PATH`; se evito usando una sesion de terminal para el dev server.
- La primera QA visual con Playwright fallo porque Chromium no estaba descargado.
- `npx playwright install chromium` fallo por politica de ejecucion de PowerShell sobre `npx.ps1`; se uso `npx.cmd playwright install chromium`.
- Playwright dentro del sandbox fallo con `spawn EPERM` al lanzar Chromium; se ejecuto el script con permisos elevados.
- La primera medicion de canvas dio `0 lit pixels` aunque las capturas mostraban escena; se activo `preserveDrawingBuffer` en el Canvas y se añadio medicion de movimiento entre frames.
- Tras el build, `npm.cmd run lint` intento analizar `.next` y genero miles de errores de archivos generados; se ajusto `eslint.config.mjs` para ignorar salidas generadas.
- La primera version de la escena 3D se veia plana y con pocos objetos en capturas; se enriquecio con una nube de productos 3D.
- `git add .` dentro del sandbox fallo con `Unable to create .git/index.lock: Permission denied`; se resolvio ejecutando `git add .` con permisos elevados.
- `git commit` fallo inicialmente porque Git no tenia identidad de autor configurada.
- `gh --version` fallo porque GitHub CLI no esta instalado.
- No hay remoto Git configurado; `git remote -v` no devuelve entradas.
- El dev server con Turbopack mostro un panic inesperado sobre `app/globals.css`, aunque recompilo despues.
- Antes de recibir el enlace de GitHub no se pudo hacer push porque no habia remoto; tras recibir `polaca1/3dPrintNova`, se configuro y se hizo push correctamente.
- El primer build con `GITHUB_PAGES=true` fallo porque `/robots.txt` y `/sitemap.xml` no estaban marcados como rutas estaticas para `output: export`.
- El primer workflow oficial de GitHub Pages fallo en `Setup Pages`; la API de Pages respondia `404`, asi que se cambio la estrategia de despliegue.
- `npm.cmd run lint` fallo al analizar archivos generados dentro de `out/_next/static`; `out` estaba en `.gitignore`, pero no en los ignores de ESLint.
- La API `https://api.github.com/repos/polaca1/3dPrintNova/pages` siguio devolviendo `404` aunque la URL publica de Pages ya servia `200 OK`.
- Chrome/Safe Browsing marca la URL de GitHub Pages como peligrosa aunque el sitio devuelve `200 OK`; esto requiere revision de Google Safe Browsing/Search Console o mover el sitio a un dominio/hosting no marcado.
- `npm audit` encontro `postcss <8.5.10` dentro de `node_modules/next/node_modules/postcss`.
- El override anidado `{ "next": { "postcss": "8.5.15" } }` no actualizo la copia interna de Next.
- El override global inicial fallo con `EOVERRIDE` porque la dependencia directa `postcss` estaba declarada como rango `^8.5.4`.
- `git -C out add .` fue rechazado por limite de uso de acciones elevadas; no intentar rodearlo con otro metodo sin aprobacion/credito disponible.

## Soluciones aplicadas

- Se crea `AGENT.md` antes de escribir codigo de aplicacion.
- Se ejecuto `npm.cmd audit` despues de instalar dependencias para comprobar el estado de seguridad reportado localmente.
- Se mantuvo el requisito de Next.js 15 actualizando a un patch mas reciente en lugar de saltar a una major distinta.
- Se paso `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build` y `node scripts\visual-qa.mjs` tras los cambios principales.
- Se verifico mobile y desktop con Playwright: sin overflow horizontal, todas las secciones presentes, H1 visible, CTA primario visible y canvas 3D con pixeles no vacios y movimiento detectado.
- Se dejaron capturas en `visual-artifacts/mobile-hero.png`, `visual-artifacts/desktop-hero.png`, `visual-artifacts/mobile-canvas.png` y `visual-artifacts/desktop-canvas.png`.
- Se corrigio ESLint para no analizar outputs generados.
- Se configuro identidad Git local del repo: `user.name=3DPrintNova` y `user.email=printnovagroup@gmail.com`.
- Para evitar el panic de Turbopack durante pruebas locales, `npm.cmd run dev` usa Webpack/Next dev estable y `npm.cmd run dev:turbo` queda como alternativa.
- Se publico la rama `main` en GitHub con upstream `origin/main`.
- Se soluciono el build de GitHub Pages añadiendo `export const dynamic = "force-static"` en `app/robots.ts` y `app/sitemap.ts`.
- Se verifico build estatico local con `GITHUB_PAGES=true` y `NEXT_PUBLIC_SITE_URL=https://polaca1.github.io/3dPrintNova`; el export genera `out` correctamente.

- Se cambio el deploy a estrategia de rama `gh-pages`, que funciona aunque la configuracion oficial de Pages via Actions no este disponible desde la API.
- Se agrego `out/**` a `eslint.config.mjs` para evitar lintar bundles generados.
- Se publico `out` en la rama remota `gh-pages` y se comprobo la URL publica con `Invoke-WebRequest`.
- Se fijo `postcss` a `8.5.15` y se agrego override global `"postcss": "8.5.15"` para limpiar `npm audit` sin romper Next.js 15.
- Se verifico `npm audit --audit-level=moderate` con `found 0 vulnerabilities`.
- Se reconstruyo `out` con el arbol de dependencias limpio; falta commitear/pushear los cambios por limite de acciones elevadas.

## Decisiones tecnicas

- Se va a crear una aplicacion Next.js 15 con App Router, TypeScript, TailwindCSS, Framer Motion, GSAP, Lenis, Three.js / React Three Fiber, componentes estilo shadcn y lucide-react.
- El sitio se enfocara como landing + tienda preparada para ecommerce futuro, con datos mock modulares para catalogo, categorias, reviews y builder personalizado.
- Se adopta TailwindCSS v3 con variables CSS para tema oscuro, utilidades de glow, animaciones y `darkMode: ["class"]`.
- Se incluyen scripts `dev`, `build`, `start`, `typecheck` y `lint`.
- `dev` se mantiene sin Turbopack por estabilidad local; no volver a usar Turbopack como ruta principal hasta verificar que el panic desaparece.
- Se mantiene una sola pagina principal con componentes de seccion separados para escalabilidad.
- Se usa WhatsApp como conversion principal y los links se precargan con mensajes contextuales por producto/builder.
- Se usa JSON-LD `LocalBusiness` para SEO local y ofertas de catalogo.
- Se usa React Three Fiber con primitivas geometricales en vez de assets externos para no depender de modelos remotos y mantener el proyecto portable.
- Se usa `preserveDrawingBuffer: true` en el Canvas para permitir QA automatizada del render WebGL.
- Se usa Playwright como verificacion visual local, no como test suite formal de CI todavia.
- Se ignora `.next` en ESLint; no volver a lintar carpetas generadas.
- GitHub Pages se despliega publicando el export estatico en la rama `gh-pages`; evitar `actions/configure-pages` si la API de Pages devuelve `404`.
- El build de Pages usa `GITHUB_PAGES=true` para activar base path solo en produccion de Pages; el desarrollo local conserva rutas normales.

## Pendientes

- Opcional: configurar dominio final si se compra uno; GitHub Pages ya esta publicado en `https://polaca1.github.io/3dPrintNova/`.
- Resolver pantalla roja de Chrome: reportar falso positivo en Google Safe Browsing y pedir revision en Search Console, o publicar en un dominio propio/hosting alternativo si se necesita solucion inmediata de cara al cliente.
- Pendiente por limite de acciones elevadas: commitear `package.json`, `package-lock.json` y `AGENT.md`; republicar `out` a `gh-pages`.
- Sustituir productos mock por fotos/videos reales cuando existan.
- Conectar ecommerce real despues: carrito, stock, checkout, Bizum/Stripe, pedidos y panel admin.
- Revisar rendimiento si se anaden modelos GLB pesados; hoy la escena usa primitivas.

## Comandos ejecutados

- `Get-ChildItem -Force`
- `Get-Content -Raw -LiteralPath AGENT.md`
- `Get-Content -Raw -LiteralPath package.json`
- `rg --files`
- `New-Item -ItemType Directory -Force app,components,components\site,components\ui,lib`
- `rg --files`
- `Get-ChildItem -Force`
- `Test-Path AGENT.md`
- `Get-Content -Raw AGENT.md`
- `Get-Content -Raw package.json`
- `Get-Content -Raw app\layout.tsx`
- `Get-Content -Raw app\globals.css`
- `Get-Content -Raw components\site\loading-experience.tsx`
- `Get-Content -Raw components\site\lenis-provider.tsx`
- `Get-Content -Raw components\site\scroll-progress-rail.tsx`
- `Get-Content -Raw components\site\section-heading.tsx`
- `Get-Content -Raw lib\data.ts`
- `Get-Content -Raw tailwind.config.ts`
- `Get-Content -Raw components\ui\button.tsx`
- `Get-Content -Raw components\ui\badge.tsx`
- `Get-Content -Raw lib\utils.ts`
- `Get-ChildItem -Force app`
- `Get-Content -Raw app\robots.ts`
- `Get-Content -Raw app\sitemap.ts`
- `Test-Path node_modules`
- `Test-Path package-lock.json`
- `Get-Content -Raw next.config.ts`
- `Get-Content -Raw tsconfig.json`
- `Get-Content -Raw eslint.config.mjs`
- `npm.cmd install`
- `npm.cmd audit`
- `npm.cmd install next@15 eslint-config-next@15`
- `npm.cmd audit`
- `git status --short`
- `New-Item -ItemType Directory -Force scripts`
- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd run dev -- --port 3000`
- `npm.cmd install -D @playwright/test`
- `npx.cmd playwright install chromium`
- `node scripts\visual-qa.mjs`
- `Get-Command npm.cmd | Select-Object -ExpandProperty Source`
- `Get-Content -Raw next-dev.err.log`
- `Get-Content -Raw next-dev.log`
- `Get-Content -Raw -Encoding UTF8 AGENT.md`
- `git init`
- `git --version`
- `git status --short`
- `git add .`
- `git commit -m "Build 3DPrintNova landing experience"`
- `git config user.name 3DPrintNova`
- `git config user.email printnovagroup@gmail.com`
- `git branch -M main`
- `git remote -v`
- `gh --version`
- `git log --oneline -2`
- `npm.cmd run visual:qa`
- `git remote add origin https://github.com/polaca1/3dPrintNova.git`
- `git push -u origin main`
- `cmd.exe /d /c "set GITHUB_PAGES=true&& set NEXT_PUBLIC_SITE_URL=https://polaca1.github.io/3dPrintNova&& npm.cmd run build"`
- `rg "/3dPrintNova/_next" out\index.html`
- `Get-ChildItem -Recurse -Depth 2 out | Select-Object FullName`
- `Get-Content -Raw -Encoding UTF8 out\robots.txt`
- `Get-Content -Raw -Encoding UTF8 out\sitemap.xml`

- `npm.cmd run typecheck`
- `npm.cmd run lint`
- `cmd.exe /d /c "set GITHUB_PAGES=true&& set NEXT_PUBLIC_SITE_URL=https://polaca1.github.io/3dPrintNova&& npm.cmd run build"`
- `Test-Path out\.git`
- `Test-Path out\.nojekyll`
- `rg -n "34623351207|\+34 623 35 12 07|3dPrintNova/_next|34687591431|\+34 687" out\index.html out\robots.txt out\sitemap.xml`
- `New-Item -ItemType File -Force out\.nojekyll`
- `git -C out init`
- `git -C out config user.name 3DPrintNova`
- `git -C out config user.email printnovagroup@gmail.com`
- `git -C out checkout -B gh-pages`
- `git -C out add .`
- `git -C out commit -m "Deploy 3DPrintNova static site"`
- `git -C out remote add origin https://github.com/polaca1/3dPrintNova.git`
- `git -C out push --force origin gh-pages`
- `Invoke-RestMethod -Uri 'https://api.github.com/repos/polaca1/3dPrintNova/pages'`
- `Invoke-WebRequest -Uri 'https://polaca1.github.io/3dPrintNova/' -UseBasicParsing`
- `git ls-remote --heads origin gh-pages`

## Notas para el siguiente agente

- Leer este archivo completo antes de modificar codigo.
- Mantener las actualizaciones despues de cambios importantes.
- No asumir estado previo si no esta registrado aqui.
- No usar `npx` en PowerShell; usar `npx.cmd` por politica de ejecucion.
- `next build`, dev server y Playwright pueden requerir permisos elevados por `spawn EPERM`.
- Si se ejecuta build antes de lint, asegurarse de que `.next/**` siga ignorado por ESLint.
- El dev server elevado sigue siendo necesario para QA visual en este entorno.
- El remoto ya esta configurado como `origin`; futuros cambios se publican con `git push`.
- En este entorno, escribir en `.git` puede requerir permisos elevados.
- Evitar `next dev --turbopack` como flujo principal: se observo panic de Turbopack en `app/globals.css`.
