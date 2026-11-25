# Blue Grid Portfolio (React + Vite)

A customizable portfolio inspired by the supplied blue-gradient grid reference. Includes your uploaded transparent portrait in `public/portrait.png`.

## Run locally

1. Install Node.js 20+.
2. Open this folder in VS Code.
3. Run `npm install` then `npm run dev`.
4. Visit the localhost URL printed by Vite.

## Personalize

Edit `PROFILE` and `PROJECTS` in `src/main.jsx`.
- Replace `your-email@example.com` with your address.
- Add your LinkedIn URL.
- Add `public/resume.pdf` and update `resume: '/resume.pdf'`.
- Change the title and description in `index.html`.
- Replace `/public/portrait.png` to use a different photo.

Project cards are sample descriptions based on topics you've discussed; revise them before publishing to accurately reflect your completed work.

## Deploy on Vercel

Push the folder to GitHub, import it into Vercel, keep Vite defaults, and deploy. Build command: `npm run build`; output directory: `dist`.

## Portrait video

The reference uses a cutout image. This implementation uses your supplied PNG. To use a looping video, replace the image element with a `<video autoPlay muted loop playsInline ...>` element. An ordinary MP4 with a solid background will not have the same transparent-cutout look; transparency requires a compatible alpha-video format or a separately implemented background-removal effect.
