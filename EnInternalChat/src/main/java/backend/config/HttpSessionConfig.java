package backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;
import org.springframework.session.web.http.HttpSessionStrategy;

/**
 * Created by lenovo on 2017/5/8.
 */

@Configuration
@EnableRedisHttpSession
public class HttpSessionConfig {

    @Bean
    public LettuceConnectionFactory connectionFactory() {
        LettuceConnectionFactory lettuceConnectionFactory=new LettuceConnectionFactory();
        lettuceConnectionFactory.setHostName("10.0.0.102");
        lettuceConnectionFactory.setPort(6379);
        return lettuceConnectionFactory;
    }

    @Bean
    public HttpSessionStrategy httpSessionStrategy() {
        return new HeaderHttpSessionStrategy();
    }
}
