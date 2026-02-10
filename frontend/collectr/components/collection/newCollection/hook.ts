"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useModal } from "@/contexts/modal-context";
import { collectionService, type Collection } from "@/lib/collection-service";
import { CollectionType } from "@/types/CollectionType";
import { showToast } from "@/components/ui/toast";

export interface CreateCollectionFormData {
  name: string;
  description: string;
  collectionType: CollectionType | "";
  isPublic: boolean;
}

export type CreateCollectionField = keyof CreateCollectionFormData;

interface UseCreateCollectionFormOptions {
  onSuccess?: (collection: Collection) => void;
}

export function useCreateCollectionForm({
  onSuccess,
}: UseCreateCollectionFormOptions = {}) {
  const { isAuthenticated } = useAuth();
  const { openModal } = useModal();

  const [formData, setFormData] = useState<CreateCollectionFormData>({
    name: "",
    description: "",
    collectionType: "",
    isPublic: true,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<CreateCollectionField, string>>({
    name: "",
    description: "",
    collectionType: "",
    isPublic: "",
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const fieldId = target.id as CreateCollectionField;

    const newValue =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;

    setFormData((prev) => ({
      ...prev,
      [fieldId]: newValue,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [fieldId]: "",
    }));

    setFormError(null);
  };

  const selectCollectionType = (type: CollectionType) => {
    setFormData((prev) => ({
      ...prev,
      collectionType: type,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      collectionType: "",
    }));

    setFormError(null);
  };

  const validate = (): boolean => {
    const errors: Partial<Record<CreateCollectionField, string>> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.collectionType) {
      errors.collectionType = "Collection type is required";
    }

    if (formData.collectionType && !Object.values(CollectionType).includes(formData.collectionType as CollectionType)) {
      errors.collectionType = "Invalid collection type";
    }

    const hasErrors = Object.keys(errors).length > 0;

    setFieldErrors((prev) => ({
      ...prev,
      name: errors.name ?? prev.name,
      description: errors.description ?? prev.description,
      collectionType: errors.collectionType ?? prev.collectionType,
      isPublic: errors.isPublic ?? prev.isPublic,
    }));

    return !hasErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!validate()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }


    if (!isAuthenticated) {
      showToast("You need to be logged in to create a collection", "info");
      openModal();
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        collectionType: formData.collectionType as CollectionType,
        isPublic: formData.isPublic,
      };

      const collection = await collectionService.createCollection(payload);

      showToast("Collection created successfully!", "success");
      onSuccess?.(collection);
    } catch (error: unknown) {
      const message =
        error instanceof Object && "message" in error
          ? (error.message as string)
          : "Failed to create collection. Please try again.";

      setFormError(message);
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    fieldErrors,
    formError,
    isSubmitting,
    handleChange,
    selectCollectionType,
    handleSubmit,
  };
}