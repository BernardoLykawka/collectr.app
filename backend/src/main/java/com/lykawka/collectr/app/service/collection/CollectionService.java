package com.lykawka.collectr.app.service.collection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.lykawka.collectr.app.dto.collection.CollectionDTO;
import com.lykawka.collectr.app.dto.collection.CreateCollectionRequest;
import com.lykawka.collectr.app.dto.collection.UpdateCollectionRequest;
import com.lykawka.collectr.app.exception.ResourceNotFoundException;
import com.lykawka.collectr.app.exception.ValidationException;
import com.lykawka.collectr.app.mapper.collection.CollectionMapper;
import com.lykawka.collectr.app.model.collection.Collection;
import com.lykawka.collectr.app.repository.collection.CollectionRepository;
import com.lykawka.collectr.app.repository.user.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

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
    public Page<CollectionDTO> findAllByUserId(Pageable pageable, Long userId) {
        return collectionRepository.findAllByUserId(pageable, userId)
                .map(collectionMapper::toDTO);
    }

    @Transactional
    public CollectionDTO findById(Long id, Long userId) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Collection not found"));
        
        if (!collection.getIsPublic() && !collection.getUserId().equals(userId)) {
            throw new ValidationException("You don't have permission to access this collection");
        }
        
        return collectionMapper.toDTO(collection); 
    }

    @Transactional
    public Page<CollectionDTO> findAllPublic(Pageable pageable) {
        if(pageable == null) {
            pageable = Pageable.unpaged();
        }
        return collectionRepository.findAllByIsPublicTrue(pageable)
                .map(collectionMapper::toDTO);
    }

    @Transactional
    public CollectionDTO create(CreateCollectionRequest request, Long userId) {
        if (userId == null) {
            throw new ValidationException("You must be logged in to create a collection");
        }

        if (!userRepository.existsById(userId)) {
            throw new ValidationException("User not found");
        }

        if (collectionRepository.existsByNameAndUserId(request.getName(), userId)) {
            throw new ValidationException("Collection with the same name already exists for this user");
        }
        
        Collection collection = collectionMapper.toEntity(request);
        collection.setUserId(userId);
        Collection savedCollection = collectionRepository.save(collection);
        return collectionMapper.toDTO(savedCollection);
    }

    @Transactional
    public CollectionDTO update(Long id, UpdateCollectionRequest request, Long userId) {
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
    public void delete(Long id, Long userId) {
        Collection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Collection not found"));
        
        if (!collection.getUserId().equals(userId)) {
            throw new ValidationException("You don't have permission to delete this collection");
        }
        
        collection.setActive(false);
        collectionRepository.save(collection);
    }

}
