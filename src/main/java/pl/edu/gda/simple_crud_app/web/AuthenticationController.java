package pl.edu.gda.simple_crud_app.web;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.gda.simple_crud_app.security.jwt.JWTFilter;
import pl.edu.gda.simple_crud_app.security.jwt.TokenProvider;
import pl.edu.gda.simple_crud_app.security.model.LoginUser;

import javax.validation.Valid;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthenticationController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder){
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<Object> authorize(@Valid @RequestBody LoginUser loginUser){
        Map<String, Object> response = new LinkedHashMap<>();

        UsernamePasswordAuthenticationToken authenticationToken =  new UsernamePasswordAuthenticationToken(loginUser.getEmail(), loginUser.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        boolean rememberMe = (loginUser.getRememberMe() == null) ? false : loginUser.getRememberMe();
        String jwt = tokenProvider.createToken(authentication, rememberMe);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        response.put("success", true);
        response.put("message", "Token provided correctly");
        response.put("token", new JWTToken(jwt).getIdToken());

        return ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(response);
    }

    static class JWTToken {
        private String idToken;

        JWTToken(String idToken){
            this.idToken = idToken;
        }

        @JsonProperty("token")
        String getIdToken(){
            return idToken;
        }
        void setIdToken(String idToken){
            this.idToken = idToken;
        }
    }
}

