package com.lykawka.collectr.app.dto.user;

import com.lykawka.collectr.app.model.user.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email")
    private String email;

    @NotBlank(message = "Password is required")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$",
             message = "Password must be at least 8 characters long and include uppercase, lowercase, number")
    private String password;

    @NotBlank(message = "Nickname is required")
    private String nickname;

    @NotNull(message = "Role is required")
    private UserRole role;
}
