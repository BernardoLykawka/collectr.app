"use client";

import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useItemDetail } from "@/components/items/itemDetail/hook";
import { ItemDetailForm } from "@/components/items/itemDetail/itemDetailForm";

export default function ItemPage() {
  const params = useParams();
  const itemId = params?.itemId as string;
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const {
    item,
    loading,
    saving,
    error,
    formData,
    showDeleteConfirm,
    canEdit,
    setShowDeleteConfirm,
    handleChange,
    selectCondition,
    selectSituation,
    handleSubmit,
    handleDelete,
    handleBack,
  } = useItemDetail(itemId);

  if (authLoading || loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 flex justify-center items-center min-h-100">
        <CircularProgress value={0} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p>You need to be logged in to view this item.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error && !item) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
            <Button onClick={handleBack} className="mt-4" variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <p>Item not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ItemDetailForm
      item={item}
      formData={formData}
      saving={saving}
      error={error}
      showDeleteConfirm={showDeleteConfirm}
      canEdit={canEdit}
      onBack={handleBack}
      onChange={handleChange}
      onSelectCondition={selectCondition}
      onSelectSituation={selectSituation}
      onSubmit={handleSubmit}
      onDelete={handleDelete}
      onShowDeleteConfirm={() => setShowDeleteConfirm(true)}
    />
  );
}
