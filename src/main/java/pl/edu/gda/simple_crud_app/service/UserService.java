package pl.edu.gda.simple_crud_app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;
import pl.edu.gda.simple_crud_app.security.SecurityUtils;
import pl.edu.gda.simple_crud_app.security.model.User;
import pl.edu.gda.simple_crud_app.service.exception.AlreadyExistsException;
import pl.edu.gda.simple_crud_app.service.exception.AuthenticationException;
import pl.edu.gda.simple_crud_app.service.exception.NotFoundException;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class UserService {
    @Autowired
    private  UserRepository userRepository;

    public List<Object> getUsers(long id) {
        return userRepository.findAllUsers(id);
    }

    public User getUserById(long id){
        return  userRepository.findById(id).orElseThrow(()-> new NotFoundException(String.format("User with id=%s doesn't exists", id)));
    }
    @ResponseBody
    public void createNewUser(User user){
        String userEmail = user.getEmail();
        String username = user.getUsername();

        if(userRepository.findByEmail(userEmail).isPresent()){
            throw new AlreadyExistsException(String.format("User with email %s already exists", userEmail));
        } else if(userRepository.findByUsername(username).isPresent()){
            throw new AlreadyExistsException(String.format("User with username %s already exists", username));
        } else if(!user.getPassword().equals(user.getConfirmPassword())){
            throw new AuthenticationException(String.format("Passwords not match"));
        }
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

        userRepository.saveNewUser(user.getFirstName(), user.getLastName(), user.getUsername(), user.getEmail(), user.getPassword(), user.getActive(), user.getPermission());
    }
    @ResponseBody
    public ResponseEntity<Object> updateUser(User user, long id) {
        Map<String, Object> response = new LinkedHashMap<>();
        userRepository.updateUser(user.getFirstName(), user.getLastName(), user.getEmail(), user.getUsername(), id);

        response.put("success", true);
        response.put("message", "You have updated your data successfully!");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @ResponseBody
    public Optional<User> checkUsername(String username){
        return userRepository.findByUsername(username);
    }
    @ResponseBody
    public Optional<User> checkEmail(String email){
        return userRepository.findByEmail(email);
    }

    public void deleteUser (long id){
        userRepository.deleteUser(id);
    }

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(){
        return SecurityUtils.getCurrentUsername().flatMap(userRepository::findByEmail);
    }
}
