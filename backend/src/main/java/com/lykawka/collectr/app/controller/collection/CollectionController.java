package com.lykawka.collectr.app.controller.collection;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lykawka.collectr.app.dto.collection.CollectionDTO;
import com.lykawka.collectr.app.dto.collection.CreateCollectionRequest;
import com.lykawka.collectr.app.dto.collection.UpdateCollectionRequest;
import com.lykawka.collectr.app.service.collection.CollectionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
        @Operation(
            summary = "Create collection",
            description = "Creates a new collection for the authenticated user.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Collection created"),
            @ApiResponse(responseCode = "400", description = "Validation error"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
        })
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Collection data",
            required = true)
    public ResponseEntity<CollectionDTO> create(
            @Valid @RequestBody CreateCollectionRequest request,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        return ResponseEntity.ok(collectionService.create(request, userId));
    }

    @GetMapping("/{id}")
        @Operation(
            summary = "Get collection by id",
            description = "Returns a collection by id for the authenticated user.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Collection found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Collection not found")
        })
    public ResponseEntity<CollectionDTO> findById(
            @Parameter(description = "Collection id", example = "1")
            @PathVariable Long id,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        return ResponseEntity.ok(collectionService.findById(id, userId));
    }

    @GetMapping()
        @Operation(
            summary = "List public collections",
            description = "Returns a paginated list of public collections.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Collections retrieved successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid pagination parameters")
        })
    public ResponseEntity<Page<CollectionDTO>> findAllPublic(
            @Parameter(description = "Page number (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size", example = "6")
            @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.ok(collectionService.findAllPublic(
                org.springframework.data.domain.PageRequest.of(page, size)));
    }

    @GetMapping("/my")
        @Operation(
            summary = "List my collections",
            description = "Returns a paginated list of collections owned by the authenticated user.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Collections retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
        })
    public ResponseEntity<Page<CollectionDTO>> findMyCollections(
            @Parameter(description = "Page number (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size", example = "6")
            @RequestParam(defaultValue = "6") int size,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        return ResponseEntity.ok(collectionService.findAllByUserId(
                org.springframework.data.domain.PageRequest.of(page, size), userId));
    }

    @PutMapping("/{id}")
        @Operation(
            summary = "Update collection",
            description = "Updates a collection by id for the authenticated user.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Collection updated"),
            @ApiResponse(responseCode = "400", description = "Validation error"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Collection not found")
        })
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Collection fields to update",
            required = true)
    public ResponseEntity<CollectionDTO> update(
            @Parameter(description = "Collection id", example = "1")
            @PathVariable Long id,
            @Valid @RequestBody UpdateCollectionRequest request,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        return ResponseEntity.ok(collectionService.update(id, request, userId));
    }

    @DeleteMapping("/{id}")
        @Operation(
            summary = "Delete collection",
            description = "Deletes a collection by id for the authenticated user.")
        @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Collection deleted"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Collection not found")
        })
    public ResponseEntity<Void> delete(
            @Parameter(description = "Collection id", example = "1")
            @PathVariable Long id,
            HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        collectionService.delete(id, userId);
        return ResponseEntity.noContent().build();
    }
}