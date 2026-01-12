package com.lykawka.collectr.app.service.user;

import com.lykawka.collectr.app.dto.user.CreateUserRequest;
import com.lykawka.collectr.app.dto.user.UpdateUserRequest;
import com.lykawka.collectr.app.dto.user.UserDTO;
import com.lykawka.collectr.app.exception.ResourceNotFoundException;
import com.lykawka.collectr.app.exception.ValidationException;
import com.lykawka.collectr.app.mapper.user.UserMapper;
import com.lykawka.collectr.app.model.user.User;
import com.lykawka.collectr.app.model.user.UserRole;
import com.lykawka.collectr.app.repository.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User user;
    private UserDTO userDTO;
    private CreateUserRequest createUserRequest;
    private UpdateUserRequest updateUserRequest;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .email("test@example.com")
                .password("encodedPassword")
                .nickname("Test User")
                .role(UserRole.USER)
                .active(true)
                .build();
        user.setId(1L);

        userDTO = UserDTO.builder()
                .id(1L)
                .email("test@example.com")
                .nickname("Test User")
                .role(UserRole.USER)
                .active(true)
                .build();

        createUserRequest = CreateUserRequest.builder()
                .email("test@example.com")
                .password("password123")
                .nickname("Test User")
                .role(UserRole.USER)
                .build();

        updateUserRequest = UpdateUserRequest.builder()
                .nickname("Updated Name")
                .active(true)
                .build();
    }

    @Test
    void findAll_ShouldReturnPageOfUsers() {
        // Arrange
        Pageable pageable = PageRequest.of(0, 10);
        Page<User> userPage = new PageImpl<>(List.of(user));
        when(userRepository.findAll(pageable)).thenReturn(userPage);
        when(userMapper.toDTO(user)).thenReturn(userDTO);

        // Act
        Page<UserDTO> result = userService.findAll(pageable);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals(userDTO, result.getContent().get(0));
        verify(userRepository).findAll(pageable);
    }

    @Test
    void findById_WhenUserExists_ShouldReturnUserDTO() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userMapper.toDTO(user)).thenReturn(userDTO);

        // Act
        UserDTO result = userService.findById(1L);

        // Assert
        assertNotNull(result);
        assertEquals(userDTO, result);
        verify(userRepository).findById(1L);
    }

    @Test
    void findById_WhenUserNotExists_ShouldThrowResourceNotFoundException() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> userService.findById(1L));
        verify(userRepository).findById(1L);
    }

    @Test
    void findByEmail_WhenUserExists_ShouldReturnUserDTO() {
        // Arrange
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(userMapper.toDTO(user)).thenReturn(userDTO);

        // Act
        UserDTO result = userService.findByEmail("test@example.com");

        // Assert
        assertNotNull(result);
        assertEquals(userDTO, result);
        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    void findByEmail_WhenUserNotExists_ShouldThrowResourceNotFoundException() {
        // Arrange
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, 
            () -> userService.findByEmail("test@example.com"));
        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    void create_WhenEmailNotExists_ShouldCreateUser() {
        // Arrange
        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(userMapper.toEntity(createUserRequest)).thenReturn(user);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userMapper.toDTO(user)).thenReturn(userDTO);

        // Act
        UserDTO result = userService.create(createUserRequest);

        // Assert
        assertNotNull(result);
        assertEquals(userDTO, result);
        verify(userRepository).existsByEmail("test@example.com");
        verify(passwordEncoder).encode("password123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void create_WhenEmailExists_ShouldThrowValidationException() {
        // Arrange
        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        // Act & Assert
        assertThrows(ValidationException.class, () -> userService.create(createUserRequest));
        verify(userRepository).existsByEmail("test@example.com");
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void update_WhenUserExists_ShouldUpdateUser() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(user)).thenReturn(user);
        when(userMapper.toDTO(user)).thenReturn(userDTO);

        // Act
        UserDTO result = userService.update(1L, updateUserRequest);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Name", user.getNickname());
        verify(userRepository).findById(1L);
        verify(userRepository).save(user);
    }

    @Test
    void update_WhenUserNotExists_ShouldThrowResourceNotFoundException() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, 
            () -> userService.update(1L, updateUserRequest));
        verify(userRepository).findById(1L);
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void delete_WhenUserExists_ShouldDeleteUser() {
        // Arrange
        when(userRepository.existsById(1L)).thenReturn(true);

        // Act
        userService.delete(1L);

        // Assert
        verify(userRepository).existsById(1L);
        verify(userRepository).deleteById(1L);
    }

    @Test
    void delete_WhenUserNotExists_ShouldThrowResourceNotFoundException() {
        // Arrange
        when(userRepository.existsById(1L)).thenReturn(false);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> userService.delete(1L));
        verify(userRepository).existsById(1L);
        verify(userRepository, never()).deleteById(anyLong());
    }
}
