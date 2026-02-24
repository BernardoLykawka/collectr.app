import { useState } from "react";
import { itemService, type Item } from "@/lib/item-service";
import { showToast } from "@/components/ui/toast";
import type { ItemCondition, ItemSituation } from "@/types/item";

interface FormData {
  name: string;
  description: string;
  imageUrl: string;
  manufacturer: string;
  releaseYear: string;
  estimatedValue: string;
  purchasePrice: string;
  condition: ItemCondition | "";
  situation: ItemSituation | "";
  collectionId: string;
}

interface FieldErrors {
  name?: string;
  situation?: string;
  releaseYear?: string;
  estimatedValue?: string;
  purchasePrice?: string;
}

export function useNewItemForm(
  collectionId: string,
  onSuccess: (item: Item) => void
) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    imageUrl: "",
    manufacturer: "",
    releaseYear: "",
    estimatedValue: "",
    purchasePrice: "",
    condition: "",
    situation: "",
    collectionId,
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setFormError("");
  };

  const selectCondition = (condition: ItemCondition | "") => {
    setFormData((prev) => ({ ...prev, condition }));
    setFormError("");
  };

  const selectSituation = (situation: ItemSituation | "") => {
    setFormData((prev) => ({ ...prev, situation }));
    setFieldErrors((prev) => ({ ...prev, situation: undefined }));
    setFormError("");
  };

  const validate = (): boolean => {
    const errors: FieldErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.situation) {
      errors.situation = "Situation is required";
    }

    if (formData.releaseYear) {
      const year = parseInt(formData.releaseYear);
      if (isNaN(year) || year > 2100) {
        errors.releaseYear = "Please enter a valid year (< 2100)";
      }
    }

    if (formData.estimatedValue) {
      const value = parseFloat(formData.estimatedValue);
      if (isNaN(value) || value < 0) {
        errors.estimatedValue = "Please enter a valid positive number";
      }
    }

    if (formData.purchasePrice) {
      const price = parseFloat(formData.purchasePrice);
      if (isNaN(price) || price < 0) {
        errors.purchasePrice = "Please enter a valid positive number";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      showToast("Please correct the errors in the form", "error");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const itemData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        imageUrl: formData.imageUrl.trim() || undefined,
        manufacturer: formData.manufacturer.trim() || undefined,
        releaseYear: formData.releaseYear
          ? parseInt(formData.releaseYear)
          : undefined,
        estimatedValue: formData.estimatedValue
          ? parseFloat(formData.estimatedValue)
          : undefined,
        purchasePrice: formData.purchasePrice
          ? parseFloat(formData.purchasePrice)
          : undefined,
        condition: formData.condition || undefined,
        situation: formData.situation as ItemSituation,
        collectionId: formData.collectionId,
      };

      const newItem = await itemService.createItem(itemData);
      showToast("Item added successfully!", "success");
      onSuccess(newItem);
    } catch (error) {
      console.error("Error creating item:", error);
      if (error instanceof Error) {
        setFormError(error.message);
        showToast(error.message, "error");
      } else {
        setFormError("Failed to create item. Please try again.");
        showToast("Failed to create item. Please try again.", "error");
      }
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
    selectCondition,
    selectSituation,
    handleSubmit,
  };
}
