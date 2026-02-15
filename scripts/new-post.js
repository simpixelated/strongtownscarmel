#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const params = {};
  
  args.forEach(arg => {
    const match = arg.match(/^--([^=]+)=(.+)$/);
    if (match) {
      params[match[1]] = match[2];
    }
  });
  
  return params;
}

// Validate required arguments
function validateArgs(params) {
  const errors = [];
  
  if (!params.title) {
    errors.push('Error: --title is required');
  }
  
  if (!params.tags) {
    errors.push('Error: --tags is required');
  }
  
  if (params.date && !/^\d{4}-\d{2}-\d{2}$/.test(params.date)) {
    errors.push('Error: date must be YYYY-MM-DD');
  }
  
  if (errors.length > 0) {
    errors.forEach(err => console.error(err));
    process.exit(1);
  }
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Generate date (default to today)
function generateDate(dateParam) {
  if (dateParam) {
    return dateParam;
  }
  return new Date().toISOString().slice(0, 10);
}

// Build folder path with auto-increment
function buildFolderPath(baseDir, date, slug) {
  let folderName = `${date}-${slug}`;
  let fullPath = path.join(baseDir, folderName);
  let counter = 2;
  
  // Auto-increment if folder exists
  while (fs.existsSync(fullPath)) {
    folderName = `${date}-${slug}-${counter}`;
    fullPath = path.join(baseDir, folderName);
    counter++;
  }
  
  return { folderName, fullPath };
}

// Generate frontmatter
function generateFrontmatter(title, tags, date) {
  const tagsArray = tags.split(',').map(tag => tag.trim());
  const tagsFormatted = tagsArray.map(tag => `  - ${tag}`).join('\n');
  
  return `---
date: ${date}
title: "${title}"
tags:
${tagsFormatted}
---

`;
}

// Main function
function main() {
  console.log('\nCreating new post...\n');
  
  // Parse and validate arguments
  const params = parseArgs();
  validateArgs(params);
  
  // Generate date and slug
  const date = generateDate(params.date);
  const slug = generateSlug(params.title);
  
  // Build folder path
  const projectRoot = path.resolve(__dirname, '..');
  const blogDir = path.join(projectRoot, 'content', 'blog');
  const { folderName, fullPath } = buildFolderPath(blogDir, date, slug);
  
  // Create directory
  fs.mkdirSync(fullPath, { recursive: true });
  
  // Generate and write frontmatter to index.md
  const frontmatter = generateFrontmatter(params.title, params.tags, date);
  const filePath = path.join(fullPath, 'index.md');
  fs.writeFileSync(filePath, frontmatter);
  
  // Display success message
  console.log('Folder:');
  console.log(`content/blog/${folderName}/\n`);
  console.log('File:');
  console.log(`content/blog/${folderName}/index.md\n`);
  console.log('Done.\n');
}

// Run the script
main();
