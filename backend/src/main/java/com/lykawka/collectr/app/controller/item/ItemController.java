package com.lykawka.collectr.app.controller.item;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lykawka.collectr.app.dto.item.CreateItemRequest;
import com.lykawka.collectr.app.dto.item.ItemDTO;
import com.lykawka.collectr.app.dto.item.UpdateItemRequest;
import com.lykawka.collectr.app.service.item.IItemService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RestController
@Tag(name = "Items")
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {
    private final IItemService itemService;

    @PostMapping()
        @Operation(
            summary = "Create item",
            description = "Creates a new item inside a collection for the authenticated user.")
        @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Item created"),
            @ApiResponse(responseCode = "400", description = "Validation error"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
        })
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Item data",
            required = true,
            content = @Content(
                examples = {
                    @ExampleObject(
                        name = "Default",
                        summary = "Example item",
                        value = "{ \"name\": \"Example Coin\", \"description\": \"This is an example coin.\", \"collectionId\": 1, \"imageUrl\": \"https://www.londonmintoffice.org/images/stories/sn/kciii-gsk-fairmined-gold-layered-coin/X308_GSTK_NNA_2023_Primary_Webshop_Images_PPU.png\", \"manufacturer\": \"Example Brand\", \"releaseYear\": 1900, \"condition\": \"MINT\", \"situation\": \"OWNED\", \"purchasePrice\": 100.0, \"estimatedValue\": 150.0 }"
                    )
                }
            )
        )
    public ResponseEntity<ItemDTO> create(
            @Valid @RequestBody CreateItemRequest request,
            HttpServletRequest httpRequest) {
        UUID userId = (UUID) httpRequest.getAttribute("userId");
        ItemDTO created = itemService.createItem(request, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
        @Operation(
            summary = "Get item by id",
            description = "Returns an item by its id.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Item found"),
            @ApiResponse(responseCode = "404", description = "Item not found")
        })
    public ResponseEntity<ItemDTO> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }

    @GetMapping("/collection/{collectionId}")
        @Operation(
            summary = "List items by collection",
            description = "Returns a paginated list of items for a collection. Optionally filter by name.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Items retrieved successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid pagination parameters"),
            @ApiResponse(responseCode = "404", description = "Collection not found")
        })
    public ResponseEntity<Page<ItemDTO>> findByCollectionId(
            @Parameter(description = "Collection id", example = "550e8400-e29b-41d4-a716-446655440000")
            @PathVariable UUID collectionId,
            @Parameter(description = "Page number (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size", example = "6")
            @RequestParam(defaultValue = "6") int size,
            @Parameter(description = "Filter by item name (case-insensitive, partial match)", example = "rare")
            @RequestParam(required = false) String name) {
        return ResponseEntity.ok(itemService.getItemsByCollectionId(
                org.springframework.data.domain.PageRequest.of(page, size), collectionId, name));
    }

    @PutMapping("/{id}")
        @Operation(
            summary = "Update item",
            description = "Updates an item by id.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Item updated"),
            @ApiResponse(responseCode = "400", description = "Validation error"),
            @ApiResponse(responseCode = "401", description = "Unauthorized"),
            @ApiResponse(responseCode = "404", description = "Item not found")
        })
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "Item fields to update",
            required = true)
    public ResponseEntity<ItemDTO> update(
            @Parameter(description = "Item id", example = "550e8400-e29b-41d4-a716-446655440000")
            @PathVariable UUID id,
            @Valid @RequestBody UpdateItemRequest request,
            HttpServletRequest httpRequest) {
        return ResponseEntity.ok(itemService.updateItem(id, request));
    }

    @DeleteMapping("/{id}")
        @Operation(
            summary = "Delete item",
            description = "Deletes an item by id.")
        @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Item deleted"),
            @ApiResponse(responseCode = "404", description = "Item not found")
        })
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
