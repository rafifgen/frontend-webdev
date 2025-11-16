"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as "light" | "dark";
		const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
			.matches
			? "dark"
			: "light";
		const initialTheme = savedTheme || systemPreference;
		setTheme(initialTheme);
		if (initialTheme === "dark") {
			document.documentElement.classList.add("dark");
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
			aria-label="Toggle theme"
		>
			{theme === "light" ? (
				<Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
			) : (
				<Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
			)}
		</button>
	);
}
