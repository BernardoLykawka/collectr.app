package com.lykawka.collectr.app.mapper.item;

import org.springframework.stereotype.Component;

import com.lykawka.collectr.app.dto.item.CreateItemRequest;
import com.lykawka.collectr.app.dto.item.ItemDTO;
import com.lykawka.collectr.app.model.item.Item;

@Component
public class ItemMapper {
    public ItemDTO toDTO(Item item) {
        return ItemDTO.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .manufacturer(item.getManufacturer())
                .imageUrl(item.getImageUrl())
                .condition(item.getCondition())
                .releaseYear(item.getReleaseYear())
                .estimatedValue(item.getEstimatedValue())
                .purchasePrice(item.getPurchasePrice())
                .situation(item.getSituation())
                .collectionId(item.getCollection().getId())
                .active(item.getActive())
                .build();
    }

    public Item toEntity(CreateItemRequest request){
        return Item.builder()
            .name(request.getName())
            .description(request.getDescription())
            .manufacturer(request.getManufacturer())
            .imageUrl(request.getImageUrl())
            .condition(request.getCondition())
            .releaseYear(request.getReleaseYear())
            .estimatedValue(request.getEstimatedValue())
            .purchasePrice(request.getPurchasePrice())
            .situation(request.getSituation())
            .build();
    }
}
