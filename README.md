# Lund Lunch

Lunch menus in Lund, in Swedish and English.

GitHub Pages is deployed by `.github/workflows/update-menus.yml`. Visitors read saved JSON without waiting for restaurant sites. Failed restaurant updates retain the previous menu with a warning.

Edit `App.tsx` and `style.css`, then run `npm install` and `npm run build`. Commit the resulting `index.html` and `index-*.js/css` along with the source. `npm run update` fetches menus with Node 22 without installing dependencies.

Actions → Update menus → Run workflow refreshes and publishes the site. Scheduled runs check weekdays at 06:00 UTC and Monday mornings every 30 minutes between 06:00 and 11:30 UTC. GitHub schedules may be delayed. Translations use official menus first, saved translations second, and MyMemory for new dishes with a 5000-character daily limit. Source status shows partial failures.
