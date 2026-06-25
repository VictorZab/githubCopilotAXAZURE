# GitHub Copilot · Página corporativa de adopción AXAZURE

Sitio estático corporativo de apoyo a los usuarios de AXAZURE durante la implantación de GitHub Copilot. Su objetivo es:

- Explicar por qué la empresa está implantando esta solución.
- Servir como punto de apoyo y referencia para resolver dudas habituales.
- Reforzar el uso responsable, homogéneo y dentro del marco corporativo.

## Previsualizar en local

No necesitas servidor. Abre `index.html` directamente en el navegador. Para que las fuentes y las imágenes carguen correctamente desde rutas relativas, usa un servidor local mínimo:

```bash
# Con Python (viene instalado en la mayoría de sistemas):
python -m http.server 8080
# Abre: http://localhost:8080

# Con Node.js (si tienes npx):
npx serve .
```

## Estructura de carpetas

```
copilot-adopcion-axazure/
├── index.html                       ← sitio completo
├── css/style.css                    ← design tokens + estilos
├── js/main.js                       ← animaciones y JS
├── assets/
│   ├── brand/                       ← logos oficiales Axazure (SVG)
│   ├── fonts/                       ← fuentes corporativas (Noto Sans + Comfortaa)
│   ├── screenshots/                 ← capturas de pantalla
│   └── video/demo.mp4               ← vídeo demo (opcional)
└── README.md
```

## Marca corporativa aplicada

- **Logos:** `assets/brand/axazure-logo.svg` (color), `axazure-logo-blanco.svg` (sobre fondo oscuro) y variantes del imago (`axazure-imago-*.svg`).
- **Paleta oficial Axazure** declarada como tokens base en `css/style.css`:
  - `--color-aquamarine` `#28C5C9` · acento principal
  - `--color-ash-blue` `#1C2541` · primario oscuro
  - `--color-space-cadet` `#3A506B` · secundario
  - `--color-white-smoke` `#F5F5F5` · fondo claro
- **Tipografía corporativa**:
  - `Noto Sans` (fuente principal de cuerpo y display)
  - `Comfortaa Bold` (reservada para usos de marca/logo)
  - Cargadas como `@font-face` desde `assets/fonts/` (sin dependencia de Google Fonts).

Para futuros rebrandings basta con sobrescribir los **tokens semánticos** (`--brand-primary`, `--brand-accent`, `--brand-surface`, `--font-display`, `--font-body`) al inicio de `css/style.css`. El resto del sitio se adapta automáticamente.

## Añadir el vídeo demo

Coloca el fichero en `assets/video/demo.mp4`. El sitio lo detecta automáticamente y reemplaza el placeholder.

---

## Despliegue como web pública (sin login)

Es una web estática de consulta, sin datos sensibles. Tienes dos opciones rápidas y gratuitas para publicarla con una URL fija que puedas compartir por correo, Teams, Slack o donde quieras. El `<meta name="robots" content="noindex,nofollow">` ya está incluido para que **no aparezca en buscadores** aunque sea pública.

### Opción A — GitHub Pages (la más simple, ~5 minutos)

1. Crea un repositorio en GitHub (puede ser público o privado, ambos funcionan con Pages).
2. Sube el contenido de esta carpeta al repo:

   ```bash
   git init
   git add .
   git commit -m "Página corporativa de adopción Copilot"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario-o-org>/<nombre-repo>.git
   git push -u origin main
   ```

3. En el repo → **Settings** → **Pages**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` · Folder: `/ (root)`
   - **Save**

4. En 1–2 minutos GitHub te dará la URL pública:

   ```
   https://<tu-usuario-o-org>.github.io/<nombre-repo>/
   ```

   **Esa es la URL que compartes con la gente de Axazure.**

### Opción B — Cloudflare Pages (también muy simple, dominio más limpio)

1. Sube la carpeta a GitHub (mismos pasos del 1 y 2 de arriba).
2. Entra en [pages.cloudflare.com](https://pages.cloudflare.com) → **Create project** → **Connect to Git** → selecciona el repo.
3. Build settings:
   - Framework preset: **None**
   - Build command: *(vacío)*
   - Build output directory: `/`
4. **Save and Deploy**.

Cloudflare te da una URL del tipo:

```
https://<nombre-proyecto>.pages.dev
```

### Dominio personalizado (opcional)

Si quieres una URL más corta y corporativa tipo `copilot.axazure.com`, tanto GitHub Pages como Cloudflare Pages permiten configurar un **dominio personalizado**:

- Cloudflare Pages → Custom domains → añade `copilot.axazure.com` y configura el `CNAME` en el DNS de Axazure.
- GitHub Pages → Settings → Pages → Custom domain → mismo proceso.

Ambos gestionan el certificado SSL automáticamente.

---

## Actualizar el contenido de la web

Cualquier cambio en `index.html`, `css/style.css`, `js/main.js` o `assets/` se publica automáticamente con un `git push` al repositorio:

```bash
git add .
git commit -m "Actualización contenido"
git push
```

GitHub Pages / Cloudflare Pages republican la web en 1–2 minutos.

---

> AXAZURE · Página corporativa de soporte a la adopción de IA


