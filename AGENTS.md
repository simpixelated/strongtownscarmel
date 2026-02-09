# AI Agent Notes

This document provides context for AI assistants working on the Strong Towns Carmel website codebase.

## Key Patterns

- Content files use front matter (YAML) + Markdown/Nunjucks
- Templates extend `base.njk` using Nunjucks `{% extends %}`
- Collections are created via tags in front matter
- All paths are relative to the `content/` directory
- Static assets go in `public/` and are copied as-is

## Common Operations

- **Add blog post:** Create `.md` file in `content/blog/` with required front matter
- **Edit navigation:** Add/modify `eleventyNavigation` in page front matter
- **Change site metadata:** Edit `_data/metadata.js`
- **Modify HTML structure:** Edit `_includes/layouts/base.njk`
- **Add plugin:** Install via npm, configure in `eleventy.config.js`

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
