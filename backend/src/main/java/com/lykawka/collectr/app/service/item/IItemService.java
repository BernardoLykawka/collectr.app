package com.lykawka.collectr.app.service.item;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.lykawka.collectr.app.dto.item.CreateItemRequest;
import com.lykawka.collectr.app.dto.item.ItemDTO;
import com.lykawka.collectr.app.dto.item.UpdateItemRequest;

public interface IItemService {
    Page<ItemDTO> getItemsByCollectionId(Pageable pageable, Long collectionId);
    
    ItemDTO getItemById(Long id);

    ItemDTO createItem(CreateItemRequest request, Long userId);

    ItemDTO updateItem(Long id, UpdateItemRequest item);

    void deleteItem(Long id);
}
