package backend.controller;

import backend.mdoel.Company;
import backend.mdoel.Employee;
import backend.mdoel.Process;
import backend.mdoel.Section;
import backend.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by lenovo on 2017/5/4.
 */

@Component
public class DataProcessCenter {

    @Autowired
    private DatabaseService databaseService;

    //TODO formal method
    public Collection<Employee> employeesCompany(long companyID, Pageable pageable) {
        Collection<Employee> data = databaseService.employeesCompany(companyID,pageable);
        return data;
    }
    //TODO formal method


    public List<Map<String,Object>> notifications() {
        List<Map<String,Object>> notifications=new ArrayList<>();
        Map<String,Object> resMap=new HashMap<>();
        resMap.put("notificationID",233);
        resMap.put("senderID",2344);
        resMap.put("type","meeting");
        resMap.put("time","2017-04-05T13:02:32.537Z");
        resMap.put("section",123);
        resMap.put("content","meeting afternoon!");
        resMap.put("read",false);

        notifications.add(resMap);
        resMap.put("type","simple");
        resMap.put("content","doctor.cao is watching you");
        resMap.put("time","2013-01-05T13:02:12.522Z");

        notifications.add(resMap);

        return notifications;
    }

    public Map<String,Object> sections() {
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

    public List<Map<String,Object>> tasks() {
        List<Map<String,Object>> alltask=new ArrayList<>();
        List<Object> singleTaskStage=new ArrayList<>();
        Map<String,Object> one=new HashMap<>();
        List<Object> tmp=new ArrayList<>();
        Map<String,Object> t=new HashMap<>();
        one.put("processID","leaderAudit");
        one.put("content","领导审批");
        one.put("finishTime",new SimpleDateFormat("yyyy/MM/dd H:m:s").format(System.currentTimeMillis()));
        tmp.add("caochun");
        tmp.add("李二(HR)");
        one.put("person",tmp);
        tmp=new ArrayList<>();
        t.put("yesDestinationActivityID","reportBack");
        t.put("yesDestinationActivityName","汇报");
        tmp.add(t);
        t=new HashMap<>();
        t.put("noDestinationActivityID","modifyApply");
        t.put("noDestinationActivityName","修正");
        tmp.add(t);
        one.put("exclusiveGateway",tmp);
        singleTaskStage.add(one);
        singleTaskStage.add(one);
        one=new HashMap<>();
        one.put("stages",singleTaskStage);
        one.put("startTime",new SimpleDateFormat("yyyy/MM/dd H:m:s").format(System.currentTimeMillis()));
        one.put("updateTime",new SimpleDateFormat("yyyy/MM/dd H:m:s").format(System.currentTimeMillis()));
        one.put("startPerson","张三");
        one.put("activityID",2333);
        one.put("name","请假退休");
        alltask.add(one);
        alltask.add(one);
        return alltask;
    }

    public void testWork() {
        databaseService.testNewStruc();
    }

    public boolean addNewProcess(String token, String name, String path) {
        long timestamp=System.currentTimeMillis();
        long companyID=0;
        //TODO getid
        Process process=new Process(companyID,name,path,timestamp,timestamp,0);
        return databaseService.addProcessToDb(process);
    }

    public Section findSecByID(long id) {
        return databaseService.findSecByID(id);
    }

    public Company findComByID(long id) {
        //sessionRepository.save(sessionRepository.createSession());
        return databaseService.findComById(id);
    }
//
//    public boolean updateProcessTime() {
//        long timestamp=System.currentTimeMillis();
//        return true;
//    }
}
