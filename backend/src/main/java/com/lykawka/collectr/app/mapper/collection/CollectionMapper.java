package com.lykawka.collectr.app.mapper.collection;

import org.springframework.stereotype.Component;

import com.lykawka.collectr.app.dto.collection.CollectionDTO;
import com.lykawka.collectr.app.dto.collection.CreateCollectionRequest;
import com.lykawka.collectr.app.model.collection.Collection;

@Component
public class CollectionMapper {
    public CollectionDTO toDTO(Collection collection) {
        return CollectionDTO.builder()
                .id(collection.getId())
                .userId(collection.getUserId())
                .name(collection.getName())
                .description(collection.getDescription())
                .active(collection.getActive())
                .createdAt(collection.getCreatedAt())
                .updatedAt(collection.getUpdatedAt())
                .collectionType(collection.getCollectionType())
                .isPublic(collection.getIsPublic())
                .status(collection.getStatus())
                .build();
    }

    public Collection toEntity(CreateCollectionRequest request) {
        return Collection.builder()
                .name(request.getName())
                .description(request.getDescription())
                .collectionType(request.getCollectionType())
                .isPublic(request.getIsPublic())
                .status(request.getStatus() != null ? request.getStatus() : 0)
                .build();
    }
}
