import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function ItemDetails() {
    return (
        <Card>
            <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-lg">Collection Items</CardTitle>
                <Button
                variant="default"
                onClick={() => alert("Add item functionality will be implemented here")}
                >
                <Plus className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                    <p>Items section will be implemented here</p>
                    <p className="text-sm mt-2">You'll be able to add, edit, and view items in your collection</p>
                </div>
            </CardContent>
      </Card>
    );
}