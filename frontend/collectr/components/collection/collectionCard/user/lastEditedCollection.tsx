"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CollectionProps } from "../collectionInterface";
import { useCollectionCard } from "../hook";
import CircularProgress from "@/components/ui/circular-progress";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { collectionService } from "@/lib/collection-service";
import LoginRequiredState from "@/components/collection/emptyState/loginRequiredState";
import LastEditedEmptyState from "@/components/collection/emptyState/lastEditedEmpty";

const CollectionLoadingState = ({ 
    title, 
    message 
}: { 
    title: string; 
    message: string 
}) => (
    <div className="w-full max-w-4xl mx-auto">
        <Label className="mb-2 text-lg font-semibold flex">{title}</Label>
        <p className="text-sm text-muted-foreground text-center py-12">{message}</p>
    </div>
);

export default function LastEditedCollection() {
    const { isAuthenticated, isLoading: authLoading } = useAuth();
    const [collection, setCollection] = useState<CollectionProps["collection"] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchLastEditedCollection = async () => {
            if (!isAuthenticated) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const data = await collectionService.getLastEditedCollection();
                setCollection(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load collection");
                setCollection(null);
            } finally {
                setLoading(false);
            }
        };

        if (!authLoading) {
            fetchLastEditedCollection();
        }
    }, [isAuthenticated, authLoading]);

    const handleCardClick = () => {
        if (collection) {
            router.push(`/collection/${collection.id}`);
        }
    };

    if (authLoading || loading) {
        return (
            <div>
                <Label className="mb-4 text-lg font-semibold flex w-full max-w-4xl mx-auto">Last Edited Collection</Label>
                <CollectionLoadingState title="Last Edited Collection" message="Loading..." />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div>
                <Label className="mb-4 text-lg font-semibold flex w-full max-w-4xl mx-auto">Last Edited Collection</Label>
                <LoginRequiredState />
            </div>
        );
    }

    if (!collection) {
        return (
            <div>
                <Label className="mb-4 text-lg font-semibold flex w-full max-w-4xl mx-auto">Last Edited Collection</Label>
                <LastEditedEmptyState />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Label className="mb-4 text-lg font-semibold flex w-full max-w-4xl mx-auto">Last Edited Collection</Label>
                <CollectionLoadingState title="Last Edited Collection" message={error} />
            </div>
        );
    }


    return <LastEditedCollectionCard collection={collection} handleCardClick={handleCardClick} />;
}

function LastEditedCollectionCard({ 
    collection, 
    handleCardClick 
}: { 
    collection: CollectionProps["collection"];
    handleCardClick: () => void;
}) {
    const { lastEditedText, visibilityLabel, VisibilityIcon, TypeIcon, typeColor, description } 
        = useCollectionCard(collection);

    return (
    <div>
        <Label className="mb-4 text-lg font-semibold flex w-full max-w-4xl mx-auto">Last Edited Collection</Label>
        <Card 
            className="w-full mx-auto max-w-4xl border-border/80 bg-card/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md cursor-pointer"
            onClick={handleCardClick}
        >
            <CardHeader className="grid-cols-[1fr_auto] items-start">
                <div className="flex items-center">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium" style={{ backgroundColor: `${typeColor}20`, color: typeColor }}>
                                {TypeIcon && <TypeIcon className="h-4 w-4" />}
                            </span>
                            <p className="text-lg font-semibold leading-tight">{collection.name}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">by {collection.userNickname}</p>
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
                </div>
            </CardContent>
        </Card>
        </div>
    );
}