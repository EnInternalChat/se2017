package backend.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * Created by lenovo on 2017/5/8.
 */
public class MvcInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {
    // tag::config[]
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[] { SecurityConfig.class, HttpSessionConfig.class };
    }
    // end::config[]

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[] { MvcConfig.class };
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }
}
