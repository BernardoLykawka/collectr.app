import CollectionCardList from "@/components/collection/collectionCard/publicList/publicCollectionCardList";
import LastEditedCollection from "@/components/collection/collectionCard/user/lastEditedCollection";
import MyCollectionCardList from "@/components/collection/collectionCard/user/myCollectionCardList";

export default function Page() {
  return (<div className="flex flex-col gap-8 p-8">
    <LastEditedCollection />
    <CollectionCardList />
    <MyCollectionCardList />
  </div>
  );
}
