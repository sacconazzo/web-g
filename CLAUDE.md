# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn start          # dev server (http://localhost:3000)
yarn build          # production build (source maps disabled)
yarn test           # run tests
yarn deploy:ftp     # deploy build/ via FTP (requires .env)
```

For FTP deploy, create a `.env` file with: `deployUser`, `deployPassword`, `deployHost`, `deployPort`, `deployRemoteRoot`.

## Architecture

Single-page React 16 app (Create React App) deployed as a PWA at `https://sacconazzo.altervista.org` / `https://app.giona.tech`.

**Routing**: Hash-based navigation (`#home`, `#monitor`, etc.) managed in `App.js`. React Router is used only for the `/battery` standalone route. View switching updates `document.title` and the sidenav highlight.

**Layout** (`App.js`): Fixed top `Navbar` + collapsible `SideNav` (@trendmicro/react-sidenav) + scrollable `Main` content area + bottom `Navbar`. Sidenav color changes per view via the `views` config object.

**View pattern**: Each view is a standalone component receiving `isVisible` prop. Most views use `display: none` toggling (always mounted); some (`Camera`, `Dapp`, `Balance`, `Sballot`, `Login`) are conditionally rendered. Views mount with a 50ms fade-in via `useState(false)` + `setTimeout`.

**Views**:
- `Home` — welcome page with WYSIWYG editor (jodit-react via `Editor.js`) for sending messages to `https://sacconazzo.altervista.org/api/?fn=send-message`
- `Monitor` — polls `https://api.giona.tech/cpu_load` every 2s for NAS/router stats
- `Battery` — battery telemetry charts using Recharts; also available standalone at `/battery`
- `DailyNotes` — calendar/notes feature
- `Sballot` — Quorum Web3 node interface
- `Dapp` — DeFi DApp interface
- `Balance` — embeds `https://20percent.giona.tech` via iframe
- `Private` — posts auth token to `https://sacconazzo.altervista.org/personale.php`
- `Login` — stores a password key in `localStorage` as `auth`

**Styling**: styled-components for layout primitives; Bootstrap 4 + react-bootstrap for UI components; Font Awesome 4 icons.

**Auth**: Trivial — password stored in `localStorage['auth']`, passed as `props.auth` to `Private`. No JWT or session management.
