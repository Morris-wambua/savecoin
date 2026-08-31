# SaveCoin

SaveCoin is a private, local-first personal budgeting and financial-discipline PWA for one user. It uses semantic HTML, modern CSS, vanilla ES modules, IndexedDB and a service worker. There is no backend, authentication, tracking, runtime CDN or external financial API.

## Privacy-first setup

The published source contains no personal financial amounts. On first installation, SaveCoin asks for income, operating cash, commitments, targets, loans, expected receipts, investment assumptions and essential budgets. Values are stored only in that browser's IndexedDB and are not transmitted to GitHub or another server.

## Local use and deployment

Serve the directory with a static web server, then open it through HTTP. The app is GitHub Pages subpath-safe, installable on Android, and supports offline use, complete JSON backup/restore, transaction CSV export and calendar reminder export.

See the application settings for privacy and portability details.
