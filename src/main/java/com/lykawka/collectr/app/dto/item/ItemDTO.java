package com.lykawka.collectr.app.dto.item;

import com.lykawka.collectr.app.model.item.ItemCondition;
import com.lykawka.collectr.app.model.item.ItemSituation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {
    
    private Long id;
    private Long collectionId;
    private String name;
    private String description;
    private String imageUrl;
    private String manufacturer;
    private Integer releaseYear;
    private String serialNumber;
    private Double estimatedValue;
    private Double purchasePrice;
    private ItemCondition condition;
    private ItemSituation situation;
    private Boolean active;
}
