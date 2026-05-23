/**
 * API client for ShaRiz Kreations
 * All data fetching and mutations go through this module.
 */

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ApiProduct {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  actual_price: number | null;
  sale_price: number | null;
  discount_percent: number;
  tag: string;
  availability: string;
  images: string[];
  sort_order: number;
  is_active: number;
}

export interface ApiReview {
  id: number;
  customer_name: string;
  review: string;
  stars: number;
  product_name: string | null;
  is_approved: number;
  is_visible: number;
  sort_order: number;
  created_at: string;
}

export interface ApiGalleryItem {
  id: number;
  image_url: string;
  caption: string | null;
  sort_order: number;
  is_visible: number;
}

export interface ApiSettings {
  heroTitle?: string;
  heroSubtitle?: string;
  whatsapp?: string;
  instagram?: string;
  email?: string;
  footerText?: string;
  [key: string]: string | undefined;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function authHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse<T>(resp: Response): Promise<T> {
  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`API error ${resp.status}: ${text}`);
  }
  return resp.json() as Promise<T>;
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function fetchPublicProducts(): Promise<ApiProduct[]> {
  const resp = await fetch("/api/public/products");
  return handleResponse<ApiProduct[]>(resp);
}

export async function fetchPublicReviews(): Promise<ApiReview[]> {
  const resp = await fetch("/api/public/reviews");
  return handleResponse<ApiReview[]>(resp);
}

export async function fetchPublicGallery(): Promise<ApiGalleryItem[]> {
  const resp = await fetch("/api/public/gallery");
  return handleResponse<ApiGalleryItem[]>(resp);
}

export async function fetchPublicSettings(): Promise<ApiSettings> {
  const resp = await fetch("/api/public/settings");
  return handleResponse<ApiSettings>(resp);
}

// ─── Public: Submit Review ───────────────────────────────────────────────────
export async function submitPublicReview(data: {
  customer_name: string;
  review: string;
  stars: number;
  product_name?: string;
}): Promise<{ id: number; message: string }> {
  const resp = await fetch("/api/admin/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse<{ id: number; message: string }>(resp);
}

// ─── Admin: Products ──────────────────────────────────────────────────────────
export async function adminFetchProducts(token: string): Promise<ApiProduct[]> {
  const resp = await fetch("/api/admin/products", { headers: authHeaders(token) });
  return handleResponse<ApiProduct[]>(resp);
}

export async function adminUpdateProduct(token: string, id: number, data: Partial<ApiProduct>): Promise<void> {
  const resp = await fetch(`/api/admin/products/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  await handleResponse(resp);
}

export async function adminCreateProduct(token: string, data: Partial<ApiProduct>): Promise<{ id: number }> {
  const resp = await fetch("/api/admin/products", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<{ id: number }>(resp);
}

export async function adminDeleteProduct(token: string, id: number): Promise<void> {
  const resp = await fetch(`/api/admin/products/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  await handleResponse(resp);
}

// ─── Admin: Reviews ───────────────────────────────────────────────────────────
export async function adminFetchReviews(token: string): Promise<ApiReview[]> {
  const resp = await fetch("/api/admin/reviews", { headers: authHeaders(token) });
  return handleResponse<ApiReview[]>(resp);
}

export async function adminCreateReview(token: string, data: { customer_name: string; review: string; stars: number; product_name?: string }): Promise<{ id: number }> {
  const resp = await fetch("/api/admin/reviews", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  return handleResponse<{ id: number }>(resp);
}

export async function adminUpdateReview(token: string, id: number, data: Partial<ApiReview>): Promise<void> {
  const resp = await fetch(`/api/admin/reviews/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  await handleResponse(resp);
}

export async function adminDeleteReview(token: string, id: number): Promise<void> {
  const resp = await fetch(`/api/admin/reviews/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  await handleResponse(resp);
}

// ─── Admin: Gallery ───────────────────────────────────────────────────────────
export async function adminFetchGallery(token: string): Promise<ApiGalleryItem[]> {
  const resp = await fetch("/api/admin/gallery", { headers: authHeaders(token) });
  return handleResponse<ApiGalleryItem[]>(resp);
}

export async function adminAddGalleryItem(token: string, image_url: string, caption?: string): Promise<{ id: number }> {
  const resp = await fetch("/api/admin/gallery", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ image_url, caption }),
  });
  return handleResponse<{ id: number }>(resp);
}

export async function adminUpdateGalleryItem(token: string, id: number, data: Partial<ApiGalleryItem>): Promise<void> {
  const resp = await fetch(`/api/admin/gallery/${id}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  await handleResponse(resp);
}

export async function adminDeleteGalleryItem(token: string, id: number): Promise<void> {
  const resp = await fetch(`/api/admin/gallery/${id}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  await handleResponse(resp);
}

// ─── Admin: Settings ──────────────────────────────────────────────────────────
export async function adminFetchSettings(token: string): Promise<ApiSettings> {
  const resp = await fetch("/api/admin/settings", { headers: authHeaders(token) });
  return handleResponse<ApiSettings>(resp);
}

export async function adminSaveSettings(token: string, settings: ApiSettings): Promise<void> {
  const resp = await fetch("/api/admin/settings", {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify(settings),
  });
  await handleResponse(resp);
}

// ─── Admin: Image Upload ──────────────────────────────────────────────────────
export async function adminUploadImage(token: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const resp = await fetch("/api/admin/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await handleResponse<{ url: string }>(resp);
  return data.url;
}
