#!/usr/bin/env node

/**
 * Simple favicon generator script
 * Creates PNG favicons from SVG using a minimal approach
 * Note: For production, consider using: https://www.npmjs.com/package/sharp
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

// SVG favicon content
const faviconSvg = fs.readFileSync(path.join(publicDir, 'favicon.svg'), 'utf-8');

// Placeholder PNG creation (1x1 transparent PNG)
// For production, use 'sharp' package for real PNG generation
const createPlaceholderPNG = () => {
  // Minimal PNG structure (1x1 transparent)
  const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
  return Buffer.from(pngBase64, 'base64');
};

console.log('🎨 Generating favicon files...');

try {
  // Create favicon-32x32.png
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), createPlaceholderPNG());
  console.log('✅ Created favicon-32x32.png');

  // Create favicon-16x16.png
  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), createPlaceholderPNG());
  console.log('✅ Created favicon-16x16.png');

  // Create apple-touch-icon.png
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPlaceholderPNG());
  console.log('✅ Created apple-touch-icon.png');

  // Create og-image.png
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), createPlaceholderPNG());
  console.log('✅ Created og-image.png');

  console.log('\n📦 Favicon generation complete!');
  console.log('\nNote: These are placeholder PNG files.');
  console.log('For production-quality favicons, install and use:');
  console.log('  npm install -D sharp');
  console.log('  then use a proper favicon generation library like:');
  console.log('  - realfavicongenerator.net');
  console.log('  - https://www.npmjs.com/package/favicon-generator');

} catch (error) {
  console.error('❌ Error generating favicons:', error.message);
  process.exit(1);
}
