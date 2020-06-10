package pl.edu.gda.simple_crud_app.service.exception;

public class NotFoundException extends RuntimeException {
    public  NotFoundException(String message){
        super(message);
    }
}
