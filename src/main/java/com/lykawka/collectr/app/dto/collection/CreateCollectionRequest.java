package com.lykawka.collectr.app.dto.collection;

import com.lykawka.collectr.app.model.collection.CollectionType;

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
public class CreateCollectionRequest {
    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    @NotNull(message = "Public status is required")
    private Boolean isPublic;
    
    private Integer status;

    @NotNull(message = "Collection Type is required")
    private CollectionType collectionType;

}
