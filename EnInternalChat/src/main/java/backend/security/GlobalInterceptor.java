package backend.security;

import org.activiti.engine.impl.util.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by lenovo on 2017/5/25.
 */
public class GlobalInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        System.out.println(httpServletRequest.getMethod()+"|"+httpServletRequest.getPathInfo()+"|"+httpServletRequest.getHeader("x-auth-token"));
        if(httpServletRequest.isRequestedSessionIdValid()) {
            if(httpServletRequest.getPathInfo().equals("/login") && httpServletRequest.getMethod() == "POST") {
                httpServletResponse.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
                JSONObject jsonObject=new JSONObject();
                jsonObject.put("status",false);
                jsonObject.put("info","您已经登录，如需登录其他账号，请先退出当前账号!");
                httpServletResponse.getWriter().write(jsonObject.toString());
                System.out.println("repeat login");
                return false;
            }
            return true;
        } else {
            if(httpServletRequest.getPathInfo().equals("/login")) {
                return true;
            }
            httpServletResponse.setContentType(MediaType.APPLICATION_JSON_UTF8_VALUE);
            JSONObject jsonObject=new JSONObject();
            jsonObject.put("status",false);
            jsonObject.put("info","您尚未登录，请登录后再操作");
            httpServletResponse.getWriter().write(jsonObject.toString());
            return false;
        }
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
