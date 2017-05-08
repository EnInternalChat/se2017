package backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * Created by lenovo on 2017/5/2.
 */
@Controller
public class PersonalController {
    DataProcess dataProcess=new DataProcess();

    @ResponseBody
    @RequestMapping(value = "/personal", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public Map<String, Object> personalData() {
        Map<String,Object> resMap=dataProcess.personal();
        return resMap;
    }
}
