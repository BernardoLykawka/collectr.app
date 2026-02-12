import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(value?: Date | string | number) {
    if (!value) return "Recently updated";
    
    let dateValue = value;
    if (typeof value === 'string' && !value.endsWith('Z') && !value.includes('+')) {
        dateValue = value + 'Z';
    }
    
    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
    
    const now = new Date();
    
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    const isToday = date.getDate() === now.getDate() &&
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear();
    
    if ((diffHours < 24 || isToday) && diffMs >= 0) {
        if (diffMinutes < 1) return "Just now";
        if (diffMinutes === 1) return "1 minute ago";
        if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
        if (diffHours === 1) return "1 hour ago";
        return `${diffHours} hours ago`;
    }
    
    return date.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export function toTitle(value?: string) {
	if (!value) return "Unknown";
	return value
		.replace(/[_-]+/g, " ")
		.toLowerCase()
		.replace(/\b\w/g, (char) => char.toUpperCase());
}
