import CollectionCard from "@/components/collection/collectionCard/collectionCard";
import CollectionCardList from "@/components/collection/collectionCard/publicCollectionCardList";
import LastEditedCard from "@/components/collection/collectionCard/lastEditedCollection";
import { CollectionType } from "@/types/CollectionType";
import MyCollectionCardList from "@/components/collection/collectionCard/myCollectionCardList";

export default function Page() {
  return (<div className="flex flex-col gap-8 p-8">
    <LastEditedCard collection={{ id: "1", name: "My Collection", description: "This is my collection description.", isPublic: true, status: 54, collectionType: CollectionType.COINS, userId: "1"}} />
    <CollectionCardList />
    <MyCollectionCardList />
  </div>
  );
}
