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
public class EmployeeController {
    @ResponseBody
    @RequestMapping(value = "/employees", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public Map<String,Object> allEmployees() {
        Map<String,Object> resMap = new HashMap<>();
        Map<String,Object> employee = new HashMap<>();
        List<Map<String, Object>> employees= new ArrayList<>();
        List<String> phone=new ArrayList<>();
        List<String> email=new ArrayList<>();
        resMap.put("total",2);

        employee.put("Id",23);
        employee.put("name","sabi");
        employee.put("positionID",233);
        employee.put("positionName","product manager");
        employee.put("gender",true);
        employee.put("avatar",1);

        phone.add("13838472290");
        phone.add("026-33324444");

        employee.put("phone",phone);

        email.add("394859210@qq.com");
        email.add("dsdsfas@hotmail.com");

        employee.put("email",email);

        resMap.put("employees",employee);
        return resMap;
    }
}
