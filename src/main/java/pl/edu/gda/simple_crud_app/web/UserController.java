package pl.edu.gda.simple_crud_app.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import pl.edu.gda.simple_crud_app.security.model.User;
import pl.edu.gda.simple_crud_app.service.UserService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
    @Autowired
    public UserService userService;

    @GetMapping("*")
    public ModelAndView defaultPage(Map<String, Object> model){
        System.out.println("Kaszanka");

        return new ModelAndView("index", model);
    }

    @GetMapping("/list/{id}")
    @ResponseBody
    public ResponseEntity<List<Object>> getUsers(@PathVariable("id") long id) {
        List<Object> userList = userService.getUsers(id);

        return ResponseEntity.ok(userList);
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<User> getUserById(@PathVariable("id") long id){
        User user = userService.getUserById(id);

        return ResponseEntity.ok(user);
    }
    @PostMapping
    @ResponseBody
    public ResponseEntity<Object> createNewUser(@Valid @RequestBody User user){
        userService.createNewUser(user);

        Map <String, Object> response = new LinkedHashMap<>();

        response.put("success", true);
        response.put("message", "Thank you for registration, you have successfully created an account!");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PostMapping("/checkusername")
    @ResponseBody
    public ResponseEntity<Object> checkUsername(@RequestBody ArrayList<String> username){
        Map<String, Object> response = new LinkedHashMap<>();
        Boolean isUsernameOccupied = userService.checkUsername(username.get(0)).isPresent();

        if(isUsernameOccupied){
            response.put("success", false);
        } else {
            response.put("success", true);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @PostMapping("/checkemail")
    @ResponseBody
    public ResponseEntity<Object> checkEmail(@RequestBody ArrayList<String> email){
        Map<String, Object> response = new LinkedHashMap<>();
        Boolean isEmailOccupied = userService.checkEmail(email.get(0)).isPresent();

        if(isEmailOccupied){
            response.put("success", false);
        } else {
            response.put("success", true);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping("/me")
    @ResponseBody
    public ResponseEntity<Object> getActualUser(){
        Map<String, Object> response = new LinkedHashMap<>();
        if(userService.getUserWithAuthorities().isPresent()){
            response.put("success", true);
            response.put("id", userService.getUserWithAuthorities().get().getId());
            response.put("email", userService.getUserWithAuthorities().get().getEmail());
            response.put("permission", userService.getUserWithAuthorities().get().getPermission());
            response.put("username", userService.getUserWithAuthorities().get().getUsername());
            response.put("firstName", userService.getUserWithAuthorities().get().getFirstName());
            response.put("lastName", userService.getUserWithAuthorities().get().getLastName());
        } else {
            response.put("success", false);
            response.put("message", "User not found");
        }
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/{id}")
    @ResponseBody
    public ResponseEntity<Object> updateUser(@RequestBody User user, @PathVariable("id") long id){
        ResponseEntity<Object> response = userService.updateUser(user, id);

        return response;
    }
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Object> deleteUserById(@PathVariable("id") long id){
        Map<String, Object> response = new LinkedHashMap<>();

        userService.deleteUser(id);
        response.put("success", true);
        response.put("message", "User has been removed!");
        return ResponseEntity.ok(response);
    }
}