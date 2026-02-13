"use client";
import { useState } from "react";
import CollectionCardList from "@/components/collection/collectionCard/publicList/publicCollectionCardList";
import LastEditedCollection from "@/components/collection/collectionCard/user/lastEditedCollection";
import MyCollectionCardList from "@/components/collection/collectionCard/user/myCollectionCardList";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

export default function Page() {
  const { user } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  return (<div className="flex flex-col gap-8 p-8">
    <Label className="text-2xl flex items-center justify-center">Welcome {user?.nickname || "Guest"}!</Label>
    <LastEditedCollection />
    
    <div className="max-w-2xl mx-auto w-full">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search collections..."
            className="pl-9"
          />
        </div>
        <Button type="submit">
          Search
        </Button>
      </form>
    </div>

    
    <CollectionCardList searchTerm={searchTerm} />
    <MyCollectionCardList searchTerm={searchTerm} />
  </div>
  );
}
