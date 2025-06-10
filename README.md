# GOG Recruitment Task – Game Store (Angular 18)

## Tech Stack

- **Angular 18** (standalone components, `@if`, `@for`, `@input.required`, `signals`, `computed`, `effect`)
- **SSR** with `@angular/ssr` (server-side rendering)
- **State management**: `@ngneat/elf` + `persistState`
- **Styling**: SCSS + modern CSS (`:root` variables, media queries)
- **Testing**: Jasmine + Karma
- **Accessibility**: WCAG-compliant
- **SEO Optimized** (meta tags + SSR)

## Architecture

```bash
src/
├── app/
│   ├── core/ # Layout and global components (navbar, cart)
│   ├── shared/ # Reusable UI + layout components
│   ├── pages/ # Route-based views
│   └── state/ # Reactive stores and repositories
├── assets/ # Static files
└── styles/ # For you know... styles..
```

## Recommended development environment prerequisites

- Install nvm (<https://github.com/nvm-sh/nvm>)
- Then install the recomended nvm version with command `nvm install 18.19.1`
- Install prettier plugin for auto-formatting on file-save. (Read more here: `https://prettier.io/docs/editors.html`)

## Project setup

Run `npm i` to install dependencies.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

- Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
- Run `npm run serve:ssr` you can run the compiled Node.js server that Angular SSR generates during the build step.

## Linter & Prettier

- Run `npm run lint` to check all files for linting check
- Run `npm run format` to format all files at the same time

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
