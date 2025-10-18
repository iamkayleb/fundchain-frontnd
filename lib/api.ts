/* Minimal fetch wrapper for the frontend.
 * - uses NEXT_PUBLIC_API_URL as base
 * - always sends credentials (cookie auth)
 * - provides apiGet, apiPost (JSON) and apiPostForm (FormData/file uploads)
 */

// Default to backend running on localhost:5000 when NEXT_PUBLIC_API_URL is not set.
// This helps local development so the frontend talks to the Flask backend by default.
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export type ApiError = {
  status: number;
  message: string;
  details?: any;
};

async function handleResponse(res: Response) {
  const ct = res.headers.get('content-type') || '';
  let body: any = null;
  try {
    if (ct.includes('application/json')) {
      body = await res.json();
    } else {
      body = await res.text();
    }
  } catch (err) {
    // ignore parse errors
  }

  if (!res.ok) {
    const err: ApiError = { status: res.status, message: body?.msg || body?.message || res.statusText || 'Error', details: body };
    throw err;
  }

  return body;
}

function buildUrl(path: string) {
  if (!path) return API_BASE;
  if (path.startsWith('http')) return path;
  const base = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export async function apiGet(path: string, opts: RequestInit = {}) {
  const url = buildUrl(path);
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(opts.headers || {}),
    },
    ...opts,
  });
  return handleResponse(res);
}

export async function apiPost(path: string, data: any, opts: RequestInit = {}) {
  const url = buildUrl(path);
  // Attach CSRF token from cookie (Flask-JWT-Extended sets csrf_access_token cookie)
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const m = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[2]) : null;
  };
  const csrf = getCookie('csrf_access_token');

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(opts.headers || {}),
      ...(csrf ? { 'X-CSRF-TOKEN': csrf } : {}),
    },
    body: JSON.stringify(data),
    ...opts,
  });
  return handleResponse(res);
}

export async function apiPostForm(path: string, form: FormData, opts: RequestInit = {}) {
  const url = buildUrl(path);
  const getCookie = (name: string) => {
    if (typeof document === 'undefined') return null;
    const m = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]*)'));
    return m ? decodeURIComponent(m[2]) : null;
  };
  const csrf = getCookie('csrf_access_token');

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'include',
    // Do not set Content-Type for FormData — browser will set the boundary
    body: form,
    headers: {
      ...(csrf ? { 'X-CSRF-TOKEN': csrf } : {}),
    },
    ...opts,
  });
  return handleResponse(res);
}

// Institution API endpoints
export const institutionApi = {
  // Register a new institution
  register: async (data: {
    institution_name: string;
    representative_name: string;
    email: string;
    email_domain: string;
    password: string;
    bank_account_details?: any;
    accreditation_docs?: string[];
  }) => {
    return apiPost('/api/institution/register', data);
  },

  // Get student verification requests for institution
  getVerificationRequests: async (role: string = 'student') => {
    return apiGet(`/api/admin/verification-requests?role=${role}`);
  },

  // Get all verification requests (admin function but institutions can use)
  getAllVerificationRequests: async () => {
    return apiGet('/api/admin/verification-requests');
  },

  // Get institution profile
  getProfile: async () => {
    return apiGet('/api/me');
  },

  // Get campaigns (can filter by institution)
  getCampaigns: async (params?: { status?: string; institution_id?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.institution_id) searchParams.append('institution_id', params.institution_id.toString());
    
    const query = searchParams.toString();
    return apiGet(`/api/campaigns${query ? `?${query}` : ''}`);
  },

  // Get specific campaign details
  getCampaign: async (campaignId: number) => {
    return apiGet(`/api/campaigns/${campaignId}`);
  },
};

// Student verification API endpoints
export const verificationApi = {
  // Get all verification requests (admin/institution use)
  getRequests: async (role?: string) => {
    const query = role ? `?role=${role}` : '';
    return apiGet(`/api/admin/verification-requests${query}`);
  },

  // Approve student verification (admin only)
  approveStudent: async (requestId: number) => {
    return apiPost(`/api/admin/verify/student/${requestId}/approve`, {});
  },

  // Reject student verification (admin only)
  rejectStudent: async (requestId: number, reason: string) => {
    return apiPost(`/api/admin/verify/student/${requestId}/reject`, { reason });
  },

  // Submit student verification request
  submitRequest: async (documentUrls: string[]) => {
    return apiPost('/api/student/verify-request', { document_urls: documentUrls });
  },
};

