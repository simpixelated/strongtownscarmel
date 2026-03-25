# AI Agent Notes

This document provides context for AI assistants working on the Strong Towns Carmel website codebase.

## Key Patterns

- Content files use front matter (YAML) + Markdown/Nunjucks
- Templates extend `base.njk` using Nunjucks `{% extends %}`
- Collections are created via tags in front matter
- All paths are relative to the `content/` directory
- Static assets go in `public/` and are copied as-is

## Styling Guidelines

- **Prefer Bootstrap classes:** Use [Bootstrap 5.3.6](https://getbootstrap.com/docs/5.3/getting-started/introduction/) utility classes and components whenever possible
- **Minimize custom CSS:** Custom CSS should only be used when absolutely necessary - Bootstrap provides comprehensive styling options
- **Zero-JavaScript Output:** All logic and code should run at build time - the output must be completely static with no client-side JavaScript dependencies

## Common Operations

- **Add blog post:** Create `.md` file in `content/blog/` with required front matter
- **Edit navigation:** Add/modify `eleventyNavigation` in page front matter
- **Change site metadata:** Edit `_data/metadata.js`
- **Modify HTML structure:** Edit `_includes/layouts/base.njk`
- **Add plugin:** Install via npm, configure in `eleventy.config.js`

## Adding Images to Blog Posts

Images for a blog post should be saved directly in the same folder as the post (e.g., `content/blog/my-post/my-image.jpg`) and referenced by filename only in the `featuredimage` front matter field. Do **not** use inline `<img>` tags with external URLs (e.g., GitHub attachment URLs). Instead:

1. Download the image file and save it to the post's directory (e.g., `content/blog/my-post/flyer.jpg`).
2. Reference it in front matter: `featuredimage: flyer.jpg`

The Eleventy image plugin will optimize the image at build time, and the `featuredimage` value is also used for OG/Twitter card meta tags.

## File Locations

- Content: `content/`
- Templates: `_includes/layouts/`
- Components: `_includes/`
- Data: `_data/`
- Config: `eleventy.config.js`, `_config/`
- Assets: `public/`
- Output: `_site/` (generated, not in git)

## Important Configurations

- Input directory: `content/`
- Output directory: `_site/`
- Template formats: `md`, `njk`, `html`, `liquid`, `11ty.js`
- Markdown parser: markdown-it (Eleventy default)
- Markdown template pre-processor: Nunjucks
- HTML template engine: Nunjucks

## Additional Resources

For detailed development instructions, see [DEVELOPER.md](DEVELOPER.md).
