package com.lykawka.collectr.app.repository.collection;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lykawka.collectr.app.model.collection.Collection;

@Repository
public interface CollectionRepository extends JpaRepository<Collection, Long> {

    @EntityGraph(value = "Collection.user", type = EntityGraph.EntityGraphType.FETCH)
    Page<Collection> findAllByUserId(Pageable pageable, Long userId);

    @EntityGraph(value = "Collection.user", type = EntityGraph.EntityGraphType.FETCH)
    Page<Collection> findAllByIsPublicTrue(Pageable pageable);

    boolean existsByNameAndUserId(String name, Long userId);

    @EntityGraph(value = "Collection.user", type = EntityGraph.EntityGraphType.FETCH)
    Optional<Collection> findFirstByUserIdAndActiveTrueOrderByUpdatedAtDesc(Long userId);
    
}