package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/2.
 */

@Controller
@CrossOrigin
public class RootController {
    DataProcess dataProcess=new DataProcess();

    @ResponseBody
    @RequestMapping(value = "/login.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public Map<String,Object> logindo(@RequestParam("name") String name,@RequestParam("pwd") String password) {
        Map<String,Object> resMap = new HashMap<>();
        //assert
        resMap.putAll(dataProcess.personal());
        resMap.put("notifications",dataProcess.notifications());
        resMap.put("tasks",dataProcess.tasks());
        return resMap;
    }
}
