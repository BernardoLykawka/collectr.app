import { BookOpen, RectangleVertical, Film, Footprints, Gamepad2, LucideIcon, Package, Puzzle, Palette, Stamp, Coins, Shirt } from "lucide-react";

export enum CollectionType {
    COINS = "Coins",
    STAMPS = "Stamps",
    CARDS = "Cards",
    GAMES = "Games",
    SHIRTS = "Shirts",
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
    [CollectionType.SHIRTS]: Shirt,
    [CollectionType.TOYS]: Puzzle,
    [CollectionType.BOOKS]: BookOpen,
    [CollectionType.ARTWORKS]: Palette, 
    [CollectionType.SNEAKERS]: Footprints,
    [CollectionType.FILMS]: Film,
    [CollectionType.OTHERS]: Package,
};