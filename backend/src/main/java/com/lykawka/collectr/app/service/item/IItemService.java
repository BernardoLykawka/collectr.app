package com.lykawka.collectr.app.service.item;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.lykawka.collectr.app.dto.item.CreateItemRequest;
import com.lykawka.collectr.app.dto.item.ItemDTO;
import com.lykawka.collectr.app.dto.item.UpdateItemRequest;

import java.util.UUID;

public interface IItemService {
    Page<ItemDTO> getItemsByCollectionId(Pageable pageable, UUID collectionId);
    
    ItemDTO getItemById(UUID id);

    ItemDTO createItem(CreateItemRequest request, UUID userId);

    ItemDTO updateItem(UUID id, UpdateItemRequest item);

    void deleteItem(UUID id);
}
