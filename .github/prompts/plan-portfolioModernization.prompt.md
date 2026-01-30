# Plan: Full Portfolio Website Modernization

This plan addresses the portfolio's core issues: **massive HTML duplication** across 17+ files, outdated dependencies (Bootstrap 4, jQuery, Owl Carousel), dead French language feature, and accessibility/SEO gaps.

---

## Phase 1: Quick Fixes (No Breaking Changes) ✅ COMPLETED

### Task 1.1: Fix Broken Assets
- [x] Correct `../assets/img` paths to `assets/img` in certifications.html
- [ ] Verify all image paths across detail pages

### Task 1.2: SEO & Meta Tags
- [x] Add meaningful `<meta description>` to index.html
- [x] Add `<meta keywords>` to index.html
- [ ] Review and update meta tags on all pages

### Task 1.3: Accessibility Quick Wins
- [x] Add alt text to profile image and all portfolio images
- [x] Add `loading="lazy"` attribute to below-fold images

### Task 1.4: Remove Dead Features
- [x] Remove "Lire En Français" link from index.html
- [x] Remove "Lire En Français" link from certifications.html
- [x] Clean up any related CSS/JS for language switching

---

## Phase 2: Jekyll Migration (Eliminates Duplication) ✅ COMPLETED

### Task 2.1: Initialize Jekyll Structure ✅
- [x] Create `_config.yml` with site settings
- [x] Create `_includes/` directory
- [x] Create `_layouts/` directory
- [x] Add `.nojekyll` removal or proper Jekyll setup for GitHub Pages

### Task 2.2: Extract Shared Components ✅
- [x] Create `_includes/head.html` (meta tags, CSS links)
- [x] Create `_includes/header.html` (sidebar navigation)
- [x] Create `_includes/scripts.html` (all JS includes)
- [x] Create `_includes/footer.html` (if applicable)

### Task 2.3: Create Page Layouts ✅
- [x] Create `_layouts/default.html` (main page template)
- [x] Create `_layouts/project-detail.html` (for all *-details.html pages)
- [x] Create `_layouts/certifications.html` (for certifications page)

### Task 2.4: Convert Existing Pages ✅
- [x] Convert certifications.html to use Jekyll layout (566→276 lines, -51%)
- [x] Convert all 16 project detail pages to use Jekyll layout (8,400→1,800 lines, -78%)
- [ ] Convert index.html to use Jekyll layout (complex, has custom inline CSS/JS)
- [x] Move project data to front matter

---

## Phase 3: Frontend Stack Upgrade

### Task 3.1: Upgrade Bootstrap
- [ ] Replace Bootstrap 4.x CSS with Bootstrap 5.3
- [ ] Replace Bootstrap 4.x JS with Bootstrap 5.3
- [ ] Update HTML classes for Bootstrap 5 breaking changes (e.g., `data-toggle` → `data-bs-toggle`)
- [ ] Test responsive behavior

### Task 3.2: Remove jQuery Dependency
- [ ] Rewrite `main.js` in vanilla JavaScript
- [ ] Update smooth scrolling to native JS
- [ ] Update mobile nav toggle to vanilla JS
- [ ] Remove jQuery from script includes

### Task 3.3: Replace Owl Carousel with Swiper
- [ ] Install/add Swiper.js files
- [ ] Rewrite carousel initialization for Swiper API
- [ ] Update carousel HTML structure
- [ ] Remove Owl Carousel files from vendor/

### Task 3.4: Cleanup Vendor Dependencies
- [ ] Remove unused vendor libraries
- [ ] Update remaining libraries to latest versions
- [ ] Consider CDN links vs local files

---

## Phase 4: Design Modernization

### Task 4.1: Typography Optimization
- [ ] Reduce Google Fonts to 1-2 families (currently 3)
- [ ] Use `font-display: swap` for better loading
- [ ] Review font weights (remove unused)

### Task 4.2: Skills Section Redesign
- [ ] Replace percentage progress bars with tag/chip-based display
- [ ] Group skills by category (Languages, Frameworks, Tools, etc.)
- [ ] Update CSS for new skill display

### Task 4.3: Dark Mode Support
- [ ] Add CSS custom properties for theming
- [ ] Create dark theme color scheme
- [ ] Add theme toggle button in header
- [ ] Store preference in localStorage

### Task 4.4: General UI Polish
- [ ] Review and update color scheme if needed
- [ ] Improve card hover effects
- [ ] Enhance mobile navigation experience
- [ ] Add subtle micro-interactions

---

## Phase 5: Build & Deploy Optimization

### Task 5.1: GitHub Actions Workflow
- [ ] Create `.github/workflows/deploy.yml`
- [ ] Add Jekyll build step
- [ ] Add CSS/JS minification
- [ ] Configure GitHub Pages deployment

### Task 5.2: Image Optimization
- [ ] Compress existing images
- [ ] Convert to WebP format where beneficial
- [ ] Add responsive image srcsets

### Task 5.3: Performance Audit
- [ ] Run Lighthouse audit
- [ ] Fix any critical performance issues
- [ ] Implement critical CSS inlining
- [ ] Add resource hints (preconnect, prefetch)

---

## Decision Points (Choose Before Starting)

### Framework Choice
- **Option A: Bootstrap 5** — Faster migration, familiar syntax
- **Option B: Tailwind CSS** — Modern utility-first, smaller bundle, steeper learning curve
- **Option C: Vanilla CSS** — No dependencies, full control, more work

### Contact Form Solution
- **Option A: Formspree** — Simple, free tier available
- **Option B: Netlify Forms** — If moving to Netlify
- **Option C: EmailJS** — Client-side, no server needed

---

## Reference: Current State

### Files with Duplicated Code (17+ files)
- index.html
- certifications.html
- All *-details.html project pages (15 files)

### Libraries to Keep
- Boxicons, AOS, Typed.js, Isotope, VenoBox

### Libraries to Remove/Replace
- jQuery → Vanilla JS
- Bootstrap 4 → Bootstrap 5.3
- Owl Carousel → Swiper.js
- IcoFont → Boxicons (already have)
