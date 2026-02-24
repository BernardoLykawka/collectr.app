export enum ItemCondition {
  MINT = "MINT",
  NEAR_MINT = "NEAR_MINT",
  VERY_GOOD = "VERY_GOOD",
  GOOD = "GOOD",
  ACCEPTABLE = "ACCEPTABLE",
  POOR = "POOR",
  DAMAGED = "DAMAGED",
}

export enum ItemSituation {
  OWNED = "OWNED",
  WISHLIST = "WISHLIST",
  FOR_SALE = "FOR_SALE",
  SOLD = "SOLD",
}

export interface ItemDTO {
  id: string;
  collectionId: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  manufacturer: string | null;
  releaseYear: number | null;
  estimatedValue: number | null;
  purchasePrice: number | null;
  condition: ItemCondition | null;
  situation: ItemSituation;
  active: boolean;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
  imageUrl?: string;
  manufacturer?: string;
  releaseYear?: number;
  estimatedValue?: number;
  purchasePrice?: number;
  condition?: ItemCondition;
  situation: ItemSituation;
  collectionId: string;
}

export interface UpdateItemRequest {
  name: string;
  description?: string;
  imageUrl?: string;
  manufacturer?: string;
  releaseYear?: number;
  estimatedValue?: number;
  purchasePrice?: number;
  condition?: ItemCondition;
  situation: ItemSituation;
}

export type Item = ItemDTO;
