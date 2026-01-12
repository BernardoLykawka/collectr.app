package com.lykawka.collectr.app.controller.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lykawka.collectr.app.dto.user.CreateUserRequest;
import com.lykawka.collectr.app.dto.user.UpdateUserRequest;
import com.lykawka.collectr.app.dto.user.UserDTO;
import com.lykawka.collectr.app.exception.GlobalExceptionHandler;
import com.lykawka.collectr.app.exception.ResourceNotFoundException;
import com.lykawka.collectr.app.model.user.UserRole;
import com.lykawka.collectr.app.service.user.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    private MockMvc mockMvc;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private UserService userService;

    private UserController userController;

    private UserDTO userDTO;
    private CreateUserRequest createUserRequest;
    private UpdateUserRequest updateUserRequest;

    @BeforeEach
    void setUp() {
        userController = new UserController(userService);
        mockMvc = MockMvcBuilders.standaloneSetup(userController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
        
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
    void findById_WhenUserExists_ShouldReturnUser() throws Exception {
        when(userService.findById(1L)).thenReturn(userDTO);

        mockMvc.perform(get("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));

        verify(userService).findById(1L);
    }

    @Test
    void findById_WhenUserNotExists_ShouldReturn404() throws Exception {
        when(userService.findById(1L)).thenThrow(new ResourceNotFoundException("User not found"));

        mockMvc.perform(get("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        verify(userService).findById(1L);
    }

    @Test
    void create_WithValidData_ShouldCreateUser() throws Exception {
        when(userService.create(any(CreateUserRequest.class))).thenReturn(userDTO);

        mockMvc.perform(post("/api/users")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(createUserRequest)))
                .andExpect(status().isCreated());

        verify(userService).create(any(CreateUserRequest.class));
    }

    @Test
    void delete_WhenUserExists_ShouldDeleteUser() throws Exception {
        doNothing().when(userService).delete(1L);

        mockMvc.perform(delete("/api/users/1")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        verify(userService).delete(1L);
    }
}
