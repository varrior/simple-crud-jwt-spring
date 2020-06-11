package pl.edu.gda.simple_crud_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;
import pl.edu.gda.simple_crud_app.security.JWTAccessDeniedHandler;
import pl.edu.gda.simple_crud_app.security.JWTAuthenticationEntryPoint;
import pl.edu.gda.simple_crud_app.security.jwt.JWTConfigurer;
import pl.edu.gda.simple_crud_app.security.jwt.TokenProvider;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final CorsFilter corsFilter;
    private final JWTAuthenticationEntryPoint authenticationEntryPoint;
    private final JWTAccessDeniedHandler jwtAccessDeniedHandler;

    public WebSecurityConfig(TokenProvider tokenProvider, CorsFilter corsFilter, JWTAuthenticationEntryPoint authenticationEntryPoint, JWTAccessDeniedHandler jwtAccessDeniedHandler){
        this.tokenProvider = tokenProvider;
        this.corsFilter = corsFilter;
        this.authenticationEntryPoint = authenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Override
    public void configure(WebSecurity web){
        web.ignoring()
                .antMatchers(HttpMethod.OPTIONS, "/**")
                .antMatchers(
                        "/",
                        "/*.html",
                        "/favicon.ico",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js",
                        "/**/*.json",
                        "/**/*.png",
                        "/**/*.map",
                        "/**/*.svg"
                );
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                .and()
                .headers()
                .frameOptions()
                .sameOrigin()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()

                .antMatchers("/**").permitAll()
                .antMatchers("/api/**").authenticated()
                .antMatchers("/api/authenticate").permitAll()
                .antMatchers("/api/user").permitAll()
                .antMatchers("/api/user/checkusername").permitAll()
                .antMatchers("/api/user/checkemail").permitAll()

                .anyRequest().authenticated()

                .and()
                .apply(securityConfigurerAdapter());
    }


    private JWTConfigurer securityConfigurerAdapter(){
        return new JWTConfigurer(tokenProvider);
    }
}
