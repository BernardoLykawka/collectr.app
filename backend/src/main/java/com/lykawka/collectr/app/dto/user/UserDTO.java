package com.lykawka.collectr.app.dto.user;

import com.lykawka.collectr.app.model.user.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    
    private Long id;
    private String email;
    private String nickname;
    private UserRole role;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
