package com.lykawka.collectr.app.controller.item;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lykawka.collectr.app.dto.item.CreateItemRequest;
import com.lykawka.collectr.app.dto.item.ItemDTO;
import com.lykawka.collectr.app.dto.item.UpdateItemRequest;
import com.lykawka.collectr.app.service.item.IItemService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@Tag(name = "Items")
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    private final IItemService itemService;

    @PostMapping()
    public ResponseEntity<ItemDTO> create(
            @Valid @RequestBody CreateItemRequest request,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        ItemDTO created = itemService.createItem(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @GetMapping("/collection/{collectionId}")
    public ResponseEntity<Page<ItemDTO>> findByCollectionId(
            @PathVariable Long collectionId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.ok(itemService.getItemsByCollectionId(
                org.springframework.data.domain.PageRequest.of(page, size), collectionId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateItemRequest request,
            HttpServletRequest httpRequest) {
        return ResponseEntity.ok(itemService.updateItem(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
