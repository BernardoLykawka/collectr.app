package com.lykawka.collectr.app.repository.collection;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lykawka.collectr.app.model.collection.Collection;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, UUID> {

    @EntityGraph(value = "Collection.user", type = EntityGraph.EntityGraphType.FETCH)
    Page<Collection> findAllByUserId(Pageable pageable, UUID userId);

    @EntityGraph(value = "Collection.user", type = EntityGraph.EntityGraphType.FETCH)
    Page<Collection> findAllByUserIdAndNameContainingIgnoreCase(Pageable pageable, UUID userId, String name);

    @EntityGraph(value = "Collection.user", type = EntityGraph.EntityGraphType.FETCH)
    Page<Collection> findAllByIsPublicTrue(Pageable pageable);

    @EntityGraph(value = "Collection.user", type = EntityGraph.EntityGraphType.FETCH)
    Page<Collection> findAllByIsPublicTrueAndNameContainingIgnoreCase(Pageable pageable, String name);

    boolean existsByNameAndUserId(String name, UUID userId);

    @EntityGraph(value = "Collection.user", type = EntityGraph.EntityGraphType.FETCH)
    Optional<Collection> findFirstByUserIdAndActiveTrueOrderByUpdatedAtDesc(UUID userId);
    
}