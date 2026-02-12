package com.lykawka.collectr.app.model.collection;


import com.lykawka.collectr.app.model.BaseEntity;
import com.lykawka.collectr.app.model.user.User;

import jakarta.persistence.*;
import lombok.*;

@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@Table(name = "collections")
@NamedEntityGraph(name = "Collection.user", attributeNodes = @NamedAttributeNode("user"))
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Collection extends BaseEntity {
    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Boolean isPublic;

    @Column(nullable = false)
    private Integer status;

    @Enumerated(EnumType.STRING)
    private CollectionType collectionType;

    @Column(nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User user;
}
