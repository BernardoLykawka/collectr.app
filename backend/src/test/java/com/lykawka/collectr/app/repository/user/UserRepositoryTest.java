package com.lykawka.collectr.app.repository.user;

import com.lykawka.collectr.app.model.user.User;
import com.lykawka.collectr.app.model.user.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ActiveProfiles("test")
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
        
        user = User.builder()
                .email("test@example.com")
                .password("encodedPassword")
                .nickname("Test User")
                .role(UserRole.USER)
                .build();
    }

    @Test
    void findByEmail_WhenUserExists_ShouldReturnUser() {
        userRepository.save(user);

        Optional<User> found = userRepository.findByEmail("test@example.com");

        assertTrue(found.isPresent());
        assertEquals(user.getEmail(), found.get().getEmail());
        assertEquals(user.getNickname(), found.get().getNickname());
    }

    @Test
    void findByEmail_WhenUserNotExists_ShouldReturnEmpty() {
        Optional<User> found = userRepository.findByEmail("nonexistent@example.com");

        assertFalse(found.isPresent());
    }

    @Test
    void existsByEmail_WhenUserExists_ShouldReturnTrue() {
        userRepository.save(user);

        boolean exists = userRepository.existsByEmail("test@example.com");

        assertTrue(exists);
    }

    @Test
    void existsByEmail_WhenUserNotExists_ShouldReturnFalse() {
        boolean exists = userRepository.existsByEmail("nonexistent@example.com");

        assertFalse(exists);
    }

    @Test
    void save_ShouldPersistUser() {
        User savedUser = userRepository.save(user);

        assertNotNull(savedUser.getId());
        assertEquals(user.getEmail(), savedUser.getEmail());
        assertEquals(user.getNickname(), savedUser.getNickname());
        assertEquals(user.getRole(), savedUser.getRole());
        assertTrue(savedUser.getActive());
    }

    @Test
    void delete_ShouldRemoveUser() {
        User savedUser = userRepository.save(user);
        UUID userId = savedUser.getId();

        userRepository.deleteById(userId);

        Optional<User> found = userRepository.findById(userId);
        assertFalse(found.isPresent());
    }

    @Test
    void findById_WhenUserExists_ShouldReturnUser() {
        User savedUser = userRepository.save(user);
        UUID userId = savedUser.getId();

        Optional<User> found = userRepository.findById(userId);

        assertTrue(found.isPresent());
        assertEquals(userId, found.get().getId());
    }

    @Test
    void update_ShouldUpdateUserData() {
        User savedUser = userRepository.save(user);

        savedUser.setNickname("Updated Name");
        savedUser.setActive(false);
        User updatedUser = userRepository.save(savedUser);

        assertEquals("Updated Name", updatedUser.getNickname());
        assertFalse(updatedUser.getActive());
    }
}
