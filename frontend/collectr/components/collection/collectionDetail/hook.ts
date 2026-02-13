import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ui/toast";
import { collectionService } from "@/lib/collection-service";
import type { CollectionDTO, UpdateCollectionRequest } from "@/types/collection";

interface UseCollectionDetailFormProps {
  collection: CollectionDTO;
  onUpdate?: (collection: CollectionDTO) => void;
  onDelete?: () => void;
}

export function useCollectionDetailForm({ collection, onUpdate, onDelete }: UseCollectionDetailFormProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    name: collection.name,
    description: collection.description || "",
    isPublic: collection.isPublic,
    collectionType: collection.collectionType,
    status: collection.status ?? 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      showToast("Collection name is required", "error");
      return;
    }

    setIsSaving(true);
    try {
      const updateData: UpdateCollectionRequest = {
        name: formData.name,
        description: formData.description || undefined,
        isPublic: formData.isPublic,
        collectionType: formData.collectionType,
        status: formData.status,
      };

      const updated = await collectionService.updateCollection(collection.id.toString(), updateData);
      showToast("Collection updated successfully!", "success");
      setIsEditing(false);
      onUpdate?.(updated);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update collection";
      showToast(errorMessage, "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: collection.name,
      description: collection.description || "",
      isPublic: collection.isPublic,
      collectionType: collection.collectionType,
      status: collection.status ?? 0,
    });
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await collectionService.deleteCollection(collection.id.toString());
      showToast("Collection deleted successfully!", "success");
      setShowDeleteModal(false);
      
      if (onDelete) {
        onDelete();
      } else {
        router.push("/");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to delete collection";
      showToast(errorMessage, "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isEditing,
    isSaving,
    isDeleting,
    showDeleteModal,
    formData,
    handleChange,
    handleSubmit,
    handleCancel,
    handleEdit,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
  };
}
