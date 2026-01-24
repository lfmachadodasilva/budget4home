# Budget4Home - Turborepo Monorepo Setup

## Project Structure
- Apps:
  - `apps/web` - Next.js application
  - `apps/native` - React Native Expo application
- Packages:
  - `packages/common` - Shared utilities
  - `packages/client` - HTTP client
  - `packages/typescript-config` - Shared TypeScript configurations

## Setup Progress
- [x] Create copilot-instructions.md file
- [x] Get turborepo setup information
- [x] Initialize turborepo structure
- [x] Setup Next.js app (web)
- [x] Setup React Native Expo app (native)
- [x] Setup common package
- [x] Setup client package
- [x] Configure workspace dependencies
- [x] Install dependencies
- [x] Verify and test setup

## Quick Start

### Development
Run all apps in development mode:
```bash
yarn dev
```

Run specific app:
```bash
# Web app
yarn dev --filter=web

# Native app
yarn dev --filter=native
```

### Build
Build all packages and apps:
```bash
yarn build
```

### Other Commands
- `yarn lint` - Lint all packages
- `yarn type-check` - Type check all packages
- `yarn clean` - Clean build artifacts

## Project Features
- ✅ Turborepo monorepo with optimized build caching
- ✅ Next.js web application with TypeScript
- ✅ React Native Expo mobile application
- ✅ Shared packages for code reuse
- ✅ Type-safe development with TypeScript
- ✅ Modern tooling and best practices

