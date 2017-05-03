package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/2.
 */
@Controller
public class PersonalController {
    @ResponseBody
    @RequestMapping(value = "/personal", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public Map<String, Object> personalData() {
        Map<String,Object> resMap=new HashMap<>();
        List<String> phone=new ArrayList<>();
        List<String> email=new ArrayList<>();
        resMap.put("ID",1);
        resMap.put("name","jack");
        resMap.put("positionID",0);
        resMap.put("position","Administrator");
        resMap.put("gender",true);

        phone.add("13838472290");
        phone.add("026-33324444");

        resMap.put("phone",phone);

        email.add("394859210@qq.com");
        email.add("dsdsfas@hotmail.com");

        resMap.put("email",email);
        return resMap;
    }
}
