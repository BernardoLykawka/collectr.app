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