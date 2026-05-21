# ShaRiz Kreations — TODO

## Database & Admin Panel Sync

- [x] Install better-sqlite3 for persistent file-based database
- [x] Create SQLite database schema (products, reviews, gallery, settings, promo_codes, admin_users)
- [x] Seed database with all existing product, review, gallery, and settings data
- [x] Build Express server with full admin CRUD API routes
- [x] Admin login via JWT token (POST /api/admin/login)
- [x] Public API endpoints for products, reviews, gallery, settings
- [x] Admin API endpoints for products CRUD (GET/POST/PUT/DELETE)
- [x] Admin API endpoints for reviews CRUD
- [x] Admin API endpoints for gallery CRUD
- [x] Admin API endpoints for settings PUT
- [x] Image upload endpoint with Forge CDN integration and base64 fallback
- [x] Rewrite AdminContext to authenticate via real API and store JWT
- [x] Create centralized API client module (client/src/lib/api.ts)
- [x] Rewrite AdminEditPanel to use real API calls (no more localStorage)
- [x] Update Home.tsx to fetch live data from API on mount
- [x] Fix ProductsSection to use ApiProduct shape (actual_price instead of price string)
- [x] Fix GallerySection to use ApiGalleryItem shape (image_url instead of string)
- [x] Fix TestimonialsSection to use ApiReview shape (customer_name, review, stars)
- [x] TypeScript compilation passes with no errors

## Pending / Future

- [ ] Admin password change UI
- [ ] Promo code management UI in admin panel
- [ ] Gallery reordering (drag-and-drop)
- [ ] Product sort order management
- [ ] Bulk gallery upload with progress indicator
- [ ] Site backup/restore in admin panel
