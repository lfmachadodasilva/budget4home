# typescript-config

Shared TypeScript configurations for Budget4Home monorepo.

## Configs

- `base.json` - Base TypeScript configuration
- `nextjs.json` - Next.js specific configuration
- `react-native.json` - React Native specific configuration

## Usage

In your `tsconfig.json`:

```json
{
  "extends": "typescript-config/nextjs.json"
}
```
