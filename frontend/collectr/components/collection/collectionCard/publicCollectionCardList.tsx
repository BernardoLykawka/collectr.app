"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import CollectionCard from "./collectionCard";
import { CollectionProps } from "./collectionInterface";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { collectionService } from "@/lib/collection-service";

interface CollectionCardListProps {
    itemsPerPage?: number;
}

export default function CollectionCardList({ itemsPerPage = 9 }: CollectionCardListProps) {
    const [collections, setCollections] = useState<CollectionProps["collection"][]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                setLoading(true);
                const data = await collectionService.getCollections();
                setCollections(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load collections");
                setCollections([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, []);

    const totalPages = Math.ceil(collections.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCollections = collections.slice(startIndex, endIndex);

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto">
                <Label className="mb-4 text-lg font-semibold flex">Collections</Label>
                <p className="text-sm text-muted-foreground text-center py-12">Loading collections...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-7xl mx-auto">
                <Label className="mb-4 text-lg font-semibold flex">Collections</Label>
                <p className="text-sm text-destructive text-center py-12">{error}</p>
            </div>
        );
    }

    if (collections.length === 0) {
        return (
            <div className="w-full max-w-7xl mx-auto">
                <Label className="mb-4 text-lg font-semibold flex">Collections</Label>
                <p className="text-sm text-muted-foreground text-center py-12">No collections found.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <Label className="mb-4 text-lg font-semibold flex">Collections</Label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {currentCollections.map((collection) => (
                    <CollectionCard key={collection.id} collection={collection} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            const showPage =
                                page === 1 ||
                                page === totalPages ||
                                (page >= currentPage - 1 && page <= currentPage + 1);

                            const showEllipsis =
                                (page === currentPage - 2 && currentPage > 3) ||
                                (page === currentPage + 2 && currentPage < totalPages - 2);

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
                                    {page}
                                </Button>
                            );
                        })}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
