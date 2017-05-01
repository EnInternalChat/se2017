package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lenovo on 2017/4/30.
 */

@Controller
@RequestMapping(value = "/",method = {RequestMethod.GET,RequestMethod.POST},produces = "application/json;charset=UTF-8")
public class TestController {
    @ResponseBody
    @RequestMapping(value = "/getJson")
    public Map<String,Object> testSpring() {
        Map<String,Object> resMap = new HashMap<String, Object>();
        resMap.put("user","name");
        return resMap;
    }
}
