"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import CollectionCard from "../collectionCard";
import { CollectionProps } from "../collectionInterface";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { collectionService } from "@/lib/collection-service";
import CollectionsEmptyState from "@/components/collection/emptyState/collectionsEmpty";

const itemsPerPage = 6;

export default function PublicCollectionCardList() {
    const [collections, setCollections] = useState<CollectionProps["collection"][]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                setLoading(true);
                const data = await collectionService.getCollections(currentPage, itemsPerPage);
                setCollections(data.content);
                setTotalPages(data.totalPages);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load collections");
                setCollections([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, [currentPage]);

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className="w-full max-w-4xl mx-auto">
                <Label className="mb-4 text-lg font-semibold flex">Explore Collections</Label>
                <p className="text-sm text-muted-foreground text-center">Loading collections...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-4xl mx-auto">
                <Label className="mb-4 text-lg font-semibold flex">Explore Collections</Label>
                <CollectionsEmptyState />
            </div>
        );
    }

    if (collections.length === 0) {
        return <div className="w-full max-w-4xl mx-auto">
            <Label className="mb-4 text-lg font-semibold flex">Explore Collections</Label>
            <CollectionsEmptyState />
        </div>;
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <Label className="mb-4 text-lg font-semibold flex">Explore Collections</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {collections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 0}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i).map((page) => {
                            const displayPage = page + 1;
                            const showPage =
                                page === 0 ||
                                page === totalPages - 1 ||
                                (page >= currentPage - 1 && page <= currentPage + 1);

                            const showEllipsis =
                                (page === currentPage - 2 && currentPage > 2) ||
                                (page === currentPage + 2 && currentPage < totalPages - 3);

                            if (showEllipsis) {
                                return (
                                    <span key={page} className="px-2 text-muted-foreground">
                                        ...
                                    </span>
                                );
                            }

                            if (!showPage) return null;

                            return (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => goToPage(page)}
                                    className="min-w-10"
                                >
                                    {displayPage}
                                </Button>
                            );
                        })}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages - 1}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
