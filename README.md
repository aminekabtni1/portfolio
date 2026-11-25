# Portfolio (React + Vite)

## Development

Use Node.js 22. Run `npm ci`, then `npm run dev`. Vite defaults to
`/portfolio/`; follow the URL printed by Vite. Build with `npm run build`
and inspect the output with `npm run preview`.

## GitHub Pages deployment

`.github/workflows/deploy.yml` runs on pushes to main and manual dispatch.
It runs npm ci, builds, uploads dist, and deploys to GitHub Pages.
Select GitHub Actions in repository Settings > Pages > Build and deployment.
The project URL is https://aminekabtni1.github.io/portfolio/.

The workflow uses configure-pages base_path: /portfolio/ for the repository
URL, or / once a custom domain is configured. For a future .me domain,
configure DNS and the custom domain in Settings > Pages, enable HTTPS when
available, then rerun deployment. No unknown domain is committed as CNAME.

To test a domain-root build in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/'
npm run build
Remove-Item Env:VITE_BASE_PATH
```

Asset references use src/assetUrl.js and import.meta.env.BASE_URL.
Original images and CV remain in public/, certificates in public/certificates,
and application screenshots in public/previews. Fragment navigation needs no
server rewrite. node_modules and dist are generated locally and ignored by Git.
