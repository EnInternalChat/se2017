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
public class SectionController {
    @ResponseBody
    @RequestMapping(value = "/sections", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public Map<String,Object> allEmployees() {
        List<Map<String,Object>> sections=new ArrayList<>();
        List<Integer> childrenSections=new ArrayList<>();
        Map<String,Object> resMap=new HashMap<>();
        Map<String,Object> section=new HashMap<>();
        resMap.put("total",3);
        section.put("ID",123);
        section.put("name","product develop");
        section.put("parrentSectionID",132);

        childrenSections.add(233);
        childrenSections.add(133);
        childrenSections.add(1345);
        childrenSections.add(20499);

        section.put("childrenSections",childrenSections);
        section.put("members",childrenSections);
        section.put("note","It's core production developing center.");

        sections.add(section);
        sections.add(section);

        resMap.put("sections",sections);
        return resMap;
    }
}
