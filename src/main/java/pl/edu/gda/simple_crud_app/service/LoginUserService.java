package pl.edu.gda.simple_crud_app.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.gda.simple_crud_app.security.model.User;
import pl.edu.gda.simple_crud_app.service.exception.UserNotActivatedException;

import java.util.ArrayList;
import java.util.List;

@Component("userDetailsService")
public class LoginUserService implements UserDetailsService {
    private final Logger log = LoggerFactory.getLogger(LoginUserService.class);
    private final UserRepository userRepository;

    public LoginUserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String login){
        log.debug("Authenticating user '{}'", login);

        return userRepository.findByEmail(login)
                .map(user -> createSpringSecurityUser(login, user))
                .orElseThrow(() -> new UsernameNotFoundException("User " + login + " was not found in the database"));

    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, User user){
        if(!user.getActive()){
            throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
        }

        List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        grantedAuthorities.add(new SimpleGrantedAuthority(user.getPermission()));

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), grantedAuthorities);
    }

}
