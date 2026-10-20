# Lund Lunch

Lunch menus in Lund, in Swedish and English.

Website: https://lundlunch.github.io/

## How it works

GitHub Pages serves a static website built by `.github/workflows/build-site.yml`. The separate `.github/workflows/update-menus.yml` workflow fetches restaurant menus, saves them in `menus.json`, and updates translations. The website reads the saved JSON, so visitors do not need to wait for restaurant websites.

On Monday, restaurants with a successfully saved menu labelled for the current week are skipped. Restaurants without a confirmed current-week menu are retried. Permanent menus are checked periodically. If a fetch fails, the previous saved menu is retained; the main menu view suppresses the failure warning when a complete current-week menu is already available. A restaurant's published week label is kept as-is rather than silently corrected.

Troppo has a separate Friday-evening refresh that fetches **only Troppo**, leaving other restaurants' saved data untouched. Its menu parser does not depend on whether the restaurant advertises Monday–Friday or Monday–Saturday service.

Lokal 4's bilingual dishes are parsed as adjacent Swedish/English pairs, rather than classified using a growing list of language keywords.

There is no public manual refresh button on the website. To refresh menus manually, go to **Actions → Update menus → Run workflow**, select `main`, and start the workflow.

## Schedule

All times below are **Europe/Stockholm** local time:

- **Monday:** scheduled every 10 minutes from **06:00 through 11:50**, for restaurants still needing an updated menu.
- **Friday:** **19:00**, **Troppo only**.
- **Tuesday–Thursday, Saturday–Sunday:** no scheduled menu refreshes.

GitHub Actions cron uses UTC. The workflow schedules both possible UTC hours for Friday and checks the local Swedish time, including daylight saving time. Scheduled runs can be delayed or skipped by GitHub. Manually dispatched updates are allowed outside these windows and refresh restaurants that still need updating.

## Development

Edit `App.tsx` and `style.css`, then run `npm install` and `npm run build`. Vite and `build-site.mjs` generate `index.html` and matching `index-*.js` / `index-*.css` assets. The **Build and publish website** workflow builds and deploys the website when relevant source files change.

Run `npm run update` with Node.js 22 to refresh saved menus locally. The **Update menus** workflow commits `menus.json`, `translations.json`, and `translation-quota.json`; menu data is read directly from the repository by the website.

Translations prefer official bilingual menus, then saved translations, with MyMemory used for new dishes subject to a 5,000-character daily limit. **Source status** provides per-restaurant fetch diagnostics.
