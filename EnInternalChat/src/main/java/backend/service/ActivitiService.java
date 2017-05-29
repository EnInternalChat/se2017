package backend.service;

import org.activiti.bpmn.exceptions.XMLException;
import org.activiti.engine.*;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/29.
 */

@Service
public class ActivitiService {
    DatabaseService databaseService;
    ProcessEngineConfiguration cfg;
    RepositoryService repositoryService;
    HistoryService historyService;
    TaskService taskService;
    IdentityService identityService;
    RuntimeService runtimeService;

    @Autowired
    public ActivitiService(DatabaseService databaseService, ProcessEngineConfiguration cfg, RepositoryService repositoryService, HistoryService historyService, TaskService taskService, IdentityService identityService, RuntimeService runtimeService) {
        this.databaseService = databaseService;
        this.cfg = cfg;
        this.repositoryService = repositoryService;
        this.historyService = historyService;
        this.taskService = taskService;
        this.identityService = identityService;
        this.runtimeService=runtimeService;
    }

    public void test() {
        ProcessInstance processInstance=runtimeService.startProcessInstanceByKey("dispatch");
        String proId=processInstance.getId();
        System.out.println("def id: "+proId);
    }

    public Map<String, Object> deployProcess(CommonsMultipartFile file, long companyId) {
        Map<String, Object> result=new HashMap<>();
        result.put("name",file.getName());
        if(file.isEmpty()) {
            result.put("type",0);
            return result;
        }
        String path= this.getClass().getResource("/").getPath()+ File.separator+"tmp"+File.separator;
        File dir=new File(path);
        if(!dir.isDirectory()) dir.mkdir();
        System.out.println(path);
        File processFile=new File(path, file.getName());
        if(processFile.exists()) {
            result.put("type",1);
            return result;
        }
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
                result.put("type",2);
                return result;
            }
        } catch (IOException e) {
            result.put("type",2);
            return result;
        }
        System.out.println("Found process definition ["
                + processDefinition.getName() + "] with id ["
                + processDefinition.getId() + "]");
        //TODO add operation to mongo
        result.put("type",3);
        return result;
    }
}
