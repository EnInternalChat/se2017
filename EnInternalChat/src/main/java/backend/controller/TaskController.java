package backend.controller;

import org.activiti.bpmn.exceptions.XMLException;
import org.activiti.engine.*;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/2.
 */

@Controller
@RequestMapping(value = "/tasks")
public class TaskController {
    @Autowired
    DataProcessCenter dataProcessCenter;

    RepositoryService repositoryService;
    HistoryService historyService;
    TaskService taskService;
    IdentityService identityService;

    @Autowired
    ProcessEngineConfiguration cfg;

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

    @ResponseBody
    @RequestMapping(value = "/test", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Map<String,Object>> allTask() {
        ProcessEngine processEngine=cfg.buildProcessEngine();
        repositoryService=processEngine.getRepositoryService();
        taskService=processEngine.getTaskService();
        historyService=processEngine.getHistoryService();
        identityService=processEngine.getIdentityService();
        return dataProcessCenter.tasks();
    }

    @ResponseBody
    @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Map<String, Object> uploadProcess(@RequestParam("newTaskFile")CommonsMultipartFile file, HttpServletRequest request) {
        String token=request.getHeader("");
        //TODO headername
        if(file.isEmpty())
            return infoType(0, file.getName());
        String path= this.getClass().getResource("/").getPath()+ File.separator+"tmp"+File.separator;
        File dir=new File(path);
        if(!dir.isDirectory()) dir.mkdir();
        System.out.println(path);
        File processFile=new File(path, file.getName());
        if(processFile.exists())
            return infoType(1, file.getName());
        //you still need companyID(get from session map(Map<String, Map<String, String>)
        ProcessDefinition processDefinition;
        try {
            processFile.createNewFile();
            file.transferTo(processFile);
            Deployment deployment;
            try {
                deployment = repositoryService.createDeployment().addClasspathResource("tmp"+File.separator+processFile.getName()).deploy();
                processDefinition=repositoryService.createProcessDefinitionQuery()
                        .deploymentId(deployment.getId()).singleResult();
            } catch (XMLException e) {
                return infoType(2, file.getName());
            }
        } catch (IOException e) {
            return infoType(2, file.getName());
        }
        System.out.println("Found process definition ["
                + processDefinition.getName() + "] with id ["
                + processDefinition.getId() + "]");
        dataProcessCenter.addNewProcess(token, processDefinition.getName(), processFile.getAbsolutePath());
        return infoType(3, file.getName());
    }
}
