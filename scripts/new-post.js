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
    // Only process named arguments starting with "--"
    if (!arg.startsWith('--')) {
      return;
    }

    const equalIndex = arg.indexOf('=');

    // Reject arguments without an "=" sign to avoid silently ignoring them
    if (equalIndex === -1) {
      console.error(
        `Error: Argument "${arg}" is missing a value. Use the "--name=value" syntax.`
      );
      process.exit(1);
    }

    const key = arg.slice(2, equalIndex).trim();
    const value = arg.slice(equalIndex + 1); // may be empty and may contain "="

    if (!key) {
      console.error(`Error: Argument "${arg}" has an empty name.`);
      process.exit(1);
    }

    params[key] = value;
  });
  
  return params;
}

// Validate required arguments
function validateArgs(params) {
  const errors = [];
  
  if (params.title == null || params.title.trim() === '') {
    errors.push('Error: --title is required and cannot be empty');
  }
  
  if (params.tags == null || params.tags.trim() === '') {
    errors.push('Error: --tags is required and cannot be empty');
  }
  
  if (params.date) {
    // Check format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(params.date)) {
      errors.push('Error: date must be YYYY-MM-DD');
    } else {
      // Validate actual date value
      const dateObj = new Date(params.date + 'T00:00:00');
      const [year, month, day] = params.date.split('-').map(Number);
      
      if (
        isNaN(dateObj.getTime()) ||
        dateObj.getFullYear() !== year ||
        dateObj.getMonth() + 1 !== month ||
        dateObj.getDate() !== day
      ) {
        errors.push('Error: date is not a valid calendar date');
      }
    }
  }
  
  if (errors.length > 0) {
    errors.forEach(err => console.error(err));
    process.exit(1);
  }
}

// Generate slug from title
function generateSlug(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  
  if (!slug) {
    console.error('Error: title must contain valid characters');
    process.exit(1);
  }
  
  return slug;
}

// Generate date (default to today)
function generateDate(dateParam) {
  if (dateParam) {
    return dateParam;
  }
  
  // Use local date instead of UTC to avoid timezone issues
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Build folder path with auto-increment
function buildFolderPath(baseDir, slug) {
  let folderName = slug;
  let fullPath = path.join(baseDir, folderName);
  let counter = 2;
  const maxAttempts = 100;
  
  // Auto-increment if folder exists
  while (fs.existsSync(fullPath)) {
    if (counter > maxAttempts) {
      console.error(`Error: Too many folders with similar names (${maxAttempts}+ attempts)`);
      process.exit(1);
    }
    folderName = `${slug}-${counter}`;
    fullPath = path.join(baseDir, folderName);
    counter++;
  }
  
  // Validate against path traversal
  const resolvedPath = path.resolve(fullPath);
  const resolvedBaseDir = path.resolve(baseDir);
  
  if (!resolvedPath.startsWith(resolvedBaseDir)) {
    console.error('Error: Invalid folder name (path traversal detected)');
    process.exit(1);
  }
  
  return { folderName, fullPath };
}

// Generate frontmatter
function generateFrontmatter(title, tags, date) {
  const tagsArray = tags
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0); // Filter out empty tags
  
  if (tagsArray.length === 0) {
    console.error('Error: at least one valid tag is required');
    process.exit(1);
  }
  
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
  
  // Validate blog directory exists
  if (!fs.existsSync(blogDir)) {
    console.error(`Error: blog directory not found: ${blogDir}`);
    process.exit(1);
  }
  
  const { folderName, fullPath } = buildFolderPath(blogDir, slug);
  
  // Create directory and write file with error handling
  try {
    fs.mkdirSync(fullPath, { recursive: true });
    
    // Generate and write frontmatter to index.md
    const frontmatter = generateFrontmatter(params.title, params.tags, date);
    const filePath = path.join(fullPath, 'index.md');
    fs.writeFileSync(filePath, frontmatter);
  } catch (error) {
    console.error('Error: Failed to create new post files.');
    if (error && error.message) {
      console.error(`Reason: ${error.message}`);
    }
    process.exit(1);
  }
  
  // Display success message
  console.log('Folder:');
  console.log(`content/blog/${folderName}/\n`);
  console.log('File:');
  console.log(`content/blog/${folderName}/index.md\n`);
  console.log('Done.\n');
}

// Run the script
main();
