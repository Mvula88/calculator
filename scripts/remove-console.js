#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Directories to process
const dirsToProcess = ['app', 'components', 'lib'];

// Files to skip
const skipFiles = [
  'test.ts',
  'test.tsx',
  'spec.ts',
  'spec.tsx',
  '.test.ts',
  '.test.tsx',
  '.spec.ts',
  '.spec.tsx'
];

// Patterns to remove
const consolePatterns = [
  /^\s*console\.(log|debug|info|warn|error)\(.*?\);?\s*$/gm,
  /^\s*console\.(log|debug|info|warn|error)\([\s\S]*?\);?\s*$/gm
];

function shouldSkipFile(filePath) {
  const basename = path.basename(filePath).toLowerCase();
  return skipFiles.some(skip => basename.includes(skip));
}

function removeConsoleLogs(filePath) {
  if (shouldSkipFile(filePath)) {
    return 0;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let removedCount = 0;

  // Count console statements before removing
  const matches = content.match(/console\.(log|debug|info|warn|error)/g);
  if (matches) {
    removedCount = matches.length;
  }

  // Remove console statements
  consolePatterns.forEach(pattern => {
    content = content.replace(pattern, '');
  });

  // Remove empty lines that might be left
  content = content.replace(/^\s*\n/gm, '\n');
  content = content.replace(/\n\n\n+/g, '\n\n');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Removed ${removedCount} console statements from: ${filePath}`);
  }

  return removedCount;
}

function processDirectory(dir) {
  let totalRemoved = 0;

  if (!fs.existsSync(dir)) {
    return totalRemoved;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      totalRemoved += processDirectory(filePath);
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx'))) {
      totalRemoved += removeConsoleLogs(filePath);
    }
  }

  return totalRemoved;
}

console.log('🔍 Removing console statements from production code...\n');

let totalRemoved = 0;
for (const dir of dirsToProcess) {
  const fullPath = path.join(process.cwd(), dir);
  console.log(`Processing ${dir}...`);
  totalRemoved += processDirectory(fullPath);
}

console.log(`\n✅ Complete! Removed ${totalRemoved} console statements total.`);
console.log('💡 Note: Console statements in error handlers have been removed too.');
console.log('   Consider keeping critical error logging for production debugging.');