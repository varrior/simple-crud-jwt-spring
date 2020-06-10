package pl.edu.gda.simple_crud_app.service.exception;

public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String message){
        super(message);
    }
}
