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

## Notas

- El formulario de contacto no tiene backend propio: arma un link `mailto:` y lo abre en el cliente de correo del visitante.
