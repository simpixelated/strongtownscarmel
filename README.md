# Strong Towns Carmel website

Built with [Eleventy](https://www.11ty.dev/) site generator (using the [v3.0 release](https://github.com/11ty/eleventy/releases/tag/v3.0.0)).

[![Netlify Status](https://api.netlify.com/api/v1/badges/72f88737-66cf-48d2-8bd4-7779a72f519c/deploy-status)](https://app.netlify.com/sites/strongtownscarmel/deploys)

## Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - How to submit changes, code style guidelines, and deployment information
- **[AI Agent Notes](AGENTS.md)** - Context and patterns for AI assistants working on this codebase

## Technology Stack

This website is built with modern, performance-focused web technologies:

### Core Framework
- **[Eleventy](https://www.11ty.dev/) v3.x** - A static site generator that pre-renders all content
- **Node.js 18+** - JavaScript runtime (see `.nvmrc` for exact version)
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - Templating engine for HTML generation
- **[Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/) v5.3.6** - CSS framework for responsive design and component styling

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
└── README.md           # This file
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
- `npm run new-post` - Generate a new blog post (see below)

## Common Development Tasks

### Publishing a Blog Post

Blog posts live in the `content/blog/` directory. You can create posts in three ways:

#### Option 0: CLI Generator (Recommended)
Use the built-in blog post generator to quickly create a new post with proper structure:

```bash
npm run new-post -- --title="Your Post Title" --tags="tag1,tag2"
```

This will:
- Generate a slug-based folder: `content/blog/slug/`
- Create an `index.md` file with proper frontmatter
- Auto-increment the folder name if it already exists

**CLI Options:**
- `--title` (required) - Post title (used for frontmatter and slug generation)
- `--tags` (required) - Comma-separated list of tags
- `--date` (optional) - Publication date in YYYY-MM-DD format (defaults to today)

**Example:**
```bash
npm run new-post -- --title="The Autumn Greenway" --tags="transportation,bike lanes"
```

This creates:
```
content/blog/the-autumn-greenway/
└── index.md
```

With frontmatter including the date:
```yaml
---
date: 2026-02-15
title: "The Autumn Greenway"
tags:
  - transportation
  - bike lanes
---
```

You can then add images and other assets to this folder.

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

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting changes, code style, and deployment information.

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

## Features

- Using [Eleventy v3](https://github.com/11ty/eleventy/releases/tag/v3.0.0) with zero-JavaScript output.
- Content is exclusively pre-rendered (this is a static site).
- Can easily [deploy to a subfolder without changing any content](https://www.11ty.dev/docs/plugins/html-base/)
- All URLs are decoupled from the content's location on the file system.
- Configure templates via the [Eleventy Data Cascade](https://www.11ty.dev/docs/data-cascade/)
- **Performance focused**: four-hundos Lighthouse score out of the box!
- _0 Cumulative Layout Shift_
- _0ms Total Blocking Time_
- Local development live reload provided by [Eleventy Dev Server](https://www.11ty.dev/docs/dev-server/).
- Content-driven [navigation menu](https://www.11ty.dev/docs/plugins/navigation/)
- Fully automated [Image optimization](https://www.11ty.dev/docs/plugins/image/)
- Zero-JavaScript output.
- Support for modern image formats automatically (e.g. AVIF and WebP)
- Processes images on-request during `--serve` for speedy local builds.
- Prefers `<img>` markup if possible (single image format) but switches automatically to `<picture>` for multiple image formats.
- Automated `<picture>` syntax markup with `srcset` and optional `sizes`
- Includes `width`/`height` attributes to avoid [content layout shift](https://web.dev/cls/).
- Includes `loading="lazy"` for native lazy loading without JavaScript.
- Includes [`decoding="async"`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding)
- Images can be co-located with blog post files.
- Per page CSS bundles [via `eleventy-plugin-bundle`](https://github.com/11ty/eleventy-plugin-bundle).
- Built-in [syntax highlighter](https://www.11ty.dev/docs/plugins/syntaxhighlight/) (zero-JavaScript output).
- Draft content: use `draft: true` to mark any template as a draft. Drafts are **only** included during `--serve`/`--watch` and are excluded from full builds. This is driven by the `addPreprocessor` configuration API in `eleventy.config.js`. Schema validator will show an error if non-boolean value is set in data cascade.
- Blog Posts
- Automated next/previous links
- Accessible deep links to headings
- Generated Pages
- Home, Archive, and About pages.
- [Atom feed included (with easy one-line swap to use RSS or JSON](https://www.11ty.dev/docs/plugins/rss/)
- `sitemap.xml`
- Zero-maintenance tag pages ([View on the Demo](https://eleventy-base-blog.netlify.app/tags/))
- Content not found (404) page

### Implementation Notes

- `content/about/index.md` is an example of a content page.
- `content/blog/` has the blog posts but really they can live in any directory. They need only the `posts` tag to be included in the blog posts [collection](https://www.11ty.dev/docs/collections/).
- Use the `eleventyNavigation` key (via the [Eleventy Navigation plugin](https://www.11ty.dev/docs/plugins/navigation/)) in your front matter to add a template to the top level site navigation. This is in use on `content/index.njk` and `content/about/index.md`.
- Content can be in _any template format_ (blog posts needn't exclusively be markdown, for example). Configure your project's supported templates in `eleventy.config.js` -> `templateFormats`.
- The `public` folder in your input directory will be copied to the output folder (via `addPassthroughCopy` in the `eleventy.config.js` file). This means `./public/css/*` will live at `./_site/css/*` after your build completes.
- This project uses three [Eleventy Layouts](https://www.11ty.dev/docs/layouts/):
- `_includes/layouts/base.njk`: the top level HTML structure
- `_includes/layouts/home.njk`: the home page template (wrapped into `base.njk`)
- `_includes/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
- `_includes/postslist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `content/index.njk` has an example of how to use it.

#### Content Security Policy

If your site enforces a [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (as public-facing sites should), you have a few choices (pick one):

1. In `base.njk`, remove `<style>{% getBundle "css" %}</style>` and uncomment `<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">`
2. Configure the server with the CSP directive `style-src: 'unsafe-inline'` (less secure).

## AI Agent Notes

For AI assistants working on this codebase, see [AGENTS.md](AGENTS.md) for key patterns, common operations, file locations, and important configurations.
