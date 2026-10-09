# Lund Lunch

Lunch menus in Lund, in Swedish and English.

Website: https://lundlunch.github.io/

## How it works

GitHub Pages publishes the site using two workflows: `.github/workflows/build-site.yml` builds and deploys the website when source files change, and `.github/workflows/update-menus.yml` refreshes the saved menu data and deploys the updated site. Visitors read saved JSON without waiting for restaurant sites. Failed restaurant updates retain the previous menu with a warning.

There is no public manual refresh button on the website. To refresh menus manually, go to **Actions → Update menus → Run workflow**, select `main`, and start the workflow.

## Schedule

- **Monday:** every 10 minutes between 06:00 and 11:50 **Europe/Stockholm** time, with a Swedish-local-time check to account for daylight saving time.
- **Tuesday–Friday:** once daily at **06:00 UTC** (07:00 Swedish winter time / 08:00 Swedish summer time).
- **Saturday–Sunday:** no scheduled updates.

GitHub Actions cron uses UTC and scheduled runs may be delayed. A manually dispatched update runs regardless of the Monday time window.

## Development

Edit `App.tsx` and `style.css`, then run `npm install` and `npm run build`. The build uses Vite and `build-site.mjs` to generate `index.html` and matching `index-*.js` / `index-*.css` assets. The **Build and publish website** workflow automatically builds, commits, and deploys these files when relevant source files are pushed to `main`.

`npm run update` fetches menus with Node.js 22 without installing dependencies. The **Update menus** workflow commits menu data and republishes the saved site files; updating menus still requires a GitHub Pages deployment.

Translations use official menus first, saved translations second, and MyMemory for new dishes with a 5,000-character daily limit. **Source status** shows partial failures.
