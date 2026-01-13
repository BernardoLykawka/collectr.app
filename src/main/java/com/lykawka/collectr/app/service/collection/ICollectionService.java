package com.lykawka.collectr.app.service.collection;

import com.lykawka.collectr.app.dto.collection.CollectionDTO;
import com.lykawka.collectr.app.dto.collection.CreateCollectionRequest;
import com.lykawka.collectr.app.dto.collection.UpdateCollectionRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICollectionService {
    Page<CollectionDTO> findAll(Pageable pageable);

    Page<CollectionDTO> findAllByUserId(Pageable pageable, Long userId);

    Page<CollectionDTO> findAllPublic(Pageable pageable);

    CollectionDTO findById(Long id, Long userId);

    CollectionDTO create(CreateCollectionRequest request, Long userId);

    CollectionDTO update(Long id, UpdateCollectionRequest request, Long userId);

    void delete(Long id, Long userId);

}
