import type { Item } from "@/lib/item-service";
import { ItemSituation } from "@/types/item";

export function useItemCard(item: Item) {
  const getConditionLabel = (condition: string | null) => {
    if (!condition) return "—";
    return condition.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getSituationLabel = (situation: string) => {
    return situation.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatCurrency = (value: number | null): string => {
    if (!value) return "—";
    return `$${value.toFixed(2)}`;
  };

  const getCardBackgroundColor = (situation: ItemSituation): string => {
    switch (situation) {
      case ItemSituation.OWNED:
        return "";
      case ItemSituation.WISHLIST:
        return "grayscale";
      case ItemSituation.FOR_SALE:
        return "bg-blue-700/50";
      case ItemSituation.SOLD:
        return "bg-red-700/50";
      default:
        return "";
    }
  };
  const getImageOverlay = (situation: ItemSituation): string => {
    switch (situation) {
      case ItemSituation.OWNED:
        return "";
      case ItemSituation.WISHLIST:
        return "";
      case ItemSituation.FOR_SALE:
        return "bg-blue-500/30";
      case ItemSituation.SOLD:
        return "bg-red-500/30";
      default:
        return "";
    }
  };
  const conditionLabel = getConditionLabel(item.condition);
  const situationLabel = getSituationLabel(item.situation);
  const estimatedValueLabel = formatCurrency(item.estimatedValue);
  const purchasePriceLabel = formatCurrency(item.purchasePrice);
  const cardBackgroundColor = getCardBackgroundColor(item.situation);
  const imageOverlay = getImageOverlay(item.situation);

  return {
    conditionLabel,
    situationLabel,
    estimatedValueLabel,
    purchasePriceLabel,
    cardBackgroundColor,
    imageOverlay,
  };
}
