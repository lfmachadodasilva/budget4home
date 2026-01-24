# Budget4Home

A Turborepo monorepo for Budget4Home application - a home budget management solution with web and mobile support.

## What's inside?

This Turborepo includes the following packages and apps:

### Apps

- `native`: React Native app using Expo - Mobile application for iOS and Android
- `web`: Next.js web application - Web-based budget management interface

### Packages

- `common`: Shared utilities and types used by both apps
  - Currency formatting
  - Date formatting
  - Email validation
  - TypeScript types for Budget, Transaction, and User
- `client`: HTTP client for API communication
  - Generic REST API client
  - Budget-specific API methods
  - Authentication token management
- `typescript-config`: Shared TypeScript configurations
  - Base configuration
  - Next.js specific config
  - React Native specific config

## Getting Started

### Prerequisites

- Node.js 18 or later
- Yarn package manager
- For mobile development:
  - iOS: Xcode and iOS Simulator (macOS only)
  - Android: Android Studio and Android Emulator

### Installation

```bash
yarn install
```

### Development

To develop all apps and packages:

```bash
yarn dev
```

To develop specific app:

```bash
# For web app (Next.js)
yarn dev --filter=web

# For native app (Expo)
yarn dev --filter=native
```

### Build

Build all apps and packages:

```bash
yarn build
```

Build specific package or app:

```bash
yarn build --filter=common
```

### Useful Commands

- `yarn lint` - Lint all packages
- `yarn type-check` - Type check all packages
- `yarn test` - Run tests for all packages
- `yarn clean` - Clean build artifacts and node_modules

## Project Structure

```
budget4home/
├── apps/
│   ├── native/          # React Native Expo app
│   │   ├── app/         # Expo Router pages
│   │   ├── assets/      # Images and icons
│   │   └── package.json
│   └── web/             # Next.js app
│       ├── app/         # Next.js App Router pages
│       └── package.json
├── packages/
│   ├── common/          # Shared utilities
│   │   └── src/
│   ├── client/          # HTTP client
│   │   └── src/
│   └── typescript-config/ # Shared TS configs
└── turbo.json           # Turborepo configuration
```

## Features

- ✅ **Monorepo Management**: Powered by Turborepo for optimized builds
- ✅ **Code Sharing**: Share code between web and mobile apps
- ✅ **Type Safety**: Full TypeScript support across all packages
- ✅ **Modern Stack**: 
  - Next.js 15 for web
  - React Native with Expo for mobile
  - React 19
- ✅ **Build Optimization**: Intelligent caching and parallel execution
- ✅ **Developer Experience**: Hot reload, fast refresh, and type checking

## Development Workflow

1. **Install dependencies**: `yarn install`
2. **Start development**: `yarn dev` (starts all apps)
3. **Make changes**: Edit files in apps or packages
4. **Build for production**: `yarn build`

## Package Dependencies

The monorepo uses Yarn workspaces to manage dependencies. Packages can depend on each other:

- `web` depends on: `common`, `client`
- `native` depends on: `common`, `client`
- `client` depends on: `common`

Changes to packages automatically trigger rebuilds in dependent apps thanks to Turborepo's dependency graph.

## Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

To set up remote caching:

```bash
npx turbo login
npx turbo link
```

## Learn More

To learn more about the technologies used:

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Expo Documentation](https://docs.expo.dev)
- [React Native Documentation](https://reactnative.dev/docs)

## License

MIT
