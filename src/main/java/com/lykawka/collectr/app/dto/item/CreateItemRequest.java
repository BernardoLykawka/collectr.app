package com.lykawka.collectr.app.dto.item;

import com.lykawka.collectr.app.model.item.ItemCondition;
import com.lykawka.collectr.app.model.item.ItemSituation;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateItemRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    private String imageUrl;

    private String manufacturer;

    private Integer releaseYear;

    private ItemCondition condition;

    @NotNull(message = "Situation is required")
    private ItemSituation situation;

    private Double estimatedValue;

    private Double purchasePrice;
}
