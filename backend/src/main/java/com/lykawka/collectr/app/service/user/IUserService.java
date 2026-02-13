package com.lykawka.collectr.app.service.user;

import com.lykawka.collectr.app.dto.user.AuthResponse;
import com.lykawka.collectr.app.dto.user.CreateUserRequest;
import com.lykawka.collectr.app.dto.user.UpdateUserRequest;
import com.lykawka.collectr.app.dto.user.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface IUserService {
    
    Page<UserDTO> findAll(Pageable pageable);
    
    UserDTO findById(UUID id);
    
    UserDTO findByEmail(String email);
    
    UserDTO create(CreateUserRequest request);
    
    UserDTO update(UUID id, UpdateUserRequest request);
    
    void delete(UUID id);
    
    AuthResponse login(String email, String password);
    
    UserDTO getCurrentUser(UUID userId);
}
