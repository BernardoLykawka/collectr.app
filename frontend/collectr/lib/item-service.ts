import { apiFetch } from "./api";
import type { PaginatedResponse } from "./collection-service";
import type {
  ItemDTO,
  CreateItemRequest,
  UpdateItemRequest,
} from "@/types/item";

export type Item = ItemDTO;

export const itemService = {
  async getItemsByCollectionId(
    collectionId: string,
    page: number = 0,
    size: number = 6,
    name?: string
  ): Promise<PaginatedResponse<Item>> {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (name) {
      params.append('name', name);
    }
    const response = await apiFetch<PaginatedResponse<Item>>(
      `/items/collection/${collectionId}?${params.toString()}`
    );
    return response;
  },

  async getItemById(id: string): Promise<Item> {
    const response = await apiFetch<Item>(`/items/${id}`);
    return response;
  },

  async createItem(data: CreateItemRequest): Promise<Item> {
    const response = await apiFetch<Item>("/items", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response;
  },

  async updateItem(id: string, data: UpdateItemRequest): Promise<Item> {
    const response = await apiFetch<Item>(`/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return response;
  },

  async deleteItem(id: string): Promise<void> {
    await apiFetch(`/items/${id}`, {
      method: "DELETE",
    });
  },
};
