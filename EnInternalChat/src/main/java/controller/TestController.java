package controller;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by lenovo on 2017/4/30.
 */

@Controller
public class TestController {
    RepositoryService repositoryService;
    ProcessDefinition processDefinition;

    public TestController() {
        ProcessEngineConfiguration cfg = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:h2:mem:activiti;DB_CLOSE_DELAY=1000")
                .setJdbcUsername("sa")
                .setJdbcPassword("")
                .setJdbcDriver("org.h2.Driver")
                .setDatabaseSchemaUpdate(ProcessEngineConfiguration.DB_SCHEMA_UPDATE_TRUE);
        ProcessEngine processEngine=cfg.buildProcessEngine();
        repositoryService=processEngine.getRepositoryService();
    }

    private void diagramFile(File xml, OutputStream outputStream) {
        Deployment deployment;
        deployment = repositoryService.createDeployment().addClasspathResource("tmp"+File.separator+xml.getName()).deploy();
        processDefinition=repositoryService.createProcessDefinitionQuery()
                .deploymentId(deployment.getId()).singleResult();
        String diagramName=processDefinition.getDiagramResourceName();
        InputStream resourceAsStream=repositoryService.getResourceAsStream(processDefinition.getDeploymentId(), diagramName);
        try {
            byte[] b=new byte[resourceAsStream.available()];
            resourceAsStream.read(b, 0, b.length);
            outputStream.write(b);
            outputStream.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @ResponseBody
    @RequestMapping(value = "/getJson", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public Map<String,Object> testSpring() {
        Map<String,Object> resMap = new HashMap<String, Object>();
        resMap.put("user","name");
        return resMap;
    }

    @ResponseBody
    @RequestMapping(value = "/modelToDiagram", method = RequestMethod.POST)
    public void diagram(@RequestParam("file")CommonsMultipartFile file, HttpServletResponse response) throws IOException {
        response.setContentType("image/png");
        File xmlFile=new File("src"+File.separator+"main"+File.separator+"resources"+File.separator+"tmp"+File.separator+file.getName()+".bpmn20.xml");
        file.transferTo(xmlFile);
        diagramFile(xmlFile, response.getOutputStream());
    }
}
