import { CollectionType, typeIcons, typeColors } from "@/types/CollectionType";
import {
	LucideIcon,
	Lock,
	Tag,
	Unlock,
} from "lucide-react";
import { CollectionProps } from "./collectionInterface";
import { formatDate, toTitle } from "@/lib/utils";


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
	const typeColor = typeColors[collection.collectionType] ?? "#6B7280";
	const description = collection.description?.trim() || "No description provided yet.";

	return {
		lastEditedText,
		visibilityLabel,
		VisibilityIcon,
		typeLabel,
		TypeIcon,
		typeColor,
		description,
	};
}
