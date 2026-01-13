package com.lykawka.collectr.app.dto.collection;

import com.lykawka.collectr.app.model.collection.CollectionType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCollectionRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    private Boolean isPublic;

    private Integer status;

    @NotNull(message = "Collection Type is required")
    private CollectionType collectionType;

}
