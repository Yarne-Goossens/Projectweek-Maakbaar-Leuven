package team7.maakbaarleuven;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
// import org.springframework.security.core.userdetails.User;
// import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.provisioning.InMemoryUserDetailsManager;
// import org.springframework.security.web.SecurityFilterChain;

// import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
// @EnableWebSecurity
public class SecurityConfig {

    @Bean // Also overrides default spring boot password-encoder
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // @Bean // Leaks passwords to github repository and git history!
    // public InMemoryUserDetailsManager userDetailsService(PasswordEncoder
    // passwordEncoder) {
    // UserDetails user = User
    // .withUsername("user")
    // .password(passwordEncoder.encode("t"))
    // .roles("USER")
    // .build();

    // UserDetails admin = User
    // .withUsername("admin")
    // .password(passwordEncoder.encode("t"))
    // .roles("USER", "ADMIN")
    // .build();

    // return new InMemoryUserDetailsManager(user, admin);
    // }

    // @Bean // Turn off security for certain URLs
    // public WebSecurityCustomizer webSecurityCustomizer() {
    // return (web) -> web.ignoring()
    // .requestMatchers("/css/**", "/api/**", "/templates/error")
    // .requestMatchers(antMatcher("/h2/**")); //
    // https://stackoverflow.com/questions/74680244/h2-database-console-not-opening-with-spring-security;
    // }

    // @Bean
    // public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    // http
    // .csrf().disable()
    // .authorizeHttpRequests()
    // .requestMatchers("/storage/add").hasRole("ADMIN")
    // .requestMatchers("/storage/update/**").hasRole("ADMIN")
    // .requestMatchers("/home").permitAll()
    // .anyRequest().hasRole("USER")
    // .and()
    // .formLogin()
    // .loginPage("/home")
    // .defaultSuccessUrl("/home", true)
    // .and()
    // .logout()
    // .clearAuthentication(true)
    // .deleteCookies("JSESSIONID")
    // .invalidateHttpSession(true);

    // return http.build();
    // }
}