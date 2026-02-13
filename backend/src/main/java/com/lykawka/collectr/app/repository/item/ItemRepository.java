package com.lykawka.collectr.app.repository.item;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lykawka.collectr.app.model.item.Item;

import java.util.UUID;

@Repository
public interface ItemRepository extends JpaRepository<Item, UUID>{
    Page<Item> findAllByCollectionId(Pageable pageable, UUID collectionId);

}
