# CardPG Player Guide

Published player-facing rules reference for CardPG, built with [MkDocs](https://www.mkdocs.org/) and the [Material theme](https://squidfunk.github.io/mkdocs-material/).

Source content lives under `docs/` and is normally authored in the Obsidian vault at `resources/CardPG Player Guide/` in the main [cardpg system repo](https://github.com/mrjoelpearce/cardpg) — copy changes over from there, then push here.

If the Obsidian source still has `[[wikilinks]]` in it, run `python3 scripts/convert_wikilinks.py` after copying — it rewrites them into the relative Markdown links this site actually needs, matching whatever file layout is under `docs/` at the time. Anything with no matching page gets turned into plain bold text instead of a broken link.

## Local preview (optional)

```
pip install mkdocs-material
mkdocs serve
```

Then open http://127.0.0.1:8000.

## Publishing

Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the site and publishes it to the `gh-pages` branch automatically. No local build step is required — just push to `main`.

The repository's **Settings → Pages → Source** must be set to "Deploy from a branch" → `gh-pages` (one-time setup, see the CardPG-Guide setup notes).
