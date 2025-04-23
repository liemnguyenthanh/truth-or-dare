# Migration Guide to Modular, Shared Structure

This document outlines the steps to migrate components from the current structure to the new modular, shared structure.

## Directory Structure

The new structure follows a feature-based modular approach:

```
└── src/
    ├── core/           # Core application code (config, constants, types)
    ├── modules/        # Feature-based modules
    │   └── [module]/   # Each module contains its own components, hooks, utils
    │       ├── components/
    │       ├── hooks/
    │       ├── services/
    │       ├── utils/
    │       └── index.ts    # Public API exports
    ├── shared/         # Shared code used across multiple modules
    │   ├── components/ # Reusable UI components
    │   ├── hooks/      # Shared custom hooks
    │   ├── services/   # Shared services and API calls
    │   ├── types/      # Shared TypeScript types
    │   └── utils/      # Utility functions
    └── app/            # Next.js App Router pages
```

## Modules

We've identified the following modules:

1. **Game** - Game-related functionality
2. **Participants** - Participant management
3. **Questions** - Question-related functionality
4. **Theme** - Theme-related functionality

## Migration Steps

### 1. Identify Component's Module

First, identify which module a component belongs to. For components that:
- Are used only in one feature → Move to that feature's module
- Are used across multiple features → Move to the shared directory

### 2. Update Imports

After moving a component, update all imports to use the new path aliases:

- `@core/*` - For core files
- `@shared/*` - For shared files
- `@game/*` - For game module files
- `@participants/*` - For participants module files
- `@questions/*` - For questions module files
- `@theme/*` - For theme module files

### 3. Update Module Exports

Make sure each component is properly exported from its module's index.ts file.

## Examples

### Moving a Component

Example for moving the `Game.tsx` component to the game module:

1. Move `src/components/Game.tsx` to `src/modules/game/components/Game.tsx`
2. Update the import in `src/app/page.tsx` from `import { Game } from '@/components/Game';` to `import { Game } from '@game/components/Game';`
3. Update `src/modules/game/components/index.ts` to export the component:
   ```typescript
   export * from './Game';
   ```

### Moving a Context

Example for moving the `GameContext.tsx` to the game module:

1. Move `src/context/GameContext.tsx` to `src/modules/game/hooks/useGameContext.tsx`
2. Update the import in files from `import { GameProvider } from '@/context/GameContext';` to `import { GameProvider } from '@game/hooks/useGameContext';`
3. Update `src/modules/game/hooks/index.ts` to export the hook:
   ```typescript
   export * from './useGameContext';
   ```

## Testing

After migration, ensure that:
1. All imports are resolved correctly
2. The application builds without errors
3. All features work as expected 