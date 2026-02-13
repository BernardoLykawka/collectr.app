"use client";

import { NewItemForm } from "./newItemForm";
import type { Item } from "@/lib/item-service";

interface NewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  collectionId: string;
  onSuccess?: (item: Item) => void;
}

export function NewItemModal({ isOpen, onClose, collectionId, onSuccess }: NewItemModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSuccess = (item: Item) => {
    onClose();
    if (onSuccess) {
      onSuccess(item);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-end bg-black/60 px-8 py-4 md:px-16 
        animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <NewItemForm collectionId={collectionId} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