// Admin API endpoints - comprehensive admin functionality
export const adminApi = {
  // === LEDGER MANAGEMENT ===
  // Get blockchain ledger with pagination and filtering
  getLedger: async (page: number = 1, perPage: number = 20, filters?: {
    transaction_type?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
  }) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('per_page', perPage.toString());
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
    }
    
    return apiGet(`/api/admin/ledger?${params.toString()}`);
  },

  // === VERIFICATION MANAGEMENT ===
  // Get all verification requests with filtering
  getVerificationRequests: async (filters?: {
    role?: string;
    status?: string;
    page?: number;
    per_page?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value.toString());
      });
    }
    
    const query = params.toString();
    return apiGet(`/api/admin/verification-requests${query ? `?${query}` : ''}`);
  },

  // Approve student verification
  approveStudentVerification: async (requestId: number) => {
    return apiPost(`/api/admin/verify/student/${requestId}/approve`, {});
  },

  // Reject student verification with reason
  rejectStudentVerification: async (requestId: number, reason: string) => {
    return apiPost(`/api/admin/verify/student/${requestId}/reject`, { reason });
  },

  // Approve institution verification
  approveInstitutionVerification: async (requestId: number) => {
    return apiPost(`/api/admin/verify/institution/${requestId}/approve`, {});
  },

  // Reject institution verification with reason
  rejectInstitutionVerification: async (requestId: number, reason: string) => {
    return apiPost(`/api/admin/verify/institution/${requestId}/reject`, { reason });
  },

  // === CAMPAIGN MANAGEMENT ===
  // Get campaigns pending admin approval
  getPendingCampaigns: async (filters?: {
    status?: string;
    page?: number;
    per_page?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value.toString());
      });
    }
    
    const query = params.toString();
    return apiGet(`/api/admin/campaigns${query ? `?${query}` : ''}`);
  },

  // Approve campaign for public fundraising
  approveCampaign: async (campaignId: number) => {
    return apiPost(`/api/admin/campaigns/${campaignId}/approve`, {});
  },

  // Reject campaign with reason
  rejectCampaign: async (campaignId: number, reason: string) => {
    return apiPost(`/api/admin/campaigns/${campaignId}/reject`, { reason });
  },

  // === FINALIZATION & DISBURSEMENT ===
  // Finalize completed campaign and disburse funds
  finalizeCampaign: async (campaignId: number, force: boolean = false) => {
    return apiPost(`/api/admin/finalize/${campaignId}`, { force });
  },

  // === NOTIFICATIONS & SYSTEM ===
  // Get admin notifications
  getNotifications: async () => {
    return apiGet('/api/admin/notifications');
  },

  // Mark notification as read
  markNotificationRead: async (notificationId: number) => {
    return apiPost(`/api/admin/notifications/${notificationId}/read`, {});
  },

  // === SYSTEM STATISTICS ===
  // Get comprehensive system statistics
  getSystemStats: async () => {
    return apiGet('/api/admin/stats');
  },

  // Get user statistics
  getUserStats: async () => {
    return apiGet('/api/admin/users/stats');
  },

  // Get financial statistics
  getFinancialStats: async () => {
    return apiGet('/api/admin/financial/stats');
  },

  // === USER MANAGEMENT ===
  // Get all users with filtering
  getUsers: async (filters?: {
    role?: string;
    status?: string;
    search?: string;
    page?: number;
    per_page?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params.append(key, value.toString());
      });
    }
    
    const query = params.toString();
    return apiGet(`/api/admin/users${query ? `?${query}` : ''}`);
  },

  // Get specific user details
  getUserDetails: async (userId: number) => {
    return apiGet(`/api/admin/users/${userId}`);
  },

  // Update user status (suspend, activate, etc.)
  updateUserStatus: async (userId: number, status: string, reason?: string) => {
    return apiPost(`/api/admin/users/${userId}/status`, { status, reason });
  },

  // === LEGACY SUPPORT (backwards compatibility) ===
  // Keep old method names for existing code
  approveInstitution: async (requestId: number) => {
    return adminApi.approveInstitutionVerification(requestId);
  },

  rejectInstitution: async (requestId: number, reason: string) => {
    return adminApi.rejectInstitutionVerification(requestId, reason);
  },

  getCampaigns: async () => {
    return adminApi.getPendingCampaigns();
  },

  // === ADMIN USER MANAGEMENT ===
  // Create new admin user (admin-only)
  createAdminUser: async (data: {
    email: string;
    password: string;
    full_name: string;
  }) => {
    return apiPost('/api/admin/create-admin', data);
  },
};

// Campaign API endpoints
export const campaignApi = {
  // Create campaign
  create: async (data: any) => {
    return apiPost('/api/campaigns', data);
  },

  // Get campaigns
  getAll: async (params?: { status?: string }) => {
    const query = params?.status ? `?status=${params.status}` : '';
    return apiGet(`/api/campaigns${query}`);
  },

  // Get single campaign
  get: async (id: number) => {
    return apiGet(`/api/campaigns/${id}`);
  },

  // Admin approve campaign
  approve: async (id: number) => {
    return apiPost(`/api/admin/campaigns/${id}/approve`, {});
  },

  // Admin reject campaign
  reject: async (id: number, reason: string) => {
    return apiPost(`/api/admin/campaigns/${id}/reject`, { reason });
  },
};

// Auth API endpoints
export const authApi = {
  login: async (email: string, password: string) => {
    return apiPost('/api/login', { email, password });
  },

  logout: async () => {
    return apiPost('/api/logout', {});
  },

  register: async (data: any) => {
    return apiPost('/api/signup', data);
  },

  getProfile: async () => {
    return apiGet('/api/me');
  },
};

export default { 
  apiGet, 
  apiPost, 
  apiPostForm,
  institutionApi,
  verificationApi,
  adminApi,
  campaignApi,
  authApi,
};
