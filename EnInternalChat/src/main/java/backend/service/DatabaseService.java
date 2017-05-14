package backend.service;

import backend.mdoel.Company;
import backend.mdoel.Employee;
import backend.repository.*;
import backend.util.SectionTree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/7.
 */

@Service
public class DatabaseService {
    private final EmployeeRepository employeeRepository;
    private final NotificationRepository notificationRepository;
    private final TaskRepository taskRepository;
    private final ChatRepository chatRepository;
    private final CompanyRepository companyRepository;
    private final SectionRepository sectionRepository;

    @Autowired
    public DatabaseService(EmployeeRepository employeeRepository, NotificationRepository notificationRepository, TaskRepository taskRepository, ChatRepository chatRepository, CompanyRepository companyRepository, SectionRepository sectionRepository) {
        this.employeeRepository = employeeRepository;
        this.notificationRepository = notificationRepository;
        this.taskRepository = taskRepository;
        this.chatRepository = chatRepository;
        this.companyRepository=companyRepository;
        this.sectionRepository=sectionRepository;
    }

    public Map<String,Object> colSectionData(long companyID) {
        Company company=companyRepository.findOne(companyID);
        String name=company.getName();
        return SectionTree.create(sectionRepository, company.getHeadSecID(),name);
    }

    public Map<String,Object> colEmployeeData(long companyID) {
        Map<String,Object> result=new HashMap<>();
        List<Employee> employees=employeeRepository.findByCompanyID(companyID);
        result.put("total",employees.size());
        result.put("employees",employees);
        return result;
    }

    public Map<String, Object> colSecEmployeeData(long companyID, long sectionID) {
        Map<String,Object> result=new HashMap<>();
        List<Employee> employees=employeeRepository.findBySectionIDAndCompanyID(companyID,sectionID);
        result.put("total",employees.size());
        result.put("employees",employees);
        return result;
    }

        public Company doWork() {
//
//        Employee employee=new Employee();
//        employee.setName("fog");
//        employee.setGender(false);
//        employee=repository.save(employee);
//        employee=new Employee();
//        employee.setAvatar(1);
//        employee.setName("fog");
//        employee.setPwd("ddd");
//        ArrayList<String> ll=new ArrayList<>();
//        ll.add("ssss");
//        ll.add("qqqqqqqqq");
//        employee.setPhone(ll);
//        employee=repository.save(employee);
//        List<Employee> result=repository.findByName("fog");
//        System.out.println(result);
            return companyRepository.findOne((long) 1);
    }

}
