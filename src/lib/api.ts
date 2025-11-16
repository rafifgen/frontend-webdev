import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const API_PREFIX = "/api/v1";

export const API_ENDPOINTS = {
	// Auth endpoints
	AUTH: {
		LOGIN: `${API_BASE_URL}${API_PREFIX}/auth/email/login`,
		REGISTER: `${API_BASE_URL}${API_PREFIX}/auth/email/register`,
		REFRESH: `${API_BASE_URL}${API_PREFIX}/auth/refresh`,
		LOGOUT: `${API_BASE_URL}${API_PREFIX}/auth/logout`,
		ME: `${API_BASE_URL}${API_PREFIX}/auth/me`,
		FORGOT_PASSWORD: `${API_BASE_URL}${API_PREFIX}/auth/forgot/password`,
		RESET_PASSWORD: `${API_BASE_URL}${API_PREFIX}/auth/reset/password`,
		CONFIRM_EMAIL: `${API_BASE_URL}${API_PREFIX}/auth/email/confirm`,
	},

	// User endpoints
	USERS: {
		PROFILE: `${API_BASE_URL}${API_PREFIX}/auth/me`,
		UPDATE_PROFILE: `${API_BASE_URL}${API_PREFIX}/auth/me`,
		LIST: `${API_BASE_URL}${API_PREFIX}/users`,
	},

	// Testimonials endpoints
	TESTIMONIALS: {
		LIST: `${API_BASE_URL}${API_PREFIX}/testimonials`,
		ACTIVE: `${API_BASE_URL}${API_PREFIX}/testimonials/active`,
		CREATE: `${API_BASE_URL}${API_PREFIX}/testimonials`,
		UPDATE: (id: number) => `${API_BASE_URL}${API_PREFIX}/testimonials/${id}`,
		DELETE: (id: number) => `${API_BASE_URL}${API_PREFIX}/testimonials/${id}`,
		GET_ONE: (id: number) => `${API_BASE_URL}${API_PREFIX}/testimonials/${id}`,
	},

	// Files endpoints
	FILES: `${API_BASE_URL}${API_PREFIX}/files`,
};

export interface ApiResponse<T = any> {
	data?: T;
	message?: string;
	errors?: Record<string, string | string[]>;
	statusCode?: number;
}

export interface PaginationResponse<T> {
	data: T[];
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	token: string;
	refreshToken: string;
	tokenExpires: number;
	user: {
		id: string;
		email: string;
		firstName: string;
		lastName: string;
		role: {
			id: number;
			name: string;
		};
		createdAt: string;
		updatedAt: string;
	};
}

export interface RegisterRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
}

export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: {
		id: number;
		name: string;
	};
	createdAt: string;
	updatedAt: string;
}

export interface Testimonial {
	id: number;
	name: string;
	position: string;
	content: string;
	avatar?: string | null;
	rating: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface CreateTestimonialRequest {
	name: string;
	position: string;
	content: string;
	avatar?: string | null;
	rating: number;
	isActive?: boolean;
}

export interface UpdateTestimonialRequest {
	name?: string;
	position?: string;
	content?: string;
	avatar?: string | null;
	rating?: number;
	isActive?: boolean;
}

class ApiClient {
	private axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create({
			baseURL: API_BASE_URL,
			timeout: 10000,
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Request interceptor to add auth token
		this.axiosInstance.interceptors.request.use(
			(config) => {
				const token = this.getAuthToken();
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			},
		);

		// Response interceptor to handle token refresh
		this.axiosInstance.interceptors.response.use(
			(response) => response,
			async (error: AxiosError) => {
				const originalRequest = error.config as any;

				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;

					try {
						const refreshToken = this.getRefreshToken();
						if (refreshToken) {
							const response = await this.refreshToken();
							const newToken = response.data?.token;
							if (newToken) {
								this.setAuthToken(newToken);
								originalRequest.headers.Authorization = `Bearer ${newToken}`;
								return this.axiosInstance(originalRequest);
							}
						}
					} catch (refreshError) {
						this.logout();
						if (typeof window !== "undefined") {
							window.location.href = "/login?expired=true";
						}
					}
				}

				return Promise.reject(error);
			},
		);
	}

	private getAuthToken(): string | null {
		if (typeof window !== "undefined") {
			return localStorage.getItem("token") || Cookies.get("token") || null;
		}
		return null;
	}

	private setAuthToken(token: string): void {
		if (typeof window !== "undefined") {
			localStorage.setItem("token", token);
			Cookies.set("token", token, { expires: 7 });
		}
	}

	private getRefreshToken(): string | null {
		if (typeof window !== "undefined") {
			return (
				localStorage.getItem("refreshToken") ||
				Cookies.get("refreshToken") ||
				null
			);
		}
		return null;
	}

	private setRefreshToken(token: string): void {
		if (typeof window !== "undefined") {
			localStorage.setItem("refreshToken", token);
			Cookies.set("refreshToken", token, { expires: 30 });
		}
	}

