package pl.edu.gda.simple_crud_app.service.exception;

import org.springframework.security.core.AuthenticationException;

public class UserNotActivatedException extends AuthenticationException {
    public UserNotActivatedException(String message){
        super(message);
    }
}
