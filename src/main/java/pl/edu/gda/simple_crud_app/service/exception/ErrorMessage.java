package pl.edu.gda.simple_crud_app.service.exception;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.Map;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class ErrorMessage {

    private static JSONObject buildJson(String message, Map<String, Object> details) {
        JSONObject json = new JSONObject();

        return json.put("timestamp", new Timestamp(System.currentTimeMillis()))
                .put("message", message)
                .put("details", details);
    }

    public static ResponseEntity<String> buildResponse(HttpStatus httpStatus, String message, Map<String, Object> details) {

        return ResponseEntity.status(httpStatus)
                .contentType(MediaType.APPLICATION_JSON)
                .body(buildJson(message, details).toString());
    }
}

