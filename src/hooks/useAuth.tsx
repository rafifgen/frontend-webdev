"use client";

import {
	useState,
	useEffect,
	useCallback,
	createContext,
	useContext,
	ReactNode,
} from "react";
import {
	apiClient,
	User,
	LoginRequest,
	RegisterRequest,
	handleApiError,
} from "../lib/api";
import toast from "react-hot-toast";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	login: (credentials: LoginRequest) => Promise<boolean>;
	register: (userData: RegisterRequest) => Promise<boolean>;
	logout: () => void;
	updateProfile: (data: Partial<User>) => Promise<boolean>;
	refreshProfile: () => Promise<void>;
	forgotPassword: (email: string) => Promise<boolean>;
	resetPassword: (hash: string, password: string) => Promise<boolean>;
	hasRole: (roleName: string) => boolean;
	isAdmin: () => boolean;
	isUser: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const revalidate = useCallback(async () => {
		try {
			if (apiClient.isAuthenticated()) {
				const currentUser = await apiClient.getProfile();
				setUser(currentUser);
				setIsAuthenticated(true);
			} else {
				setUser(null);
				setIsAuthenticated(false);
			}
		} catch (error) {
			setUser(null);
			setIsAuthenticated(false);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		revalidate();
	}, [revalidate]);

	const login = useCallback(
		async (credentials: LoginRequest): Promise<boolean> => {
			try {
				setIsLoading(true);
				const loginResponse = await apiClient.login(credentials);
				setUser(loginResponse.user);
				setIsAuthenticated(true);
				toast.success("Login successful!");
				return true;
			} catch (error) {
				const errorMessage = handleApiError(error);
				toast.error(errorMessage);
				setIsAuthenticated(false);
				return false;
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const register = useCallback(
		async (userData: RegisterRequest): Promise<boolean> => {
			try {
				setIsLoading(true);
				await apiClient.register(userData);
				toast.success(
					"Registration successful! Please check your email to verify your account.",
				);
				return true;
			} catch (error) {
				const errorMessage = handleApiError(error);
				toast.error(errorMessage);
				return false;
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const logout = useCallback(async () => {
		await apiClient.logout();
		setUser(null);
		setIsAuthenticated(false);
		toast.success("Logged out successfully");
	}, []);

	const updateProfile = useCallback(
		async (data: Partial<User>): Promise<boolean> => {
			try {
				setIsLoading(true);
				const updatedUser = await apiClient.updateProfile(data);
				setUser(updatedUser);
				toast.success("Profile updated successfully!");
				return true;
			} catch (error) {
				const errorMessage = handleApiError(error);
				toast.error(errorMessage);
				return false;
			} finally {
				setIsLoading(false);
			}
		},
		[],
	);

	const refreshProfile = useCallback(async (): Promise<void> => {
		await revalidate();
	}, [revalidate]);

	const forgotPassword = useCallback(
		async (email: string): Promise<boolean> => {
			try {
				await apiClient.forgotPassword(email);
				toast.success("Password reset email sent! Please check your inbox.");
				return true;
			} catch (error) {
				const errorMessage = handleApiError(error);
				toast.error(errorMessage);
				return false;
			}
		},
		[],
	);

	const resetPassword = useCallback(
		async (hash: string, password: string): Promise<boolean> => {
			try {
				await apiClient.resetPassword(hash, password);
				toast.success(
					"Password reset successful! You can now login with your new password.",
				);
				return true;
			} catch (error) {
				const errorMessage = handleApiError(error);
				toast.error(errorMessage);
				return false;
			}
		},
		[],
	);

	const hasRole = useCallback(
		(roleName: string): boolean => {
			return user?.role?.name === roleName;
		},
		[user],
	);

	const isAdmin = useCallback((): boolean => {
		return hasRole("admin");
	}, [hasRole]);

	const isUser = useCallback((): boolean => {
		return hasRole("user");
	}, [hasRole]);

	const value = {
		user,
		isLoading,
		isAuthenticated,
		login,
		register,
		logout,
		updateProfile,
		refreshProfile,
		forgotPassword,
		resetPassword,
		hasRole,
		isAdmin,
		isUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
