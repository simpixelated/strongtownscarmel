# Developer Documentation

Welcome to the Strong Towns Carmel website developer guide! This document explains the technology stack, common development tasks, and how to contribute to this project.

## Technology Stack

This website is built with modern, performance-focused web technologies:

### Core Framework
- **[Eleventy](https://www.11ty.dev/) v3.x** - A static site generator that pre-renders all content
- **Node.js 18+** - JavaScript runtime (see `.nvmrc` for exact version)
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - Templating engine for HTML generation

### Key Technologies & Features
- **Zero-JavaScript Output** - All content is pre-rendered for maximum performance
- **Markdown** - Content authoring format for blog posts and pages
- **Image Optimization** - Automatic image processing with [@11ty/eleventy-img](https://www.11ty.dev/docs/plugins/image/)
  - WebP and AVIF format generation
  - Responsive image sizing (400px, 800px, 1280px)
  - Lazy loading by default
- **CSS Bundling** - Per-page CSS bundles via [eleventy-plugin-bundle](https://github.com/11ty/eleventy-plugin-bundle)
- **Syntax Highlighting** - Built-in code highlighting with [@11ty/eleventy-plugin-syntaxhighlight](https://www.11ty.dev/docs/plugins/syntaxhighlight/)
- **Navigation** - Automated navigation menu with [@11ty/eleventy-navigation](https://www.11ty.dev/docs/plugins/navigation/)
- **RSS/Atom Feed** - Automated feed generation with [@11ty/eleventy-plugin-rss](https://www.11ty.dev/docs/plugins/rss/)
- **Font Awesome** - Icon library integration via [@11ty/font-awesome](https://github.com/11ty/font-awesome)

### Deployment
- **Netlify** - Primary hosting platform (see `netlify.toml`)
- **Vercel** - Alternative deployment option (see `vercel.json`)
- Build command: `npm run build`
- Output directory: `_site`

## Project Structure

```
strongtownscarmel/
├── content/              # All website content
│   ├── blog/            # Blog posts (Markdown files or folders)
│   ├── index.njk        # Homepage
│   ├── about.md         # About page
│   ├── events.md        # Events page
│   └── join.md          # Join page
├── _includes/           # Template components
│   ├── layouts/         # Page layouts
│   │   ├── base.njk    # Base HTML structure
│   │   ├── home.njk    # Homepage template
│   │   ├── page.njk    # Standard page template
│   │   └── post.njk    # Blog post template
│   ├── postslist.njk   # Post list component
│   └── postslist-featured.njk  # Featured posts component
├── _data/               # Global data files
│   ├── metadata.js      # Site metadata (title, URL, author)
│   └── eleventyDataSchema.js  # Data validation schema
├── _config/             # Configuration modules
│   └── filters.js       # Custom Eleventy filters
├── public/              # Static assets (copied to output)
│   ├── css/            # Stylesheets
│   └── img/            # Static images
├── eleventy.config.js   # Main Eleventy configuration
├── package.json         # Node.js dependencies and scripts
└── README.md           # Getting started guide
```

## Getting Started

### Prerequisites
- Node.js 18 or higher (use the version in `.nvmrc`)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/simpixelated/strongtownscarmel.git
cd strongtownscarmel
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The site will be available at `http://localhost:8080` with live reload enabled.

### Available Commands

- `npm start` - Start development server with live reload
- `npm run build` - Build production site to `_site` folder
- `npm run debug` - Run build with debug output
- `npm run debugstart` - Start dev server with debug output
- `npm run benchmark` - Run build with performance benchmarks

## Common Development Tasks

### Publishing a Blog Post

Blog posts live in the `content/blog/` directory. You can create posts in two ways:

#### Option 1: Single Markdown File
Create a new `.md` file directly in `content/blog/`:

```markdown
---
date: 2024-03-15
title: Your Post Title
tags:
  - tag1
  - tag2
---

Your post content here in Markdown format.
```

#### Option 2: Folder with Assets
Create a folder in `content/blog/your-post-name/` with an `index.md` file:

```
content/blog/your-post-name/
├── index.md
├── image1.jpg
└── image2.png
```

This approach allows you to co-locate images with your post.

**Front Matter Fields:**
- `date` (required) - Publication date in YYYY-MM-DD format
- `title` (required) - Post title
- `tags` (optional) - Array of tags for categorization
- `draft` (optional) - Set to `true` to mark as draft (only visible in development)
- `canonical` (optional) - Canonical URL if content is published elsewhere
- `featuredimage` (optional) - Path to featured image
- `intro` (optional) - Short description/excerpt

### Adding a New Page

1. Create a new `.md` or `.njk` file in the `content/` directory:

```markdown
---
layout: layouts/page.njk
title: Your Page Title
eleventyNavigation:
  key: Page Name
  order: 3
---

Your page content here.
```

2. The `eleventyNavigation` block adds the page to the main navigation menu
   - `key` - Display name in navigation
   - `order` - Position in navigation (lower numbers appear first)

### Adding a Subpage

Create a subdirectory in `content/` with an `index.md`:

```
content/
└── your-section/
    ├── index.md
    └── subpage.md
```

The URL structure will match the folder structure: `/your-section/` and `/your-section/subpage/`

### Editing Templates

Templates are located in `_includes/layouts/`:

- **`base.njk`** - Base HTML structure (head, meta tags, scripts)
  - Edit this to modify site-wide HTML structure
  - Contains SEO meta tags, Open Graph tags, and social media cards
  
- **`home.njk`** - Homepage layout
  - Extends `base.njk`
  - Customizes the homepage structure
  
- **`page.njk`** - Standard page template
  - Used for About, Events, Join pages
  - Simple content wrapper
  
- **`post.njk`** - Blog post template
  - Includes post metadata, tags, and next/previous links
  - Extends `base.njk`

**Template Syntax:** Templates use [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) templating language.

### Working with Images

Images are automatically optimized during the build process:

1. **Add images to your content:**
```markdown
![Alt text](./your-image.jpg)
```

2. **The build process automatically:**
   - Converts images to WebP format
   - Generates multiple sizes (400px, 800px, 1280px)
   - Adds lazy loading attributes
   - Includes width/height to prevent layout shift

3. **For background images**, use the `backgroundCSSImage` shortcode in templates

### Editing Styles

Global CSS is located in `public/css/`. The CSS is copied directly to the output folder.

For page-specific styles, use the CSS bundle feature in your template:

```njk
{% css %}
  /* Your page-specific CSS here */
{% endcss %}
```

### Modifying Site Configuration

Key configuration files:

- **`_data/metadata.js`** - Site title, URL, description, author info
- **`eleventy.config.js`** - Eleventy settings, plugins, and build configuration
- **`_config/filters.js`** - Custom template filters (date formatting, etc.)

### Working with Drafts

Mark any post as a draft by adding to front matter:

```markdown
---
draft: true
title: Work in Progress
---
```

Drafts are visible during development (`npm start`) but excluded from production builds (`npm run build`).

### Creating Collections

Collections group related content. The `posts` collection is automatically created from any content with the `posts` tag.

To create a custom collection, edit `eleventy.config.js`:

```javascript
eleventyConfig.addCollection("myCollection", function(collectionApi) {
  return collectionApi.getFilteredByTag("myTag");
});
```

## Development Workflow

### Local Development

1. Start the development server:
```bash
npm start
```

2. Edit files in `content/`, `_includes/`, or `public/`
3. The browser automatically refreshes when files change
4. View your changes at `http://localhost:8080`

### Testing Your Changes

1. Build the production site:
```bash
npm run build
```

2. Check the `_site` folder for the generated output
3. Test the built site with a local server if needed

### Debugging

Use debug mode to see detailed build information:

```bash
npm run debug        # Build with debug output
npm run debugstart   # Dev server with debug output
```

## Contributing

### Repository Links

- **GitHub Repository:** https://github.com/simpixelated/strongtownscarmel
- **Issues:** https://github.com/simpixelated/strongtownscarmel/issues
- **Pull Requests:** https://github.com/simpixelated/strongtownscarmel/pulls
- **README:** https://github.com/simpixelated/strongtownscarmel#readme

### Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test locally with `npm start` and `npm run build`
5. Commit your changes: `git commit -m "Description of changes"`
6. Push to your fork: `git push origin feature-name`
7. Open a Pull Request on GitHub

### Code Style

- Follow the existing code style in the project
- Use tabs for indentation (see `.editorconfig`)
- Write clear, descriptive commit messages
- Keep commits focused and atomic

## Deployment

The site automatically deploys when changes are pushed to the main branch:

- **Netlify:** Automatically builds and deploys from GitHub
- **Build Command:** `npm run build`
- **Publish Directory:** `_site`

Check the Netlify badge in the README for build status.

## Troubleshooting

### Common Issues

**Issue:** `npm install` fails
- **Solution:** Ensure you're using Node.js 18 or higher. Check with `node --version`

**Issue:** Images not optimizing
- **Solution:** Clear the `_site` folder and rebuild: `rm -rf _site && npm run build`

**Issue:** Changes not appearing
- **Solution:** Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- **Solution:** Restart the dev server

**Issue:** Build fails with "Cannot find module"
- **Solution:** Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`

## Additional Resources

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Nunjucks Template Documentation](https://mozilla.github.io/nunjucks/templating.html)
- [Markdown Guide](https://www.markdownguide.org/)
- [Strong Towns Movement](https://www.strongtowns.org/)

## AI Agent Notes

This section provides context for AI assistants working on this codebase:

### Key Patterns
- Content files use front matter (YAML) + Markdown/Nunjucks
- Templates extend `base.njk` using Nunjucks `{% extends %}`
- Collections are created via tags in front matter
- All paths are relative to the `content/` directory
- Static assets go in `public/` and are copied as-is

### Common Operations
- **Add blog post:** Create `.md` file in `content/blog/` with required front matter
- **Edit navigation:** Add/modify `eleventyNavigation` in page front matter
- **Change site metadata:** Edit `_data/metadata.js`
- **Modify HTML structure:** Edit `_includes/layouts/base.njk`
- **Add plugin:** Install via npm, configure in `eleventy.config.js`

### File Locations
- Content: `content/`
- Templates: `_includes/layouts/`
- Components: `_includes/`
- Data: `_data/`
- Config: `eleventy.config.js`, `_config/`
- Assets: `public/`
- Output: `_site/` (generated, not in git)

### Important Configurations
- Input directory: `content/`
- Output directory: `_site/`
- Template formats: `md`, `njk`, `html`, `liquid`, `11ty.js`
- Markdown parser: markdown-it (Eleventy default)
- Markdown template pre-processor: Nunjucks
- HTML template engine: Nunjucks
