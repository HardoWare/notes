# Notes App made with Nuxt3 and MongoDB
--- -

Full stack application with Nuxt 3 and SQLite, using NuxtHub for easy development and deployment.

## Featured technologies
- Nuxt 3 with TypeScript
- Tailwind CSS
- ESLint
- SQLite with Drizzle ORM
- Pinia for state management
- Nuxt Auth for authentication
- Nuxt i18n for internationalization

## Features
- Login and registration
- User session authentication
- User profile management
- Intuitive **CRUD** operations for notes
- Masonry grid for note's display
- Compact and responsive design
- **Layout** depends on user settings managed by **Pinia** (dark mode, language etc.)
- Protected routes with **middleware** (frontend and backend)


## Step-by-step launch guide
--- -

#### Clone repository:
```shell
  git clone https://github.com/HardoWare/notes.git
```

#### Install dependencies:
```shell
  pnpm install
```

#### Start dev environment:
```shell
  pnpm dev
```