package backend.controller;

import backend.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/2.
 */

@Controller
@RequestMapping(value = "/tasks")
public class TaskController {
    @Autowired
    DatabaseService databaseService;

    private Map<String, Object> infoType(int type, String name) {
        Map<String, Object> deployResult=new HashMap<>();
        switch (type) {
            case 0:
                deployResult.put("upload",false);
                deployResult.put("deploy",false);
                deployResult.put("info",name+": 流程文件传输失败或传输文件本身为空");
                return deployResult;
            case 1:
                deployResult.put("upload",true);
                deployResult.put("deploy",false);
                deployResult.put("info",name+": 已存在同名流程");
                return deployResult;
            case 2:
                deployResult.put("upload",true);
                deployResult.put("deploy",false);
                deployResult.put("info",name+": 流程部署失败，请检查流程文件内容、格式、命名是否合法");
                return deployResult;
            case 3:
                deployResult.put("upload",true);
                deployResult.put("deploy",true);
                deployResult.put("info",name+"流程部署成功");
            default:
                return null;
        }
    }
//
//    @ResponseBody
//    @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
//    public Map<String, Object> uploadProcess(@RequestParam("newTaskFile")CommonsMultipartFile file, HttpServletRequest request) {
//        String
//    }
}
