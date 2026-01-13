package com.lykawka.collectr.app.controller.collection;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lykawka.collectr.app.dto.collection.CollectionDTO;
import com.lykawka.collectr.app.dto.collection.CreateCollectionRequest;
import com.lykawka.collectr.app.dto.collection.UpdateCollectionRequest;
import com.lykawka.collectr.app.service.collection.CollectionService;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@Tag(name = "Collections")
@RequestMapping("/api/collections")
@RequiredArgsConstructor
public class CollectionController {
    private final CollectionService collectionService;

    @PostMapping()
    public ResponseEntity<CollectionDTO> create(
            @Valid @RequestBody CreateCollectionRequest request,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        return ResponseEntity.ok(collectionService.create(request, userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionDTO> findById(
            @PathVariable Long id,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        return ResponseEntity.ok(collectionService.findById(id, userId));
    }

    @GetMapping()
    public ResponseEntity<Page<CollectionDTO>> findAllPublic(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.ok(collectionService.findAllPublic(
                org.springframework.data.domain.PageRequest.of(page, size)));
    }

    @GetMapping("/my")
    public ResponseEntity<Page<CollectionDTO>> findMyCollections(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        return ResponseEntity.ok(collectionService.findAllByUserId(
                org.springframework.data.domain.PageRequest.of(page, size), userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CollectionDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateCollectionRequest request,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        return ResponseEntity.ok(collectionService.update(id, request, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        collectionService.delete(id, userId);
        return ResponseEntity.noContent().build();
    }
}