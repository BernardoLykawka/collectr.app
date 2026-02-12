package com.lykawka.collectr.app.controller.user;

import com.lykawka.collectr.app.dto.user.AuthResponse;
import com.lykawka.collectr.app.dto.user.CreateUserRequest;
import com.lykawka.collectr.app.dto.user.LoginRequest;
import com.lykawka.collectr.app.dto.user.UpdateUserRequest;
import com.lykawka.collectr.app.dto.user.UserDTO;
import com.lykawka.collectr.app.service.user.IUserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
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
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAll(
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
        UserDTO user = userService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);
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
            @Parameter(description = "User email", example = "example@email.com")
            @PathVariable String email) {
        UserDTO user = userService.findByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(user);
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
        required = true,
        content = @Content(
            examples = {
                @ExampleObject(
                    name = "Default",
                    summary = "Example user",
                    value = "{ \"email\": \"example@email.com\", \"password\": \"Abcd1234\", \"nickname\": \"Example Name\", \"role\": \"USER\" }"
                )
            }
        )
    )
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
        required = true,
        content = @Content(
            examples = {
                @ExampleObject(
                    name = "Default",
                    summary = "Example user",
                    value = "{ \"nickname\": \"Example Name Updated\" }"
                )
            }
        )
    )
    public ResponseEntity<UserDTO> update(
            @Parameter(description = "User id", example = "1")
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        UserDTO updated = userService.update(id, request);
        return ResponseEntity.status(HttpStatus.OK).body(updated);
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
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
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
        required = true,
        content = @Content(
            examples = {
                @ExampleObject(
                    name = "Default",
                    summary = "Example user",
                    value = "{ \"email\": \"example@email.com\", \"password\": \"Abcd1234\" }"
                )
            }
        )
    )
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = userService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}