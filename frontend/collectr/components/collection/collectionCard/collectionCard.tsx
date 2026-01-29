import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { CollectionProps } from "./collectionInterface";

export default function CollectionCard({ collection }: CollectionProps){
    return (
        <Card className="mx-auto ">
            <CardHeader className="inline-flex gap">
                <Label>{collection.name}</Label>
                <Label>{collection.user.nickname}</Label>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <Label>{collection.collectionType}</Label>
                <Label>{collection.description}</Label>
            </CardContent>
        </Card>
    );
}