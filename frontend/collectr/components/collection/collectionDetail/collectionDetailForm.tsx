"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { CollectionType, collectionTypeOptions, typeIcons, typeColors } from "@/types/CollectionType";
import type { CollectionDTO } from "@/types/collection";
import { useCollectionDetailForm } from "./hook";
import { DeleteConfirmModal } from "./deleteConfirmModal";
import { Trash2 } from "lucide-react";

interface CollectionDetailFormProps {
  collection: CollectionDTO;
  onUpdate?: (collection: CollectionDTO) => void;
  onDelete?: () => void;
}

export function CollectionDetailForm({ collection, onUpdate, onDelete }: CollectionDetailFormProps) {
  const {
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
  } = useCollectionDetailForm({ collection, onUpdate, onDelete });

  const TypeIcon = typeIcons[collection.collectionType];
  const typeColor = typeColors[collection.collectionType] ?? "#6B7280";
  const { user } = useAuth();
  const isOwner = user?.id === collection.userId;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium" style={{ backgroundColor: `${typeColor}20`, color: typeColor }}>
            {TypeIcon && <TypeIcon className="h-6 w-6" />}
          </span>
          <CardTitle className="text-xl">{collection.name}</CardTitle>
        </div>

        {!isEditing && isOwner && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="destructive" onClick={handleDeleteClick}>
              <Trash2 className="h-3.5 w-3.5"/>
            </Button>
          </div>
        )}
        
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="name">Name *</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                disabled={isSaving}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={isSaving}
                className="w-full min-h-25 px-3 py-2 border rounded-md resize-y"
                placeholder="Describe your collection..."
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="collectionType">Type</FieldLabel>
              <select
                id="collectionType"
                name="collectionType"
                value={formData.collectionType}
                onChange={handleChange}
                disabled={isSaving}
                className="w-full px-3 py-2 border rounded-md"
              >
                {Object.values(CollectionType).map((type) => (
                  <option key={type} value={type}>
                    {collectionTypeOptions.find(option => option.value === type)?.label || type}
                  </option>
                ))}
              </select>
            </Field>

            <Field>
              <div className="flex items-center gap-2">
                <input
                  id="isPublic"
                  name="isPublic"
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={handleChange}
                  disabled={isSaving}
                  className="h-4 w-4"
                />
                <FieldLabel htmlFor="isPublic" className="cursor-pointer">
                  Make this collection public
                </FieldLabel>
              </div>
            </Field>

            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {collection.description && (
              <div>
                <p className="text-base whitespace-pre-wrap text-muted-foreground">{collection.description}</p>
              </div>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <span>{collection.isPublic ? "Public" : "Private"}</span>
              <span>•</span>
              <span>{collection.userNickname}</span>
            </div>
          </div>
        )}
      </CardContent>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        collectionName={collection.name}
        isDeleting={isDeleting}
      />
    </Card>
  );
}
