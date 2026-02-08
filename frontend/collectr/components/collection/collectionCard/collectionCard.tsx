"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CollectionProps } from "./collectionInterface";
import { useCollectionCard } from "./hook";
import CircularProgress from "@/components/ui/circular-progress";
import { useRouter } from "next/navigation";

export default function CollectionCard({ collection }: CollectionProps) {
    const { lastEditedText, visibilityLabel, VisibilityIcon, TypeIcon, typeColor, description } = useCollectionCard(collection);
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/collection/${collection.id}`);
    };

    return (
        <Card 
            className="border-border/80 bg-card/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer h-full flex flex-col"
            onClick={handleCardClick}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <p className="text-base font-semibold leading-tight truncate">{collection.name}</p>
                        <p className="text-xs text-muted-foreground truncate">by {collection.userNickname}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent-foreground shrink-0">
                        <VisibilityIcon className="h-3 w-3" aria-hidden />
                        {visibilityLabel}
                    </span>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 flex-1">
                <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{description}</p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: `${typeColor}20`, color: typeColor }}>
                            <TypeIcon className="h-3.5 w-3.5" />
                        </span>
                        <CircularProgress value={collection.status ?? 0} size={16} strokeWidth={1.2}/>
                    </div>
                    <span className="text-xs text-muted-foreground">{lastEditedText}</span>
                </div>
            </CardContent>
        </Card>
    );
}