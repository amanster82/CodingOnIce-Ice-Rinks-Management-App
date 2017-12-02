package codingonice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.context.AbstractHttpSessionApplicationInitializer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.session.data.redis.config.ConfigureRedisAction;

@Configuration
@EnableRedisHttpSession
public class AppConfiguration extends WebMvcConfigurerAdapter {

    // Needed in order for Spring Session to start up and begin handling sessions
    @Configuration
    private class SessionConfig extends AbstractHttpSessionApplicationInitializer {
        public SessionConfig() {
            super(SessionConfig.class);
        }
    }

    /**
     * Spring Session will attempt to run configuration actions on Redis that may not be supported
     * by certain environments, such as Heroku hosted Redis instances. Disabling these actions should
     * have no adverse side effects
     */
    @Bean
    public static ConfigureRedisAction configureRedisAction() {
        return ConfigureRedisAction.NO_OP;
    }

    /**
     * CORS (Cross Origin Requests) needs to be added to all routes in order for browsers
     * to correctly send requests to Spring if Spring is not hosted under the same domain as the web application.
     * This can vary depending on deployment environment, development environments, etc so just do a blanket allowance.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurerAdapter() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**");
            }
        };
    }

    // Use industry standard BCrypt for all password encoding
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // The account interceptor function will be run by Spring Session before each route is called
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AccountSessionInterceptor());
    }

}
