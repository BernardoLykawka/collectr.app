import { BookOpen, RectangleVertical, Film, Footprints, Gamepad2, LucideIcon, Package, Puzzle, Palette, Stamp, Coins, Shirt } from "lucide-react";

export enum CollectionType {
    COINS = "COINS",
    STAMPS = "STAMPS",
    CARDS = "CARDS",
    GAMES = "GAMES",
    SHIRTS = "SHIRTS",
    TOYS = "TOYS",
    BOOKS = "BOOKS",
    ARTWORKS = "ARTWORKS",
    SNEAKERS = "SNEAKERS",
    FILMS = "FILMS",
    OTHERS = "OTHERS"
}

export const typeIcons: Partial<Record<CollectionType, LucideIcon>> = {
    [CollectionType.COINS]: Coins, 
    [CollectionType.STAMPS]: Stamp,
    [CollectionType.CARDS]: RectangleVertical,
    [CollectionType.GAMES]: Gamepad2,
    [CollectionType.SHIRTS]: Shirt,
    [CollectionType.TOYS]: Puzzle,
    [CollectionType.BOOKS]: BookOpen,
    [CollectionType.ARTWORKS]: Palette, 
    [CollectionType.SNEAKERS]: Footprints,
    [CollectionType.FILMS]: Film,
    [CollectionType.OTHERS]: Package,
};

export interface CollectionTypeOption {
    value: CollectionType;
    label: string;
    icon?: LucideIcon;
}

export const collectionTypeOptions: CollectionTypeOption[] = [
    { value: CollectionType.COINS, label: "Coins", icon: typeIcons[CollectionType.COINS] },
    { value: CollectionType.STAMPS, label: "Stamps", icon: typeIcons[CollectionType.STAMPS] },
    { value: CollectionType.CARDS, label: "Cards", icon: typeIcons[CollectionType.CARDS] },
    { value: CollectionType.GAMES, label: "Games", icon: typeIcons[CollectionType.GAMES] },
    { value: CollectionType.SHIRTS, label: "Shirts", icon: typeIcons[CollectionType.SHIRTS] },
    { value: CollectionType.TOYS, label: "Toys", icon: typeIcons[CollectionType.TOYS] },
    { value: CollectionType.BOOKS, label: "Books", icon: typeIcons[CollectionType.BOOKS] },
    { value: CollectionType.ARTWORKS, label: "Artworks", icon: typeIcons[CollectionType.ARTWORKS] },
    { value: CollectionType.SNEAKERS, label: "Sneakers", icon: typeIcons[CollectionType.SNEAKERS] },
    { value: CollectionType.FILMS, label: "Films", icon: typeIcons[CollectionType.FILMS] },
    { value: CollectionType.OTHERS, label: "Others", icon: typeIcons[CollectionType.OTHERS] },
];

export const typeColors: Partial<Record<CollectionType, string>> = {
    [CollectionType.COINS]: "#F59E0B",
    [CollectionType.STAMPS]: "#8B5CF6",
    [CollectionType.CARDS]: "#EF4444",
    [CollectionType.GAMES]: "#10B981",
    [CollectionType.SHIRTS]: "#3B82F6",
    [CollectionType.TOYS]: "#EC4899",
    [CollectionType.BOOKS]: "#92400E",
    [CollectionType.ARTWORKS]: "#A855F7",
    [CollectionType.SNEAKERS]: "#F97316", 
    [CollectionType.FILMS]: "#6366F1",
    [CollectionType.OTHERS]: "#6B7280",
};