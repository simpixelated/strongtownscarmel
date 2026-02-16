# Contributing to Strong Towns Carmel

Thank you for your interest in contributing to the Strong Towns Carmel website! This guide will help you get started.

## Repository Links

- **GitHub Repository:** https://github.com/simpixelated/strongtownscarmel
- **Issues:** https://github.com/simpixelated/strongtownscarmel/issues
- **Pull Requests:** https://github.com/simpixelated/strongtownscarmel/pulls
- **README:** https://github.com/simpixelated/strongtownscarmel#readme
- **Developer Documentation:** [DEVELOPER.md](DEVELOPER.md)

## Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Update [CHANGELOG.md](CHANGELOG.md) under the "Unreleased" section with your changes
5. Test locally with `npm start` and `npm run build`
6. Commit your changes: `git commit -m "Description of changes"`
7. Push to your fork: `git push origin feature-name`
8. Open a Pull Request on GitHub

## Code Style

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
