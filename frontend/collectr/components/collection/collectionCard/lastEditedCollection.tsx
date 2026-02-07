"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CollectionProps } from "./collectionInterface";
import { useCollectionCard } from "./hook";
import CircularProgress from "@/components/ui/circular-progress";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export default function CollectionCard({ collection }: CollectionProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const { lastEditedText, visibilityLabel, VisibilityIcon, TypeIcon, typeColor, description } = useCollectionCard(collection);
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/collection/${collection.id}`);
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto">
                <Label className="mb-2 text-lg font-semibold flex">Last Edited Collection</Label>
                <p className="text-sm text-muted-foreground text-center py-12">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="w-full max-w-4xl mx-auto">
                <Label className="mb-2 text-lg font-semibold flex">Last Edited Collection</Label>
                <p className="text-sm text-muted-foreground text-center py-12">Please log in to view your last edited collection.</p>
            </div>
        );
    }

    return (
    <div>
        <Label className="mb-2 text-lg font-semibold flex w-full max-w-4xl mx-auto">Last Edited Collection</Label>
        <Card 
            className="w-full mx-auto max-w-4xl border-border/80 bg-card/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
            onClick={handleCardClick}
        >
            <CardHeader className="grid-cols-[1fr_auto] items-start">
                <div className="flex items-center">
                    <div className="flex flex-col gap-1">
                        <p className="text-lg font-semibold leading-tight">{collection.name}</p>
                        <p className="text-sm text-muted-foreground">by {collection.userId}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-right">
                    <span className="text-xs text-muted-foreground">Last edited {lastEditedText}</span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 text-xs font-medium text-accent-foreground">
                        <VisibilityIcon className="h-3.5 w-3.5" aria-hidden />
                        {visibilityLabel}
                    </span>
                </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

                <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: `${typeColor}20`, color: typeColor }}>
                        <TypeIcon className="h-4 w-4" />
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/70 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                        <CircularProgress value={collection.status ?? 0}/>
                    </span>
                </div>
            </CardContent>
        </Card>
        </div>
    );
}