package pl.edu.gda.simple_crud_app.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.edu.gda.simple_crud_app.security.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(
            value = "SELECT * FROM Users WHERE email=:email",
            nativeQuery = true
    )
    Optional<User> findByEmail(@Param("email") String email);

    @Query(
            value = "SELECT * FROM Users WHERE id=:id",
            nativeQuery = true
    )
    Optional<User> findById(@Param("id") long id);

    @Modifying
    @Query(
            value = "INSERT INTO Users (firstname, lastname, username, email, password, active, permission) VALUES (:firstname, :lastname, :username, :email, :password, :active, :permission)",
            nativeQuery = true
    )
    void saveNewUser(@Param("firstname") String firstName, @Param("lastname") String lastName, @Param("username") String username, @Param("email") String email, @Param("password") String password, @Param("active") boolean active, @Param("permission") String permission);

    @Query(
            value = "SELECT * FROM Users WHERE username=:username",
            nativeQuery = true
    )
    Optional<User> findByUsername(@Param("username") String username);

    @Query(
            value = "SELECT id, username, firstName, lastName, email FROM Users WHERE id != :id ORDER BY id ASC",
            nativeQuery = true
    )
    List<Object> findAllUsers(@Param("id") long id);

    @Modifying
    @Query(
            value = "UPDATE Users SET firstname=:firstName, lastname=:lastName, email=:email, username=:username WHERE id=:id",
            nativeQuery = true
    )
    void updateUser(@Param("firstName") String firstName, @Param("lastName") String lastName, @Param("email") String email, @Param("username") String username, @Param("id") long id);

    @Modifying
    @Query(
            value = "DELETE FROM Users WHERE id=:id",
            nativeQuery = true
    )
    void deleteUser(@Param("id") long id);
}
