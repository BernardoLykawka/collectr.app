package com.lykawka.collectr.app.service.collection;

import com.lykawka.collectr.app.dto.collection.CollectionDTO;
import com.lykawka.collectr.app.dto.collection.CreateCollectionRequest;
import com.lykawka.collectr.app.dto.collection.UpdateCollectionRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ICollectionService {
    Page<CollectionDTO> findAll(Pageable pageable);

    Page<CollectionDTO> findAllByUserId(Pageable pageable, UUID userId, String name);

    Page<CollectionDTO> findAllPublic(Pageable pageable, String name);

    CollectionDTO findById(UUID id, UUID userId);

    CollectionDTO create(CreateCollectionRequest request, UUID userId);

    CollectionDTO update(UUID id, UpdateCollectionRequest request, UUID userId);

    void delete(UUID id, UUID userId);

}
