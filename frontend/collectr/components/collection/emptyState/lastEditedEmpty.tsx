"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, FolderPlus } from "lucide-react";
import { NewCollectionModal } from "../newCollection/newCollectionModal";
import { useState } from "react";

export default function LastEditedEmptyState() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div>
            <Card className="w-full mx-auto max-w-4xl border-border/80 bg-card/90 shadow-sm border-dashed">
                <CardHeader className="items-start">
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                            <FolderPlus className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-lg font-semibold leading-tight">No collections yet</p>
                            <p className="text-sm text-muted-foreground">
                                Start building your collection today
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        Create your first collection to organize and showcase your items. 
                        Track your progress and share with others.
                    </p>

                    <div className="flex items-center gap-2">
                        <Button 
                            variant="default" 
                            className="gap-2"
                            onClick={() => setIsCreateModalOpen(true)}
                        >
                            <Plus className="h-4 w-4" />
                            Create New Collection
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <NewCollectionModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </div>
    );
}  