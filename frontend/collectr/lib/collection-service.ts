import { apiFetch } from "./api";
import type { CollectionProps } from "@/components/collection/collectionCard/collectionInterface";

export type Collection = CollectionProps["collection"];

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export const collectionService = {
  async getCollections(page: number = 0, size: number = 6): Promise<PaginatedResponse<Collection>> {
    const response = await apiFetch<PaginatedResponse<Collection>>(`/collections?page=${page}&size=${size}`);
    return response;
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

  async getUserCollections(page: number = 0, size: number = 6): Promise<PaginatedResponse<Collection>> {
    const response = await apiFetch<PaginatedResponse<Collection>>(`/collections/my?page=${page}&size=${size}`);
    return response;
  },

  async getLastEditedCollection(): Promise<Collection> {
    const response = await apiFetch<Collection>("/collections/my/last-edited");
    return response;
  },
};
