import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import type { Item } from "@/lib/item-service";
import { itemService } from "@/lib/item-service";
import { collectionService } from "@/lib/collection-service";
import { ItemCondition, ItemSituation } from "@/types/item";
import { useAuth } from "@/contexts/auth-context";

interface FormData {
  name: string;
  description: string;
  imageUrl: string;
  manufacturer: string;
  releaseYear: string;
  estimatedValue: string;
  purchasePrice: string;
  condition: string;
  situation: ItemSituation;
}

export function useItemDetail(itemId: string) {
  const router = useRouter();
  const { user } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    imageUrl: "",
    manufacturer: "",
    releaseYear: "",
    estimatedValue: "",
    purchasePrice: "",
    condition: "",
    situation: ItemSituation.OWNED,
  });

  useEffect(() => {
    const fetchItem = async () => {
      if (!itemId) return;

      try {
        setLoading(true);
        setError(null);
        const data = await itemService.getItemById(itemId);
        setItem(data);
        
        const collection = await collectionService.getCollectionById(data.collectionId);
        const isOwner = user?.id === collection.userId;
        setCanEdit(isOwner);
        
        setFormData({
          name: data.name,
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          manufacturer: data.manufacturer || "",
          releaseYear: data.releaseYear?.toString() || "",
          estimatedValue: data.estimatedValue?.toString() || "",
          purchasePrice: data.purchasePrice?.toString() || "",
          condition: data.condition || "",
          situation: data.situation,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load item";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId, user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectCondition = (condition: ItemCondition) => {
    setFormData((prev) => ({ ...prev, condition }));
  };

  const selectSituation = (situation: ItemSituation) => {
    setFormData((prev) => ({ ...prev, situation }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!item) return;

    setSaving(true);
    setError(null);

    try {
      await itemService.updateItem(item.id, {
        name: formData.name,
        description: formData.description || undefined,
        imageUrl: formData.imageUrl || undefined,
        manufacturer: formData.manufacturer || undefined,
        releaseYear: formData.releaseYear ? Number(formData.releaseYear) : undefined,
        estimatedValue: formData.estimatedValue ? Number(formData.estimatedValue) : undefined,
        purchasePrice: formData.purchasePrice ? Number(formData.purchasePrice) : undefined,
        condition: formData.condition ? (formData.condition as ItemCondition) : undefined,
        situation: formData.situation,
      });

      router.push(`/collection/${item.collectionId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update item";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!item) return;

    setSaving(true);
    try {
      await itemService.deleteItem(item.id);
      router.push(`/collection/${item.collectionId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete item";
      setError(errorMessage);
      setSaving(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleBack = () => {
    if (item) {
      router.push(`/collection/${item.collectionId}`);
    } else {
      router.back();
    }
  };

  return {
    item,
    loading,
    saving,
    error,
    formData,
    showDeleteConfirm,
    canEdit,
    setShowDeleteConfirm,
    handleChange,
    selectCondition,
    selectSituation,
    handleSubmit,
    handleDelete,
    handleBack,
  };
}
