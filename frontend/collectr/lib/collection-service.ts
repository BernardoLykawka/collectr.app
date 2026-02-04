import { apiFetch } from "./api";
import type { CollectionProps } from "@/components/collection/collectionCard/collectionInterface";

export type Collection = CollectionProps["collection"];

export const collectionService = {
  async getCollections(): Promise<Collection[]> {
    const response = await apiFetch<Collection[]>("/collections");
    return response || [];
  },

  async getCollectionById(id: string): Promise<Collection> {
    const response = await apiFetch<Collection>(`/collections/${id}`);
    return response;
  },

  async createCollection(data: {
    name: string;
    description?: string;
    collectionType: string;
    isPublic: boolean;
  }): Promise<Collection> {
    const response = await apiFetch<Collection>("/collections", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  },

  async updateCollection(
    id: string,
    data: {
      name?: string;
      description?: string;
      collectionType?: string;
      isPublic?: boolean;
    }
  ): Promise<Collection> {
    const response = await apiFetch<Collection>(`/collections/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return response;
  },

  async deleteCollection(id: string): Promise<void> {
    await apiFetch(`/collections/${id}`, {
      method: "DELETE",
    });
  },

  async getUserCollections(): Promise<Collection[]> {
    const response = await apiFetch<Collection[]>("/collections/my");
    return response || [];
  },
};
