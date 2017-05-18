package backend.service;

import backend.mdoel.Company;
import backend.mdoel.Employee;
import backend.mdoel.Process;
import backend.repository.*;
import backend.util.SectionTree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    private final ProcessRepository processRepository;
    private final ChatRepository chatRepository;
    private final CompanyRepository companyRepository;
    private final SectionRepository sectionRepository;

    @Autowired
    public DatabaseService(EmployeeRepository employeeRepository, NotificationRepository notificationRepository, ProcessRepository processRepository, ChatRepository chatRepository, CompanyRepository companyRepository, SectionRepository sectionRepository) {
        this.employeeRepository = employeeRepository;
        this.notificationRepository = notificationRepository;
        this.processRepository = processRepository;
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
        return result;//TODO different data
    }

    public Map<String, Object> colSecEmployeeData(long companyID, long sectionID) {
        Map<String,Object> result=new HashMap<>();
        List<Employee> employees=employeeRepository.findBySectionIDAndCompanyID(companyID,sectionID);
        result.put("total",employees.size());
        result.put("employees",employees);//TODO frontend different data
        return result;
    }



    public boolean addProcessToDb(Process process) {
        processRepository.save(process);
        return true;
    }

    public void doWork() {
        ArrayList<String> test=new ArrayList<>();
        test.add("1111");
        test.add("e35564543");
        Employee employee=employeeRepository.findOne((long) 28);
        employee.setPassword("sssssssssss");
        employeeRepository.save(employee);
    }

}
