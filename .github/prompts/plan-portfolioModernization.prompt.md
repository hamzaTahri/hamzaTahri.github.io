# Plan: Full Portfolio Website Modernization

This plan addresses the portfolio's core issues: **massive HTML duplication** across 17+ files, outdated dependencies (Bootstrap 4, jQuery, Owl Carousel), dead French language feature, and accessibility/SEO gaps.

---

## Phase 1: Quick Fixes (No Breaking Changes) ✅ COMPLETED

### Task 1.1: Fix Broken Assets
- [x] Correct `../assets/img` paths to `assets/img` in certifications.html
- [x] Verify all image paths across detail pages

### Task 1.2: SEO & Meta Tags
- [x] Add meaningful `<meta description>` to index.html
- [x] Add `<meta keywords>` to index.html
- [x] Review and update meta tags on all pages

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
- [x] Convert index.html to use Jekyll layout (complex, has custom inline CSS/JS)
- [x] Move project data to front matter

---

## Phase 3: Frontend Stack Upgrade ✅ COMPLETED

### Task 3.1: Upgrade Bootstrap
- [x] Replace Bootstrap 4.x CSS with Bootstrap 5.3
- [x] Replace Bootstrap 4.x JS with Bootstrap 5.3
- [x] Update HTML classes for Bootstrap 5 breaking changes (e.g., `data-toggle` → `data-bs-toggle`, `row no-gutters` → `row g-0`, `form-row` → `row g-3`)
- [x] Test responsive behavior

### Task 3.2: Remove jQuery Dependency
- [x] Rewrite `main.js` in vanilla JavaScript (`main-vanilla.js`)
- [x] Update smooth scrolling to native JS
- [x] Update mobile nav toggle to vanilla JS
- [x] Remove jQuery from script includes and delete legacy `main.js`

### Task 3.3: Replace Owl Carousel with Swiper
- [x] Install/add Swiper.js files (CDN Swiper 11)
- [x] Rewrite carousel initialization for Swiper API
- [x] Update carousel HTML structure
- [x] Remove Owl Carousel files from vendor/

### Task 3.4: Cleanup Vendor Dependencies
- [x] Remove unused vendor libraries
- [x] Update remaining libraries to latest versions
- [x] Consider CDN links vs local files

---

## Phase 4: Design Modernization ✅ COMPLETED

### Task 4.1: Typography Optimization
- [x] Reduce Google Fonts to 1-2 families (currently 2: Open Sans & Raleway)
- [x] Use `font-display: swap` for better loading
- [x] Review font weights (remove unused)

### Task 4.2: Skills Section Redesign
- [x] Replace percentage progress bars with tag/chip-based display
- [x] Group skills by category (Languages, Backend & APIs, Frontend & Mobile, Databases, DevOps & Cloud, Tools & Methods)
- [x] Update CSS for new skill display

### Task 4.3: Dark Mode Support
- [x] Add CSS custom properties for theming
- [x] Create dark theme color scheme
- [x] Add theme toggle button in header
- [x] Store preference in localStorage

### Task 4.4: General UI Polish
- [x] Review and update color scheme if needed
- [x] Improve card hover effects
- [x] Enhance mobile navigation experience
- [x] Add subtle micro-interactions

---

## Phase 5: Build & Deploy Optimization ✅ COMPLETED

### Task 5.1: GitHub Actions Workflow
- [x] Create `.github/workflows/deploy.yml`
- [x] Add Jekyll build step
- [x] Add CSS/JS minification
- [x] Configure GitHub Pages deployment

### Task 5.2: Image Optimization
- [x] Compress existing images
- [x] Configure image optimization in deployment workflow (jpegoptim & optipng)
- [x] Add responsive image srcsets / lazy loading

### Task 5.3: Performance Audit
- [x] Run performance checks / verify assets
- [x] Fix any critical performance issues
- [x] Implement critical CSS inlining
- [x] Add resource hints (preconnect, prefetch)

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
