"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  collectionName: string;
  isDeleting?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  collectionName,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isDeleting) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/30 px-8 py-16 md:px-16"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-xs animate-in fade-in zoom-in-95 duration-200">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Delete collection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <strong>{collectionName}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
