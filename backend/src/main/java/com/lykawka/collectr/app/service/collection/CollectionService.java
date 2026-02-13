package com.lykawka.collectr.app.service.collection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lykawka.collectr.app.dto.collection.CollectionDTO;
import com.lykawka.collectr.app.dto.collection.CreateCollectionRequest;
import com.lykawka.collectr.app.dto.collection.UpdateCollectionRequest;
import com.lykawka.collectr.app.exception.ConflictException;
import com.lykawka.collectr.app.exception.ResourceNotFoundException;
import com.lykawka.collectr.app.exception.ValidationException;
import com.lykawka.collectr.app.mapper.collection.CollectionMapper;
import com.lykawka.collectr.app.model.collection.Collection;
import com.lykawka.collectr.app.repository.collection.CollectionRepository;
import com.lykawka.collectr.app.repository.user.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CollectionService implements ICollectionService {
    private final CollectionRepository collectionRepository;
    private final CollectionMapper collectionMapper;
    private final UserRepository userRepository;

    @Transactional
    public Page<CollectionDTO> findAll(Pageable pageable) {
        return collectionRepository.findAll(pageable)
                .map(collectionMapper::toDTO);
    }

    @Transactional
    public Page<CollectionDTO> findAllByUserId(Pageable pageable, UUID userId, String name) {
        if (name != null && !name.trim().isEmpty()) {
            return collectionRepository.findAllByUserIdAndNameContainingIgnoreCase(pageable, userId, name)
                    .map(collectionMapper::toDTO);
        }
        return collectionRepository.findAllByUserId(pageable, userId)
                .map(collectionMapper::toDTO);
    }

    @Transactional
    public CollectionDTO findById(UUID id, UUID userId) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Collection not found"));
        
        if (!collection.getIsPublic() && !collection.getUserId().equals(userId)) {
            throw new ValidationException("You don't have permission to access this collection");
        }
        
        return collectionMapper.toDTO(collection); 
    }

    @Transactional
    public Page<CollectionDTO> findAllPublic(Pageable pageable, String name) {
        if(pageable == null) {
            pageable = Pageable.unpaged();
        }
        if (name != null && !name.trim().isEmpty()) {
            return collectionRepository.findAllByIsPublicTrueAndNameContainingIgnoreCase(pageable, name)
                    .map(collectionMapper::toDTO);
        }
        return collectionRepository.findAllByIsPublicTrue(pageable)
                .map(collectionMapper::toDTO);
    }

    @Transactional
    public CollectionDTO create(CreateCollectionRequest request, UUID userId) {
        if (userId == null) {
            throw new ValidationException("You must be logged in to create a collection");
        }

        if (!userRepository.existsById(userId)) {
            throw new ValidationException("User not found");
        }

        if (collectionRepository.existsByNameAndUserId(request.getName(), userId)) {
            throw new ConflictException("Collection with the same name already exists for this user");
        }
        
        Collection collection = collectionMapper.toEntity(request);
        collection.setUserId(userId);
        Collection savedCollection = collectionRepository.save(collection);
        return collectionMapper.toDTO(savedCollection);
    }

    @Transactional
    public CollectionDTO update(UUID id, UpdateCollectionRequest request, UUID userId) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Collection not found"));
        
        if (!collection.getUserId().equals(userId)) {
            throw new ValidationException("You don't have permission to update this collection");
        }
        
        if (collectionRepository.existsByNameAndUserId(request.getName(), userId) 
                && !collection.getName().equals(request.getName())) {
            throw new ValidationException("Collection with the same name already exists for this user");
        }

        collection.setName(request.getName());
        collection.setDescription(request.getDescription());
        collection.setCollectionType(request.getCollectionType());
        collection.setIsPublic(request.getIsPublic());
        collection.setStatus(request.getStatus());

        Collection updatedCollection = collectionRepository.save(collection);
        return collectionMapper.toDTO(updatedCollection);
    }

    @Transactional
    public void delete(UUID id, UUID userId) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Collection not found"));
        
        if (!collection.getUserId().equals(userId)) {
            throw new ValidationException("You don't have permission to delete this collection");
        }
        
        collectionRepository.delete(collection);
    }

    @Transactional
    public CollectionDTO getLastEditedCollection(UUID userId) {
        Collection collection = collectionRepository.findFirstByUserIdAndActiveTrueOrderByUpdatedAtDesc(userId)
                .orElseThrow(() -> new ResourceNotFoundException("No active collections found for this user"));
        return collectionMapper.toDTO(collection);
    }

}
