# Portfolio (Next.js + Decap CMS + Motion)
Content lives in `content/*.json` and is edited at `/admin`. Every save is a Git commit.

## Edit locally (no login needed)
1. `npm i`
2. Terminal A: `npx decap-server`   Terminal B: `npm run dev`
3. Open http://localhost:3000/admin, edit, and save. Files change in `content/` and `public/uploads/`.
4. `git add -A && git commit && git push` to publish.

## Edit on the live site (GitHub login)
Decap's GitHub backend needs a small OAuth service. Use one of: Netlify (site as a Netlify site with GitHub OAuth),
or a free Cloudflare Worker such as `sveltia/sveltia-cms-auth`. Create a GitHub OAuth App, deploy the proxy,
then uncomment `base_url` in `public/admin/config.yml` with the proxy URL. Vercel redeploys on each commit.
