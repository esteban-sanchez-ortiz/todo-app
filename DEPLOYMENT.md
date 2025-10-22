# Deployment Guide - Todo Floating App

This guide explains how to deploy your Todo app to GitHub Pages using GitHub Actions.

## 📋 Prerequisites

1. **GitHub Repository**: Your code must be on GitHub
2. **Node.js 20+**: Required for building
3. **Git**: For version control

## 🚀 Automatic Deployment with GitHub Actions

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Build and deployment**, select:
   - Source: **GitHub Actions**
4. Your app will be available at: `https://estebansanchez.github.io/todo-app/`

### Step 2: Verify the Workflow

The `.github/workflows/build-and-deploy.yml` workflow will:

✅ Run on every push to `main` branch
✅ Run on pull requests for testing
✅ Build the app with optimizations:
  - Code splitting (React vendors, dnd-kit vendors)
  - Terser minification
  - ES2020 target for modern browsers
  - Console statement removal

✅ Deploy to GitHub Pages automatically
✅ Generate performance reports

### Step 3: Push to Trigger Deployment

```bash
# Make changes to your code
git add .
git commit -m "Update: add GitHub Actions and SEO optimizations"
git push origin main
```

Visit **Actions** tab in GitHub to see the build progress.

Once complete, your app will be live at: `https://estebansanchez.github.io/todo-app/`

## 📦 Build Optimizations Applied

### Vite Configuration
- **Base path**: `/todo-app/` (for GitHub Pages subdirectory)
- **Code splitting**: Separate vendor chunks for better caching
- **Minification**: Terser with console removal
- **Target**: ES2020 (modern browsers only)

### HTML/SEO Optimizations
- ✅ Meta tags (description, keywords, author)
- ✅ Open Graph tags (Facebook/LinkedIn sharing)
- ✅ Twitter Card tags
- ✅ Apple Mobile Web App meta tags
- ✅ Theme color specification
- ✅ Favicon support (SVG + PNG variants)
- ✅ Web App Manifest
- ✅ robots.txt
- ✅ sitemap.xml

### Performance Features
- Code splitting for vendor libraries
- Source maps disabled in production
- Gzip compression ready
- Bundle size analysis in build output

## 📊 Build Output

After pushing, check the build results:

```
📦 Build size analysis:
Files generated in dist/

📊 Chunk information:
- react-vendor.js (React libraries)
- dnd-kit-vendor.js (Drag & drop libraries)
- index.js (Your app code)
- CSS chunks
```

## 🔗 SEO Features

Your app now includes:

1. **Meta Tags**: Proper description, keywords, and author
2. **Open Graph**: Rich previews on Facebook, LinkedIn, Discord
3. **Twitter Cards**: Custom Twitter sharing preview
4. **Mobile Web App**: Installable on mobile browsers
5. **Manifest.json**: PWA (Progressive Web App) support
6. **Favicons**: Multiple formats (SVG, PNG 16x16, 32x32, Apple touch icon)
7. **robots.txt**: Search engine crawler instructions
8. **sitemap.xml**: URL indexing for search engines

## 🎨 Customizing Favicons

### Current Setup
- SVG favicon (scales to any size)
- PNG variants for fallback support
- Apple touch icon for iOS home screen

### To Create Custom Favicons
1. Use [RealFaviconGenerator](https://realfavicongenerator.net/) to generate from a design
2. Replace the files in `/public/`:
   - `favicon.svg`
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png`
   - Update `public/manifest.json` with icon references

## 🌐 URL Configuration

All URLs in SEO files point to your GitHub Pages deployment:
```
https://estebansanchez.github.io/todo-app/
```

To use a custom domain:
1. In GitHub Settings → Pages, add your custom domain
2. Update these files with your domain:
   - `index.html` (og:url, twitter:url)
   - `public/robots.txt`
   - `public/sitemap.xml`
   - `public/manifest.json` (start_url, scope)
   - `vite.config.ts` (base path)

## 📝 Local Testing

### Test production build locally

```bash
# Generate favicons
npm run generate:favicons

# Build for production
npm run build

# Preview the build
npm run preview
```

The preview will show how your app looks in production.

## 🐛 Troubleshooting

### Build Fails
- Check the **Actions** tab in GitHub for error messages
- Common issues:
  - Node.js version mismatch (requires 20.x)
  - Missing dependencies (run `npm ci`)
  - TypeScript errors (run `npm run type-check`)

### Assets Not Loading
- Check browser console for 404 errors
- Ensure base path `/todo-app/` is in `vite.config.ts`
- Clear browser cache (Cmd+Shift+Delete)

### Slow Build
- GitHub Actions may take 2-3 minutes first time
- Subsequent builds are faster with caching
- npm dependencies are cached between runs

## 📈 Monitoring Deployment

### GitHub Actions Insights
- Visit **Actions** tab to see build history
- Click a workflow run to see detailed logs
- Green checkmark = successful deployment
- Red X = build failed (check logs for errors)

### Performance Monitoring
The workflow automatically reports:
- Build size breakdown
- JavaScript chunk sizes
- Gzip-compressed sizes
- File count

## 🔄 Updating Your App

Every time you push to `main`:
1. GitHub Actions automatically builds your app
2. Optimizations are applied
3. Built files are deployed to GitHub Pages
4. Live at `https://estebansanchez.github.io/todo-app/`

No manual steps needed!

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)
- [Web Vitals SEO](https://web.dev/vitals/)
- [Open Graph Protocol](https://ogp.me/)
- [PWA Manifest Spec](https://www.w3.org/TR/appmanifest/)

---

**Your app is now production-ready with automated deployment! 🎉**
