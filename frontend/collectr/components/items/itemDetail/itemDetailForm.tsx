"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import type { Item } from "@/lib/item-service";
import { ItemCondition, ItemSituation } from "@/types/item";

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

interface ItemDetailFormProps {
  item: Item;
  formData: {
    name: string;
    description: string;
    imageUrl: string;
    manufacturer: string;
    releaseYear: string;
    estimatedValue: string;
    purchasePrice: string;
    condition: string;
    situation: ItemSituation;
  };
  saving: boolean;
  error: string | null;
  showDeleteConfirm: boolean;
  canEdit: boolean;
  onBack: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectCondition: (condition: ItemCondition) => void;
  onSelectSituation: (situation: ItemSituation) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
  onShowDeleteConfirm: () => void;
}

export function ItemDetailForm({
  item,
  formData,
  saving,
  error,
  showDeleteConfirm,
  canEdit,
  onBack,
  onChange,
  onSelectCondition,
  onSelectSituation,
  onSubmit,
  onDelete,
  onShowDeleteConfirm,
}: ItemDetailFormProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Button onClick={onBack} variant="ghost" className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Collection
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Item Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            {!canEdit && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  You can only view this item. Only the collection owner can edit or delete items.
                </p>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-6">
              {formData.imageUrl && (
                <div className="w-full md:w-48 h-48 shrink-0">
                  <div className="w-full h-full bg-muted relative overflow-hidden rounded-lg">
                    <img
                      src={formData.imageUrl}
                      alt={formData.name}
                      className="object-fill rounded-lg w-full h-full"
                    />
                  </div>
                </div>
              )}

              <FieldGroup className="flex-1">
              <Field>
                <FieldLabel htmlFor="name">Name *</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder="Item name"
                  required
                  disabled={!canEdit}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <textarea
                  id="description"
                  name="description"
                  className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.description}
                  onChange={onChange}
                  placeholder="Optional description"
                  rows={3}
                  disabled={!canEdit}
                />
                <FieldDescription>Describe this item (optional).</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={onChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  disabled={!canEdit}
                />
                <FieldDescription>URL to an image of this item.</FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="manufacturer">Manufacturer</FieldLabel>
                <Input
                  id="manufacturer"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={onChange}
                  placeholder="Brand or manufacturer"
                  disabled={!canEdit}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="releaseYear">Release Year</FieldLabel>
                <Input
                  id="releaseYear"
                  name="releaseYear"
                  type="number"
                  value={formData.releaseYear}
                  onChange={onChange}
                  placeholder="2024"
                  max="2100"
                  required
                  disabled={!canEdit}
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="estimatedValue">Estimated Value</FieldLabel>
                  <Input
                    id="estimatedValue"
                    name="estimatedValue"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.estimatedValue}
                    onChange={onChange}
                    placeholder="0.00"
                    required
                    disabled={!canEdit}
                  />
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
                    onChange={onChange}
                    placeholder="0.00"
                    disabled={!canEdit}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="condition">Condition</FieldLabel>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={(e) => onSelectCondition(e.target.value as ItemCondition)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!canEdit}
                  >
                    {conditionOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="situation">Situation *</FieldLabel>
                  <select
                    id="situation"
                    name="situation"
                    value={formData.situation}
                    onChange={(e) => onSelectSituation(e.target.value as ItemSituation)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                    disabled={!canEdit}
                  >
                    {situationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              </FieldGroup>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" disabled={saving || !canEdit} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>

              {!showDeleteConfirm ? (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onShowDeleteConfirm}
                  disabled={saving || !canEdit}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={onDelete}
                  disabled={saving || !canEdit}
                  className="flex-1"
                >
                  Confirm Delete
                </Button>
              )}
            </div>

            {showDeleteConfirm && (
              <p className="text-sm text-destructive text-center">
                Are you sure you want to delete this item? This action cannot be undone.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
