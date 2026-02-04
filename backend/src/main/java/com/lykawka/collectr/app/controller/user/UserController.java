package com.lykawka.collectr.app.controller.user;

import com.lykawka.collectr.app.dto.user.AuthResponse;
import com.lykawka.collectr.app.dto.user.CreateUserRequest;
import com.lykawka.collectr.app.dto.user.LoginRequest;
import com.lykawka.collectr.app.dto.user.UpdateUserRequest;
import com.lykawka.collectr.app.dto.user.UserDTO;
import com.lykawka.collectr.app.service.user.IUserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Users")
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final IUserService userService;

    @GetMapping
        @Operation(
            summary = "List users",
            description = "Returns a paginated list of users.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid pagination parameters")
        })
    public ResponseEntity<Page<UserDTO>> findAll(
            @Parameter(description = "Page number (0-based)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size", example = "6")
            @RequestParam(defaultValue = "6") int size) {
        return ResponseEntity.ok(userService.findAll(
                org.springframework.data.domain.PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
        @Operation(
            summary = "Get user by id",
            description = "Returns a single user by its id.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User found"),
            @ApiResponse(responseCode = "404", description = "User not found")
        })
    public ResponseEntity<UserDTO> findById(
            @Parameter(description = "User id", example = "1")
            @PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/email/{email}")
        @Operation(
            summary = "Get user by email",
            description = "Returns a single user by its email address.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User found"),
            @ApiResponse(responseCode = "404", description = "User not found")
        })
    public ResponseEntity<UserDTO> findByEmail(
            @Parameter(description = "User email", example = "user@email.com")
            @PathVariable String email) {
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @PostMapping
        @Operation(
            summary = "Create user",
            description = "Creates a new user account.")
        @ApiResponses({
            @ApiResponse(responseCode = "201", description = "User created"),
            @ApiResponse(responseCode = "400", description = "Validation error"),
            @ApiResponse(responseCode = "409", description = "Email already registered")
        })
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "User data required to create the account",
            required = true)
    public ResponseEntity<UserDTO> create(@Valid @RequestBody CreateUserRequest request) {
        UserDTO created = userService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
        @Operation(
            summary = "Update user",
            description = "Updates user profile data by id.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User updated"),
            @ApiResponse(responseCode = "400", description = "Validation error"),
            @ApiResponse(responseCode = "404", description = "User not found")
        })
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "User fields to update",
            required = true)
    public ResponseEntity<UserDTO> update(
            @Parameter(description = "User id", example = "1")
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        return ResponseEntity.ok(userService.update(id, request));
    }

    @DeleteMapping("/{id}")
        @Operation(
            summary = "Delete user",
            description = "Deletes a user by id.")
        @ApiResponses({
            @ApiResponse(responseCode = "204", description = "User deleted"),
            @ApiResponse(responseCode = "404", description = "User not found")
        })
    public ResponseEntity<Void> delete(
            @Parameter(description = "User id", example = "1")
            @PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
        @Operation(
            summary = "Login",
            description = "Authenticates a user and returns a JWT token.")
        @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Login successful"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials")
        })
        @io.swagger.v3.oas.annotations.parameters.RequestBody(
            description = "User credentials",
            required = true)
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(response);
    }
}