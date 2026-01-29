import { CollectionType, typeIcons } from "@/types/CollectionType";
import {
	LucideIcon,
	Lock,
	Tag,
	Unlock,
} from "lucide-react";
import { CollectionProps } from "./collectionInterface";

function formatDate(value?: Date | string | number) {
	if (!value) return "Recently updated";
	const date = value instanceof Date ? value : new Date(value);
	if (Number.isNaN(date.getTime())) return "Recently updated";
	return date.toLocaleDateString(undefined, {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

function toTitle(value?: string) {
	if (!value) return "Unknown";
	return value
		.replace(/[_-]+/g, " ")
		.toLowerCase()
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function getInitials(name?: string, fallback?: string) {
	const source = name?.trim() || fallback?.trim();
	return source ? source.slice(0, 2).toUpperCase() : "?";
}


function getTypeIcon(type: CollectionType): LucideIcon {
	return typeIcons[type] ?? Tag;
}

function getVisibilityIcon(isPublic: boolean): LucideIcon {
  return isPublic ? Unlock : Lock;
}

export function useCollectionCard(collection: CollectionProps["collection"]) {
	const lastEditedText = formatDate(collection.updatedAt ?? collection.createdAt);
	const visibilityLabel = collection.isPublic ? "Public" : "Private";
	const VisibilityIcon = getVisibilityIcon(collection.isPublic);
	const typeLabel = toTitle(String(collection.collectionType));
	const TypeIcon = getTypeIcon(collection.collectionType);
	const initials = getInitials(collection.name, collection.user.nickname);
	const description = collection.description?.trim() || "No description provided yet.";

	return {
		lastEditedText,
		visibilityLabel,
		VisibilityIcon,
		typeLabel,
		TypeIcon,
		initials,
		description,
	};
}
