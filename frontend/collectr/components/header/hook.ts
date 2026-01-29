import { useModal } from "@/contexts/modal-context";
import { useCallback, useEffect, useState } from "react";

type ThemeMode = "light" | "dark";

export function useHeader() {
	const { isModalOpen, openModal, closeModal } = useModal();
	const [theme, setTheme] = useState<ThemeMode>("light");

	useEffect(() => {
		const stored = window.localStorage.getItem("theme") as ThemeMode | null;
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		const initial: ThemeMode = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
		setTheme(initial);
		document.documentElement.classList.toggle("dark", initial === "dark");
	}, []);

	const toggleTheme = useCallback(() => {
		setTheme((current) => {
			const next: ThemeMode = current === "dark" ? "light" : "dark";
			window.localStorage.setItem("theme", next);
			document.documentElement.classList.toggle("dark", next === "dark");
			return next;
		});
	}, []);

	return {
		isModalOpen,
		openModal,
		closeModal,
		theme,
		toggleTheme,
	};
}
