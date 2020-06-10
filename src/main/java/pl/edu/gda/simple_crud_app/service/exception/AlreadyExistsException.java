package pl.edu.gda.simple_crud_app.service.exception;

public class AlreadyExistsException extends RuntimeException {
    public AlreadyExistsException(String message){
        super(message);
    }
}
