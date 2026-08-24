# AI Solutions

Landing page de AI Solutions — soluciones de inteligencia artificial para industria, agroindustria y construcción.

Construido con Vite + React + TypeScript + Tailwind CSS + shadcn/ui.

## Requisitos

- Node.js (ver `.nvmrc` si existe, o cualquier versión LTS reciente)
- [Yarn](https://yarnpkg.com/) como gestor de paquetes (es el único lockfile del repo — no usar `npm install` ni `bun install`)

## Empezar

```bash
yarn install
yarn dev
```

El sitio queda disponible en `http://localhost:8080`.

## Scripts disponibles

| Comando | Qué hace |
| --- | --- |
| `yarn dev` | Levanta el servidor de desarrollo de Vite |
| `yarn build` | Build de producción |
| `yarn build:dev` | Build sin minificar, útil para debuggear el output |
| `yarn preview` | Sirve localmente el build de producción |
| `yarn lint` | Corre ESLint sobre todo el repo |

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** + [**shadcn/ui**](https://ui.shadcn.com/) para los componentes base
- **React Router** para el ruteo (`/`, `/services`, `/projects`, `/blog`, `/contact`)
- **react-hook-form** + **zod** para la validación del formulario de contacto
- i18n propio (español/inglés) vía Context de React — sin librería externa
- **three.js** + **@react-three/fiber** para la escena 3D del Hero (código-dividida con `lazy`, solo se descarga en `/`)

## Estructura

```
src/
├── components/
│   ├── home/       # Secciones de la home (Hero, Services, Contact)
│   ├── layout/     # Navbar, Footer, y layout compartido entre páginas
│   └── ui/         # Componentes shadcn/ui (generados, no se editan a mano)
├── config/         # Constantes compartidas (links de navegación, email de contacto)
├── contexts/       # LanguageContext (idioma actual + función de traducción)
├── hooks/          # Hooks propios (scroll reveal, meta tags por página, etc.)
├── pages/          # Una por ruta
└── utils/          # translations.ts con los textos en español e inglés
```

## Deploy

El repo está conectado a GitHub (`Ivorra-1996/ai-solutions`) y pensado para desplegarse en [Vercel](https://vercel.com):

1. En Vercel, "Add New Project" → importar el repo de GitHub. Detecta Vite automáticamente (build command, output y el gestor de paquetes por el `yarn.lock`).
2. `vercel.json` ya incluye el rewrite necesario para que las rutas de React Router (`/services`, `/projects`, etc.) funcionen al entrar directo o refrescar, no solo navegando desde `/`.
3. No hay variables de entorno que configurar por ahora (no hay backend ni claves de API en el proyecto).

## Notas

- El formulario de contacto no tiene backend propio: arma un link `mailto:` y lo abre en el cliente de correo del visitante.
