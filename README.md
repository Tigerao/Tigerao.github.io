# Jiachang Zhang — Academic Website

Personal academic website for **Jiachang Zhang**, PhD candidate in astronomy at
Nanjing University. The site presents research on X-ray binaries, compact
objects, accretion, and nearby galaxies.

Built with [al-folio v1.0](https://github.com/alshedivat/al-folio) and deployed
automatically with GitHub Pages.

## Publish this site

Read [SITE_SETUP.md](SITE_SETUP.md) for the step-by-step Chinese deployment
guide. Before publishing, replace `YOUR-GITHUB-USERNAME` in `_config.yml`.

## Main content

- `_pages/about.md` — home page and biography
- `_projects/` — current projects and research themes
- `_bibliography/papers.bib` — publication list and links
- `_data/cv.yml` — web CV
- `_data/socials.yml` — public academic profiles
- `_news/` — publication news
- `_pages/talks.md` — talks and slides

## Local preview

```bash
docker compose pull
docker compose up
```

Open <http://localhost:8080>. See [SITE_SETUP.md](SITE_SETUP.md) for details.
