"use client";

import { FormEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCollectionForm } from "./hook";
import { collectionTypeOptions } from "@/types/CollectionType";
import type { Collection } from "@/lib/collection-service";

interface CreateCollectionFormProps {
  onSuccess?: (collection: Collection) => void;
}

export function CreateCollectionForm({ onSuccess }: CreateCollectionFormProps) {
  const { formData, fieldErrors, formError, isSubmitting, handleChange, selectCollectionType, handleSubmit } =
    useCreateCollectionForm({ onSuccess });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    void handleSubmit(e);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create new collection</CardTitle>
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
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="My awesome collection"
              />
              {fieldErrors.name && (
                <p className="text-sm text-destructive">{fieldErrors.name}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Optional description"
              />
              {fieldErrors.description && (
                <p className="text-sm text-destructive">{fieldErrors.description}</p>
              )}
              <FieldDescription>Describe what this collection is about (optional).</FieldDescription>
            </Field>

            <Field>
              <FieldLabel>Collection type</FieldLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                {collectionTypeOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = formData.collectionType === option.value;

                  return (
                    <Button
                      key={option.value}
                      type="button"
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className="flex items-center gap-2 justify-start"
                      onClick={() => selectCollectionType(option.value)}
                      aria-pressed={isSelected}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{option.label}</span>
                    </Button>
                  );
                })}
              </div>
              {fieldErrors.collectionType && (
                <p className="text-sm text-destructive mt-1">{fieldErrors.collectionType}</p>
              )}
            </Field>

            <Field orientation="horizontal">
              <FieldLabel htmlFor="isPublic" className="flex items-center gap-2">
                <input
                  id="isPublic"
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={handleChange}
                  className="border-input bg-background text-primary h-4 w-4 rounded border shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <span>Public?</span>
              </FieldLabel>
              <FieldDescription>
                Public collections may appear in public listings and can be viewed by other users.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <Button type="submit" disabled={isSubmitting} className="mt-2">
            {isSubmitting ? "Creating..." : "Create collection"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
