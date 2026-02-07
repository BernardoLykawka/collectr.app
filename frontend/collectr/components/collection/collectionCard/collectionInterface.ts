import { CollectionType } from "@/types/CollectionType";

export interface CollectionProps {
    collection: {
        id: string;
        createdAt?: Date;
        updatedAt?: Date;
        name: string;
        description?: string;
        isPublic: boolean;
        userId: string;
        status: number;
        collectionType: CollectionType;
    };
}