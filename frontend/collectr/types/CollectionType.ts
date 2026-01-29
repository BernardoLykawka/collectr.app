import { BookOpen, RectangleVertical, Film, Footprints, Gamepad2, LucideIcon, Package, Puzzle, Sticker, Palette, Stamp, Coins } from "lucide-react";

export enum CollectionType {
    COINS = "Coins",
    STAMPS = "Stamps",
    CARDS = "Cards",
    GAMES = "Games",
    FIGURINES = "Figurines",
    TOYS = "Toys",
    BOOKS = "Books",
    ARTWORKS = "Artworks",
    SNEAKERS = "Sneakers",
    FILMS = "Films",
    OTHERS = "Others"
}

export const typeIcons: Partial<Record<CollectionType, LucideIcon>> = {
    [CollectionType.COINS]: Coins,
    [CollectionType.STAMPS]: Stamp,
    [CollectionType.CARDS]: RectangleVertical,
    [CollectionType.GAMES]: Gamepad2,
    [CollectionType.FIGURINES]: Sticker,
    [CollectionType.TOYS]: Puzzle,
    [CollectionType.BOOKS]: BookOpen,
    [CollectionType.ARTWORKS]: Palette, 
    [CollectionType.SNEAKERS]: Footprints,
    [CollectionType.FILMS]: Film,
    [CollectionType.OTHERS]: Package,
};