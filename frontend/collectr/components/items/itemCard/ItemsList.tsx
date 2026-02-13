"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Package } from "lucide-react";
import { itemService, type Item } from "@/lib/item-service";
import { NewItemModal } from "../newItem/newItemModal";
import { ItemCard } from "./ItemCard";

interface ItemsListProps {
  collectionId: string;
}

export default function ItemsList({ collectionId }: ItemsListProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await itemService.getItemsByCollectionId(collectionId, page, 6);
      setItems(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Error loading items:", err);
      setError("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [collectionId, page]);

  const handleItemAdded = () => {
    if (page === 0) {
      loadItems();
    } else {
      setPage(0);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center text-destructive">
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Collection Items</CardTitle>
          <Button variant="default" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No items yet</p>
              <p className="text-sm mt-2">Add your first item to this collection</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} onUpdate={loadItems} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page + 1} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page === totalPages - 1}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <NewItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collectionId={collectionId}
        onSuccess={handleItemAdded}
      />
    </>
  );
}