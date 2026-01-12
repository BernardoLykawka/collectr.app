package com.lykawka.collectr.app.model.user;

import com.lykawka.collectr.app.model.BaseEntity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "users")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(nullable = false)
    @Builder.Default
    private Boolean active = true;
}
