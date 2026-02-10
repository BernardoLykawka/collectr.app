import { CollectionType } from "./CollectionType";

export interface CollectionDTO {
  id: number;
  userId: number;
  userNickname: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  status: number | null;
  collectionType: CollectionType;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export interface CreateCollectionRequest {
  name: string;
  description?: string;
  isPublic: boolean;
  status?: number;
  collectionType: CollectionType;
}

export interface UpdateCollectionRequest {
  name: string;
  description?: string;
  isPublic: boolean;
  status?: number;
  collectionType: CollectionType;
}
