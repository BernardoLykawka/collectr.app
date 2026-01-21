package com.lykawka.collectr.app.model.item;

import com.lykawka.collectr.app.model.BaseEntity;
import com.lykawka.collectr.app.model.collection.Collection;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "items")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Item extends BaseEntity {

    @Column(nullable = false)
    private String name;

    private String description;

    private String manufacturer;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private ItemCondition condition;

    private Integer releaseYear;

    private Double estimatedValue;

    private Double purchasePrice;

    @Enumerated(EnumType.STRING)
    private ItemSituation situation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "collectionId", nullable = false)
    private Collection collection;
}