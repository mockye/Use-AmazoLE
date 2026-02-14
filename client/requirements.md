## Packages
(none needed)

## Notes
Fonts are loaded via CSS @import in client/src/index.css (no extra packages).
SEO tags set via direct DOM manipulation (document.title + meta/OG creation) in Home page.
Lead capture uses react-hook-form + @hookform/resolvers/zod (already installed).
Backend endpoints used: POST /api/leads, GET /api/leads (admin page). If missing, runtime errors will surface.
