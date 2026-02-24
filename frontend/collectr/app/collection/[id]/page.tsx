"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CollectionDetailForm } from "@/components/collection/collectionDetail/collectionDetailForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircularProgress } from "@/components/ui/circular-progress";
import { collectionService } from "@/lib/collection-service";
import type { CollectionDTO } from "@/types/collection";
import { useAuth } from "@/contexts/auth-context";
import ItemDetails from "@/components/items/itemCard/ItemsList";

export default function CollectionPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [collection, setCollection] = useState<CollectionDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  

  useEffect(() => {
    const fetchCollection = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await collectionService.getCollectionById(id);
        setCollection(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load collection";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  const handleUpdate = (updated: CollectionDTO) => {
    setCollection(updated);
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6 flex justify-center items-center min-h-100">
        <CircularProgress value={0} />
      </div>
    );
  }

  if(!isAuthenticated) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p>You need to be logged in to view this collection.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p>Collection not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <CollectionDetailForm collection={collection} onUpdate={handleUpdate} />

      <ItemDetails collectionId={id} />
      
    </div>
  );
}
