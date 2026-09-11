# React + Vite Application

## Project Architecture & Folder Structure

```
├── public/
│   ├── images/         # Static images served directly
│   └── icons/          # Favicons, SVG icons, and sprite maps
│
├── src/
│   ├── app/            # App-level providers, root layouts, and global configurations
│   ├── components/     # Reusable UI components (buttons, cards, modals, etc.)
│   ├── services/       # API clients, network requests, and external integrations
│   ├── hooks/          # Custom React hooks (e.g. useDebounce, useAuth)
│   ├── context/        # React Context providers and state managers
│   ├── utils/          # Pure helper functions, formatters, and utilities
│   ├── constants/      # App constants, routes, API endpoints, config keys
│   └── types/          # Type definitions (JSDoc / TypeScript declarations)
│
├── .env.local          # Local environment variables
├── .gitignore          # Git ignored files
├── jsconfig.json       # Path alias (@/*) configuration for editor intellisense
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite build and plugin configurations
└── README.md           # Project documentation
```

### Path Aliases

Path alias `@` is configured in `vite.config.js` and `jsconfig.json` pointing directly to `src/`:

```javascript
import { Button } from '@/components';
import { useDebounce } from '@/hooks';
import { API_ENDPOINTS } from '@/constants';
```

