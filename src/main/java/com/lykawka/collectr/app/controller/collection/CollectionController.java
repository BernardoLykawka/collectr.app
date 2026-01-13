package com.lykawka.collectr.app.controller.collection;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lykawka.collectr.app.dto.collection.CollectionDTO;
import com.lykawka.collectr.app.dto.collection.CreateCollectionRequest;
import com.lykawka.collectr.app.dto.collection.UpdateCollectionRequest;
import com.lykawka.collectr.app.service.collection.CollectionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/collections")
@RequiredArgsConstructor
public class CollectionController {
    private final CollectionService collectionService;

    @PostMapping()
    public ResponseEntity<CollectionDTO> create(@RequestBody CreateCollectionRequest request) {
        return ResponseEntity.ok(collectionService.create(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CollectionDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(collectionService.findById(id));
    }

    @GetMapping()
    public ResponseEntity<?> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.ok(collectionService.findAll(
                org.springframework.data.domain.PageRequest.of(page, size)));
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<?> findAllByUserId(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.ok(collectionService.findAllByUserId(
                org.springframework.data.domain.PageRequest.of(page, size), userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CollectionDTO> update(
            @PathVariable Long id,
            @RequestBody UpdateCollectionRequest request) {
        return ResponseEntity.ok(collectionService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        collectionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}