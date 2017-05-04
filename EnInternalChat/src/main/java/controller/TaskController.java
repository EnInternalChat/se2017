package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/2.
 */

@Controller
public class TaskController {
    DataProcess dataProcess=new DataProcess();

    @ResponseBody
    @RequestMapping(value = "/tasks", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public List<Map<String,Object>> allTask() {
        return dataProcess.tasks();
    }
}
