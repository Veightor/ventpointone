# KorBIN-view Compatibility Guide

## 📋 Current Tech Stack Status

### ✅ **Stable & Recommended**

- **Next.js 15.4.1** - Latest stable version
- **TypeScript 5.8.3** - Mature and stable
- **Node.js >= 18** - Well supported

### ⚠️ **Bleeding Edge (Monitor for Issues)**

- **React 19.1.0** - Very new (Dec 2024), monitor ecosystem compatibility
- **Tailwind CSS v4.1.11** - New major version, some features still experimental
- **@tailwindcss/postcss v4** - New PostCSS plugin architecture

### 🔧 **Compatibility Fixes Applied**

- **ESLint downgraded to v8** - Better compatibility with Next.js plugins
- **Turbopack disabled by default** - Conflicts with Tailwind v4 PostCSS processing
- **Updated CSS imports** - Using new `@import "tailwindcss"` syntax for v4

## 🚨 **Known Issues & Solutions**

### 1. **Turbopack + Tailwind CSS v4**

- **Issue:** Turbopack doesn't fully support Tailwind v4's PostCSS setup
- **Solution:** Use `npm run dev` (default) instead of `npm run dev:turbo`
- **Future:** Monitor Turbopack compatibility updates

### 2. **React 19 Ecosystem Compatibility**

- **Risk:** Some libraries may not support React 19 yet
- **Monitor:** NextAuth.js, UI component libraries, testing tools
- **Fallback:** Ready to downgrade to React 18 if needed

### 3. **Tailwind CSS v4 Changes**

- **New Syntax:** Using `@import "tailwindcss"` instead of separate directives
- **Config Changes:** Simplified configuration, some v3 features deprecated
- **Migration:** May need updates when adding Tailwind plugins

## 🔮 **Future Package Additions**

### **High Priority (Phase 0.5)**

```json
{
  "next-auth": "^5.0.0", // Watch for React 19 support
  "zustand": "^4.4.7", // State management (React 19 compatible)
  "@prisma/client": "^5", // Database ORM
  "zod": "^3.22.4" // Schema validation
}
```

### **Medium Priority**

```json
{
  "@next/bundle-analyzer": "^15", // Bundle analysis
  "sharp": "^0.33.0", // Image optimization
  "framer-motion": "^10", // Animations (check React 19 support)
  "@headlessui/react": "^1.7.0" // UI components (check React 19 support)
}
```

### **Testing Stack**

```json
{
  "vitest": "^1.0.0", // Modern testing framework
  "@testing-library/react": "^14", // Check React 19 support
  "playwright": "^1.40.0" // E2E testing
}
```

## 📝 **Development Scripts**

```bash
# Current working setup
npm run dev          # Standard dev server (recommended)
npm run dev:turbo    # Turbopack dev server (use if Tailwind issues resolved)
npm run build        # Production build
npm run lint         # ESLint checking
```

## 🔍 **Monitoring Checklist**

### **Weekly Checks**

- [ ] React 19 compatibility updates for ecosystem packages
- [ ] Tailwind CSS v4 stable release announcements
- [ ] Next.js 15.x patch updates

### **Before Adding New Packages**

- [ ] Check React 19 compatibility
- [ ] Test with current Tailwind v4 setup
- [ ] Verify TypeScript support

### **Red Flags (Immediate Action Required)**

- Build failures after dependency updates
- Styling not loading (Tailwind issues)
- TypeScript compilation errors
- Performance degradation

## 🛠️ **Emergency Rollback Plan**

If critical issues arise, here are safe fallback versions:

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "tailwindcss": "^3.4.0",
  "eslint": "^8.57.0"
}
```

## 🎯 **Recommendations**

1. **Commit frequently** with clear messages about dependency changes
2. **Test thoroughly** before major version bumps
3. **Monitor GitHub issues** for the bleeding-edge packages
4. **Keep documentation updated** as compatibility improves
5. **Consider version pinning** for critical dependencies

---

_Last updated: January 2025_
