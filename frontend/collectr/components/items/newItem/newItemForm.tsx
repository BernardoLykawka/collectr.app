"use client";

import { FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNewItemForm } from "./hook";
import { ItemCondition, ItemSituation } from "@/types/item";
import type { Item } from "@/lib/item-service";

interface NewItemFormProps {
  collectionId: string;
  onSuccess: (item: Item) => void;
}

const conditionOptions = [
  { value: ItemCondition.MINT, label: "Mint" },
  { value: ItemCondition.NEAR_MINT, label: "Near Mint" },
  { value: ItemCondition.VERY_GOOD, label: "Very Good" },
  { value: ItemCondition.GOOD, label: "Good" },
  { value: ItemCondition.ACCEPTABLE, label: "Acceptable" },
  { value: ItemCondition.POOR, label: "Poor" },
  { value: ItemCondition.DAMAGED, label: "Damaged" },
];

const situationOptions = [
  { value: ItemSituation.OWNED, label: "Owned" },
  { value: ItemSituation.WISHLIST, label: "Wishlist" },
  { value: ItemSituation.FOR_SALE, label: "For Sale" },
  { value: ItemSituation.SOLD, label: "Sold" },
];

export function NewItemForm({ collectionId, onSuccess }: NewItemFormProps) {
  const {
    formData,
    fieldErrors,
    formError,
    isSubmitting,
    handleChange,
    selectCondition,
    selectSituation,
    handleSubmit,
  } = useNewItemForm(collectionId, onSuccess);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    void handleSubmit(e);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add new item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {formError && (
            <p className="text-sm text-destructive" role="alert">
              {formError}
            </p>
          )}

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name *</FieldLabel>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Item name"
              />
              {fieldErrors.name && (
                <FieldDescription className="text-destructive">
                  {fieldErrors.name}
                </FieldDescription>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Optional description"
              />
              <FieldDescription>Describe this item (optional).</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
              <FieldDescription>URL to an image of this item (optional).</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="manufacturer">Manufacturer</FieldLabel>
              <Input
                id="manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                placeholder="Brand or manufacturer"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="releaseYear">Release Year</FieldLabel>
              <Input
                id="releaseYear"
                name="releaseYear"
                type="number"
                value={formData.releaseYear}
                onChange={handleChange}
                placeholder="2024"
                max="2100"
              />
              {fieldErrors.releaseYear && (
                <FieldDescription className="text-destructive">
                  {fieldErrors.releaseYear}
                </FieldDescription>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="estimatedValue">Estimated Value</FieldLabel>
                <Input
                  id="estimatedValue"
                  name="estimatedValue"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.estimatedValue}
                  onChange={handleChange}
                  placeholder="0.00"
                />
                {fieldErrors.estimatedValue && (
                  <FieldDescription className="text-destructive">
                    {fieldErrors.estimatedValue}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="purchasePrice">Purchase Price</FieldLabel>
                <Input
                  id="purchasePrice"
                  name="purchasePrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  placeholder="0.00"
                />
                {fieldErrors.purchasePrice && (
                  <FieldDescription className="text-destructive">
                    {fieldErrors.purchasePrice}
                  </FieldDescription>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel>Condition</FieldLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                {conditionOptions.map((option) => {
                  const isSelected = formData.condition === option.value;
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => selectCondition(option.value)}
                      aria-pressed={isSelected}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
              <FieldDescription>Select the item's condition (optional).</FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Situation *</FieldLabel>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {situationOptions.map((option) => {
                  const isSelected = formData.situation === option.value;
                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => selectSituation(option.value)}
                      aria-pressed={isSelected}
                    >
                      {option.label}
                    </Button>
                  );
                })}
              </div>
              {fieldErrors.situation && (
                <FieldDescription className="text-destructive">
                  {fieldErrors.situation}
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Adding..." : "Add item"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
