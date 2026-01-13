package com.lykawka.collectr.app.dto.collection;
    import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.lykawka.collectr.app.model.collection.CollectionType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CollectionDTO {
    
    private Long id;
    private Long userId;
    private String name;
    private String description;
    private Boolean isPublic;
    private Integer status;
    private CollectionType collectionType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean active;
}

