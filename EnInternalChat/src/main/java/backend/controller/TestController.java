package backend.controller;

import backend.service.DatabaseService;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngineConfiguration;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.impl.cfg.StandaloneProcessEngineConfiguration;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.UnknownHostException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lenovo on 2017/4/30.
 */

@Controller
public class TestController {
    RepositoryService repositoryService;
    ProcessDefinition processDefinition;

    @Autowired
    private DatabaseService service;

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

    private void diagramFile(File xmlFile, OutputStream outputStream) {
        Deployment deployment;
        deployment = repositoryService.createDeployment().addClasspathResource("tmp"+File.separator+xmlFile.getName()).deploy();
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
        Map<String,Object> resMap = new HashMap<>();
        resMap.put("user","name");
        return resMap;
    }

    @ResponseBody
    @RequestMapping(value = "/testMongo", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public void mongoBug() throws UnknownHostException {
        service.doWork();
    }

    @ResponseBody
    @RequestMapping(value = "/company", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public List<Map<String,Object>> allCompany() {
        List<Map<String,Object>> data=new ArrayList<>();
        List<Map<String,Object>> sections=new ArrayList<>();
        Map<String,Object> oneCompany = new HashMap<>();
        Map<String,Object> oneSection = new HashMap<>();
        oneCompany.put("ID",1);
        oneCompany.put("name","Google");

        oneSection.put("ID",144);
        oneSection.put("name", "product develop");
        oneSection.put("leaderID",564);

        sections.add(oneSection);
        sections.add(oneSection);
        sections.add(oneSection);

        oneCompany.put("sections",sections);

        data.add(oneCompany);
        data.add(oneCompany);
        return data;
    }

    @ResponseBody
    @RequestMapping(value = "/modelToDiagram", method = RequestMethod.POST)
    public void diagram(@RequestParam("file")CommonsMultipartFile file, HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("image/png");
        String path= this.getClass().getResource("/").getPath()+File.separator+"tmp"+File.separator;
        File dir=new File(path);
        if(!dir.isDirectory()) dir.mkdir();
        System.out.println(path);
        File xmlFile=new File(path, file.getName()+".bpmn20.xml");
        if(xmlFile.exists()) {
            xmlFile.delete();
            xmlFile.createNewFile();
        }
        file.transferTo(xmlFile);
        diagramFile(xmlFile, response.getOutputStream());
    }

    @RequestMapping(value = "/login", produces = "application/json;charset=UTF-8")
    public Map<String, String> helloUser(Principal principal) {
        HashMap<String, String> result = new HashMap<>();
        result.put("username", principal.getName());
        return result;
    }

    @RequestMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