	private async refreshToken(): Promise<
		ApiResponse<{ token: string; refreshToken: string }>
	> {
		const refreshToken = this.getRefreshToken();
		if (!refreshToken) {
			throw new Error("No refresh token available");
		}

		const response = await axios.post(
			API_ENDPOINTS.AUTH.REFRESH,
			{},
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`,
				},
			},
		);

		return response.data;
	}

	// Auth methods
	async login(credentials: LoginRequest): Promise<LoginResponse> {
		const response: AxiosResponse<ApiResponse<LoginResponse>> =
			await this.axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, credentials);

		if (response.data.data) {
			const { token, refreshToken, user } = response.data.data;
			this.setAuthToken(token);
			this.setRefreshToken(refreshToken);

			if (typeof window !== "undefined") {
				localStorage.setItem("user", JSON.stringify(user));
			}
		}

		return response.data.data!;
	}

	async register(userData: RegisterRequest): Promise<void> {
		await this.axiosInstance.post(API_ENDPOINTS.AUTH.REGISTER, userData);
	}

	async logout(): Promise<void> {
		try {
			await this.axiosInstance.post(API_ENDPOINTS.AUTH.LOGOUT);
		} catch (error) {
			console.error("Logout API call failed:", error);
		} finally {
			if (typeof window !== "undefined") {
				localStorage.removeItem("token");
				localStorage.removeItem("refreshToken");
				localStorage.removeItem("user");
				Cookies.remove("token");
				Cookies.remove("refreshToken");
			}
		}
	}

	async getProfile(): Promise<User> {
		const response: AxiosResponse<ApiResponse<User>> =
			await this.axiosInstance.get(API_ENDPOINTS.AUTH.ME);
		return response.data.data!;
	}

	async updateProfile(data: Partial<User>): Promise<User> {
		const response: AxiosResponse<ApiResponse<User>> =
			await this.axiosInstance.patch(API_ENDPOINTS.AUTH.ME, data);
		return response.data.data!;
	}

	async forgotPassword(email: string): Promise<void> {
		await this.axiosInstance.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
			email,
		});
	}

	async resetPassword(hash: string, password: string): Promise<void> {
		await this.axiosInstance.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
			hash,
			password,
		});
	}

	// Testimonials methods
	async getTestimonials(
		page: number = 1,
		limit: number = 10,
	): Promise<PaginationResponse<Testimonial>> {
		const response: AxiosResponse<PaginationResponse<Testimonial>> =
			await this.axiosInstance.get(API_ENDPOINTS.TESTIMONIALS.LIST, {
				params: { page, limit },
			});
		return response.data;
	}

	async getActiveTestimonials(): Promise<Testimonial[]> {
		const response: AxiosResponse<ApiResponse<Testimonial[]>> =
			await this.axiosInstance.get(API_ENDPOINTS.TESTIMONIALS.ACTIVE);
		return response.data.data || [];
	}

	async getTestimonial(id: number): Promise<Testimonial> {
		const response: AxiosResponse<ApiResponse<Testimonial>> =
			await this.axiosInstance.get(API_ENDPOINTS.TESTIMONIALS.GET_ONE(id));
		return response.data.data!;
	}

	async createTestimonial(
		data: CreateTestimonialRequest,
	): Promise<Testimonial> {
		const response: AxiosResponse<ApiResponse<Testimonial>> =
			await this.axiosInstance.post(API_ENDPOINTS.TESTIMONIALS.CREATE, data);
		return response.data.data!;
	}

	async updateTestimonial(
		id: number,
		data: UpdateTestimonialRequest,
	): Promise<Testimonial> {
		const response: AxiosResponse<ApiResponse<Testimonial>> =
			await this.axiosInstance.patch(
				API_ENDPOINTS.TESTIMONIALS.UPDATE(id),
				data,
			);
		return response.data.data!;
	}

	async deleteTestimonial(id: number): Promise<void> {
		await this.axiosInstance.delete(API_ENDPOINTS.TESTIMONIALS.DELETE(id));
	}

	// Utility methods
	isAuthenticated(): boolean {
		if (typeof window === "undefined") return false;

		const token = this.getAuthToken();
		if (!token) return false;

		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			const now = Date.now() / 1000;
			return payload.exp > now;
		} catch (error) {
			console.error("Token validation error:", error);
			return false;
		}
	}

	getStoredUser(): User | null {
		if (typeof window !== "undefined") {
			const user = localStorage.getItem("user");
			return user ? JSON.parse(user) : null;
		}
		return null;
	}
}

// Create a singleton instance
export const apiClient = new ApiClient();

// Error handling utilities
export const handleApiError = (error: any): string => {
	if (error?.response?.data?.errors) {
		const errors = error.response.data.errors;
		const firstError = Object.values(errors)[0];
		if (Array.isArray(firstError)) {
			return firstError[0] as string;
		}
		return firstError as string;
	}

	if (error?.response?.data?.message) {
		return error.response.data.message;
	}

	if (error?.message) {
		return error.message;
	}

	if (typeof error === "string") {
		return error;
	}

	return "An unexpected error occurred. Please try again.";
};

export default apiClient;
