package backend.service;

import backend.mdoel.Company;
import backend.mdoel.Employee;
import backend.mdoel.Process;
import backend.mdoel.Section;
import backend.repository.*;
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
//
//    public Map<String,Object> colSectionData(long companyID) {
//        Company company=companyRepository.findOne(companyID);
//        String name=company.getName();
//        return SectionTree.create(sectionRepository, company.,name);
//    }

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

    public Section findSecByID(long id) {
        return sectionRepository.findOne(id);
    }

    public Company findComById(long id) {
        return companyRepository.findOne(id);
    }

    public void testNewStruc() {
        Company company=new Company();
        company.setName("google");
        company.setIntroduction("nihao");
        Employee employee=new Employee();
        Section section1=new Section(0,employee,"ass","note");
        section1.setID(0);
        Section section2=new Section(0,employee,"fsdf","note");
        section2.setID(1);
        Section section3=new Section(0,employee,"afsfs","note");
        section3.setID(2);
        Section section4=new Section(0,employee,"dsfsss","note");
        section4.setID(3);
        Section section5=new Section(0,employee,"aeyys","note");
        section5.setID(4);
        Section section6=new Section(0,employee,"asyqq","note");
        section6.setID(5);
        company.setHeadSec(section1);
        section1.addChildSec(section2);
        section1.addChildSec(section3);
        section2.addChildSec(section4);
        section3.addChildSec(section5);
        section3.addChildSec(section6);
        employeeRepository.insert(employee);
        sectionRepository.insert(section2);
        sectionRepository.insert(section1);
        sectionRepository.insert(section3);
        sectionRepository.insert(section5);
        sectionRepository.insert(section6);
        sectionRepository.insert(section4);
        companyRepository.save(company);
        Company result=companyRepository.findOne((long) 0);
        System.out.println(result.getHeadSec().getChildrenSections().size());
    }
}
