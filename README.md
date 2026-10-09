# Lund Lunch

Short URL: https://lundlunch.github.io/

The GitHub Pages site is a **redirect-only entry point** to the original ChatGPT-hosted Lund Lunch website:

https://lundlunch.bn8mgfhmr7.chatgpt.site/

Visitors to the GitHub Pages URL are automatically redirected to that address. The browser address bar changes to the ChatGPT-hosted URL.

## Deployment

`.github/workflows/build-site.yml` publishes only `index.html` when the redirect page or its workflow changes. No Vite build is needed.

`.github/workflows/update-menus.yml` has been retired: scheduled menu scraping and deployment from this repository are disabled. Menu content and its update behavior are now controlled by the original ChatGPT-hosted website, not by this GitHub repository.

The previous website source and saved menu files remain in this repository for reference but are not used by the redirect page.
