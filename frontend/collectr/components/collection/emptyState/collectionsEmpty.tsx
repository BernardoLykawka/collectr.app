import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Coffee } from "lucide-react";

export default function CollectionsEmptyState() {
    return (
        <div>
            <Card className="w-full mx-auto max-w-4xl border-border/80 bg-card/90 shadow-sm border-dashed">
                <CardHeader className="items-start">
                    <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                            <Coffee className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-lg font-semibold leading-tight">I&apos;m a teapot ☕</p>
                            <p className="text-sm text-muted-foreground">
                                No collections brewing yet
                            </p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        There are no public collections available at the moment. 
                        Be the first to share your collection with the community! 
                    </p>

                    <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground italic">
                            HTTP 418: This server refuses to brew coffee because it&apos;s permanently a teapot.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
