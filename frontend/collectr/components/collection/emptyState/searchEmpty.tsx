import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SearchX } from "lucide-react";

interface SearchEmptyStateProps {
    searchTerm: string;
}

export default function SearchEmptyState({ searchTerm }: SearchEmptyStateProps) {
    return (
        <div>
            <Card className="w-full mx-auto max-w-4xl border-border/80 bg-card/90 shadow-sm border-dashed">
                <CardHeader className="items-start">
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                            <SearchX className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-lg font-semibold leading-tight">No results found</p>
                            <p className="text-sm text-muted-foreground">
                                We couldn&apos;t find any collections matching your search
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        No collections found for <span className="font-medium text-foreground">&quot;{searchTerm}&quot;</span>. 
                        Try adjusting your search terms or browse all available collections.
                    </p>

                    <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground italic">
                            💡 Tip: Try using different keywords or check for typos
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
