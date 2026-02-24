"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import type { Item } from "@/lib/item-service";
import { useItemCard } from "./hook";

interface ItemCardProps {
  item: Item;
  onUpdate: () => void;
}

export function ItemCard({ item, onUpdate }: ItemCardProps) {
  const { estimatedValueLabel, cardBackgroundColor, imageOverlay } = useItemCard(item);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/item/${item.id}`);
  };

  return (
    <Card 
      className={`overflow-hidden hover:shadow-xl gap-0 py-0 transition-all cursor-pointer hover:scale-[1.02] relative group ${cardBackgroundColor}`}
      onClick={handleClick}
    >
      <div className="p-3">
        <div className={`aspect-square relative overflow-hidden rounded-lg ${cardBackgroundColor === 'grayscale' ? 'grayscale' : ''}`}>
          {item.imageUrl ? (
            <>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="object-fill rounded-lg w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
              {imageOverlay && (
                <div className={`absolute inset-0 ${imageOverlay}`} />
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <span className="text-4xl">📦</span>
            </div>
          )}
        </div>
      </div>
      <CardContent className="p-3 pt-0">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-10">
          {item.name}
        </h3>
        
        <div className="flex justify-between items-center text-xs">
          <span className="text-muted-foreground">
            {item.releaseYear || "—"}
          </span>
          <span className="font-bold text-primary">
            {estimatedValueLabel}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
