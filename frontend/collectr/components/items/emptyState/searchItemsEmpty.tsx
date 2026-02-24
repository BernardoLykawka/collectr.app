import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SearchX } from "lucide-react";

interface SearchItemsEmptyStateProps {
    searchTerm: string;
}

export default function SearchItemsEmptyState({ searchTerm }: SearchItemsEmptyStateProps) {
    return (
        <div className="text-center py-12">
            <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
                    <SearchX className="h-8 w-8 text-muted-foreground" />
                </div>
            </div>
            <p className="font-medium text-lg mb-2">No items found</p>
            <p className="text-sm text-muted-foreground mb-1">
                No items matching <span className="font-medium text-foreground">&quot;{searchTerm}&quot;</span>
            </p>
            <p className="text-xs text-muted-foreground mt-4">
                💡 Try using different keywords or check for typos
            </p>
        </div>
    );
}
