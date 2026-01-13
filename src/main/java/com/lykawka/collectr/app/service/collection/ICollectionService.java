package com.lykawka.collectr.app.service.collection;

import com.lykawka.collectr.app.dto.collection.CollectionDTO;
import com.lykawka.collectr.app.dto.collection.CreateCollectionRequest;
import com.lykawka.collectr.app.dto.collection.UpdateCollectionRequest;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICollectionService {
    Page<CollectionDTO> findAll(Pageable pageable);

    Page<CollectionDTO> findAllByUserId(Pageable pageable, Long userId);

    CollectionDTO findById(Long id);

    CollectionDTO create(CreateCollectionRequest request);

    CollectionDTO update(Long id, UpdateCollectionRequest request);

    void delete(Long id);

}
