import CollectionCard from "@/components/collection/collectionCard/collectionCard";
import LastEditedCard from "@/components/collection/collectionCard/lastEditedCollection";
import { CollectionType } from "@/types/CollectionType";

export default function Page() {
  return (<div className="flex flex-col gap-8 p-8">
    <LastEditedCard collection={{ id: "1", name: "My Collection", description: "This is my collection description.", isPublic: true, status: 54, collectionType: CollectionType.COINS, user: { id: "1", nickname: "Boiccs" } }} />
    <CollectionCard collection={{ id: "1", name: "My Collection", description: "This is my collection description.", isPublic: true, status: 12, collectionType: CollectionType.COINS, user: { id: "1", nickname: "Boiccs" } }} />
  </div>
  );
}
