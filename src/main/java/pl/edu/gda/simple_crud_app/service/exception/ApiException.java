package pl.edu.gda.simple_crud_app.service.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.util.stream.Collectors;

@ControllerAdvice
public class ApiException extends ResponseEntityExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public final ResponseEntity<String> handleNotFound(NotFoundException e, WebRequest request) {
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("message", e.getLocalizedMessage());

        return ErrorMessage.buildResponse(HttpStatus.NOT_FOUND, "Resource not found", details);
    }

    @ExceptionHandler(AlreadyExistsException.class)
    public final ResponseEntity<String> handleAlreadyExists(AlreadyExistsException e, WebRequest request) {
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("message", e.getLocalizedMessage());

        return ErrorMessage.buildResponse(HttpStatus.CONFLICT, "Resource already exists", details);
    }
    @ExceptionHandler(AuthenticationException.class)
    public final ResponseEntity<String> handleAuthentication(AuthenticationException e, WebRequest request) {
        Map<String, Object> details = new LinkedHashMap<>();
        details.put("message", e.getLocalizedMessage());

        return ErrorMessage.buildResponse(HttpStatus.CONFLICT, "Authentication failed", details);
    }
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException e, HttpHeaders headers, HttpStatus status, WebRequest request) {

        Map<String, Object> body = new LinkedHashMap<>();
        Map<String, Object> errorMessages = new LinkedHashMap<>();
        body.put("timestamp", new Date());
        body.put("status", status.value());

        //Get all errors
        List<String> details = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(x -> x.getDefaultMessage())
                .collect(Collectors.toList());
        errorMessages.put("messages", details);

        body.put("details", errorMessages);

        return new ResponseEntity<>(body, headers, status);

    }
}
