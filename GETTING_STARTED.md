# Getting Started with Budget4Home

## Quick Start Guide

This guide will help you get started with the Budget4Home monorepo.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or later): [Download here](https://nodejs.org/)
- **Yarn** (v1.22 or later): Install with `npm install -g yarn`

### For Mobile Development (Optional)

- **iOS Development** (macOS only):
  - Xcode from the Mac App Store
  - Xcode Command Line Tools: `xcode-select --install`
  
- **Android Development**:
  - Android Studio: [Download here](https://developer.android.com/studio)
  - Android SDK and Emulator (installed via Android Studio)

## Installation Steps

### 1. Install Dependencies

From the root of the project, run:

```bash
yarn install
```

This will install all dependencies for all packages and apps in the monorepo.

### 2. Build Packages

Build the shared packages:

```bash
yarn build
```

This compiles the TypeScript packages (`common` and `client`) that are used by both apps.

## Running the Applications

### Web Application (Next.js)

To start the web application in development mode:

```bash
# From root
yarn dev --filter=web

# Or navigate to the web app
cd apps/web
yarn dev
```

The web app will be available at: http://localhost:3000

### Mobile Application (React Native + Expo)

To start the mobile application:

```bash
# From root
yarn dev --filter=native

# Or navigate to the native app
cd apps/native
yarn dev
```

Then:
- Press `i` to open iOS Simulator (macOS only)
- Press `a` to open Android Emulator
- Press `w` to open in web browser
- Scan QR code with Expo Go app on your phone

## Development Workflow

### Making Changes to Shared Packages

When you modify code in `packages/common` or `packages/client`:

1. The packages will automatically rebuild (if running `yarn dev`)
2. The apps consuming them will hot-reload with the changes

### Adding Dependencies

```bash
# Add to a specific package
yarn workspace web add package-name

# Add to a specific app
yarn workspace native add package-name

# Add to root (dev dependencies)
yarn add -W -D package-name
```

### Type Checking

Check types across all packages:

```bash
yarn type-check
```

### Building for Production

Build all packages and apps:

```bash
yarn build
```

## Project Structure Overview

```
budget4home/
├── apps/
│   ├── native/     # Mobile app (React Native + Expo)
│   └── web/        # Web app (Next.js)
├── packages/
│   ├── common/     # Shared utilities and types
│   ├── client/     # HTTP API client
│   └── typescript-config/  # Shared TypeScript configs
└── turbo.json      # Turborepo configuration
```

## Common Commands

| Command | Description |
|---------|-------------|
| `yarn dev` | Start all apps in development mode |
| `yarn build` | Build all packages and apps |
| `yarn type-check` | Type check all packages |
| `yarn lint` | Lint all packages |
| `yarn clean` | Clean build artifacts |

## Troubleshooting

### Port Already in Use

If port 3000 is already in use for the web app:

```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or start on a different port
PORT=3001 yarn dev --filter=web
```

### Expo/React Native Issues

If you encounter issues with the native app:

```bash
# Clear Expo cache
cd apps/native
npx expo start -c

# Or clear all caches
yarn clean
rm -rf apps/native/.expo apps/native/node_modules
yarn install
```

### Build Failures

If builds fail:

```bash
# Clean everything and reinstall
yarn clean
rm -rf node_modules yarn.lock
yarn install
yarn build
```

## Next Steps

1. Explore the example code in both apps
2. Read the documentation for each package in their respective README files
3. Start building your budget management features!

## Getting Help

- Check the main [README.md](./README.md) for more details
- Read the [Turborepo documentation](https://turbo.build/repo/docs)
- Review [Next.js docs](https://nextjs.org/docs) for web app development
- Review [Expo docs](https://docs.expo.dev) for mobile app development

## Useful Resources

- **Turborepo**: https://turbo.build/repo/docs
- **Next.js**: https://nextjs.org/docs
- **Expo**: https://docs.expo.dev
- **React Native**: https://reactnative.dev/docs
- **TypeScript**: https://www.typescriptlang.org/docs
