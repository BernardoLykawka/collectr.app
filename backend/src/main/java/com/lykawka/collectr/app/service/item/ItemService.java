package com.lykawka.collectr.app.service.item;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lykawka.collectr.app.dto.item.CreateItemRequest;
import com.lykawka.collectr.app.dto.item.ItemDTO;
import com.lykawka.collectr.app.dto.item.UpdateItemRequest;
import com.lykawka.collectr.app.exception.ResourceNotFoundException;
import com.lykawka.collectr.app.exception.ValidationException;
import com.lykawka.collectr.app.mapper.item.ItemMapper;
import com.lykawka.collectr.app.model.collection.Collection;
import com.lykawka.collectr.app.model.item.Item;
import com.lykawka.collectr.app.repository.collection.CollectionRepository;
import com.lykawka.collectr.app.repository.item.ItemRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ItemService implements IItemService {
    private final ItemMapper itemMapper;
    private final ItemRepository itemRepository;
    private final CollectionRepository collectionRepository;

    @Transactional
    public Page<ItemDTO> getItemsByCollectionId(Pageable pageable, Long collectionId) {
        return itemRepository.findAllByCollectionId(pageable, collectionId)
                .map(itemMapper::toDTO);
    }

    @Transactional
    public ItemDTO getItemById(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
        return itemMapper.toDTO(item);
    }

    @Transactional
    public ItemDTO createItem(CreateItemRequest request, Long userId) {
        if (request.getCollectionId() == null) {
            throw new ValidationException("Collection ID is required");
        }

        Collection collection = collectionRepository.findById(request.getCollectionId())
                .orElseThrow(() -> new ResourceNotFoundException("Collection not found"));

        if (!collection.getUserId().equals(userId)) {
            throw new ValidationException("You don't have permission to add items to this collection");
        }

        Item item = itemMapper.toEntity(request);
        item.setCollection(collection);

        Item savedItem = itemRepository.save(item);
        return itemMapper.toDTO(savedItem);
    }

    @Transactional
    public ItemDTO updateItem(Long id, UpdateItemRequest request) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));

        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setManufacturer(request.getManufacturer());
        item.setImageUrl(request.getImageUrl());
        item.setCondition(request.getCondition());
        item.setReleaseYear(request.getReleaseYear());
        item.setEstimatedValue(request.getEstimatedValue());
        item.setPurchasePrice(request.getPurchasePrice());
        item.setSituation(request.getSituation());
        
        Item updatedItem = itemRepository.save(item);
        return itemMapper.toDTO(updatedItem);
    }

    @Transactional
    public void deleteItem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
        itemRepository.delete(item);
    }
    
}
