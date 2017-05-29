package backend.service;

import org.activiti.engine.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by lenovo on 2017/5/29.
 */

@Service
public class ActivitiService {
    ProcessEngineConfiguration cfg;
    RepositoryService repositoryService;
    HistoryService historyService;
    TaskService taskService;
    IdentityService identityService;

    @Autowired
    public ActivitiService(ProcessEngineConfiguration cfg, RepositoryService repositoryService, HistoryService historyService, TaskService taskService, IdentityService identityService) {
        this.cfg = cfg;
        this.repositoryService = repositoryService;
        this.historyService = historyService;
        this.taskService = taskService;
        this.identityService = identityService;
    }



//    public Map<String, Object> deployProcess(CommonsMultipartFile file, HttpServletRequest request) {
//        String token=request.getHeader("");
//        //TODO headername
//        if(file.isEmpty()) {
//            return infoType(0, file.getName());
//        }
//        String path= this.getClass().getResource("/").getPath()+ File.separator+"tmp"+File.separator;
//        File dir=new File(path);
//        if(!dir.isDirectory()) dir.mkdir();
//        System.out.println(path);
//        File processFile=new File(path, file.getName());
//        if(processFile.exists())
//            return infoType(1, file.getName());
//        //you still need companyID(get from session map(Map<String, Map<String, String>)
//        ProcessDefinition processDefinition;
//        try {
//            processFile.createNewFile();
//            file.transferTo(processFile);
//            Deployment deployment;
//            try {
//                deployment = repositoryService.createDeployment().addClasspathResource("tmp"+File.separator+processFile.getName()).deploy();
//                processDefinition=repositoryService.createProcessDefinitionQuery()
//                        .deploymentId(deployment.getId()).singleResult();
//            } catch (XMLException e) {
//                return infoType(2, file.getName());
//            }
//        } catch (IOException e) {
//            return infoType(2, file.getName());
//        }
//        System.out.println("Found process definition ["
//                + processDefinition.getName() + "] with id ["
//                + processDefinition.getId() + "]");
//        databaseService.addNewProcess(token, processDefinition.getName(), processFile.getAbsolutePath());
//        return infoType(3, file.getName());
//    }
}
