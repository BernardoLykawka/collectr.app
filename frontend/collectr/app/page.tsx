"use client";
import CollectionCardList from "@/components/collection/collectionCard/publicList/publicCollectionCardList";
import LastEditedCollection from "@/components/collection/collectionCard/user/lastEditedCollection";
import MyCollectionCardList from "@/components/collection/collectionCard/user/myCollectionCardList";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";

export default function Page() {
  const { user } = useAuth();

  return (<div className="flex flex-col gap-8 p-8">
    <Label className="text-2xl flex items-center justify-center">Welcome {user?.nickname || "Guest"}!</Label>
    <LastEditedCollection />
    <CollectionCardList />
    <MyCollectionCardList />
  </div>
  );
}
