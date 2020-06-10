package pl.edu.gda.simple_crud_app.security.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@EqualsAndHashCode()
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(name = "Users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name="firstname")
    @NotBlank(message = "First name is required")
    private String firstName;

    @Column(name="lastname")
    @NotBlank(message = "Last name is required")
    private String lastName;

    @Column(name="username")
    @NotBlank(message = "Username is required")
    private String username;

    @Column(name="email")
    @NotBlank(message = "Email address is required")
    private String email;

    @Column(name="password")
    @NotBlank (message = "Password is required")
    private String password;

    @Transient
    @NotBlank(message = "You must confirm password")
    private String confirmPassword;

    @Column(name="active")
    @NotNull
    private Boolean active = true;

    @Column(name="permission")
    @NotBlank
    private String permission = "USER";

    public User(long id, @NotBlank(message = "First name is required") String firstName, @NotBlank(message = "Last name is required") String lastName, @NotBlank(message = "Username is required") String username, @NotBlank(message = "Email address is required") String email, @NotBlank(message = "Password is required") String password, @NotNull Boolean active, @NotBlank String permission) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.active = active;
        this.permission = permission;
    }
}
