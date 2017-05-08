package backend.service;

import backend.mdoel.Employee;
import backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lenovo on 2017/5/7.
 */

@Service
public class DatabaseService {
    private final EmployeeRepository repository;

    @Autowired
    public DatabaseService(EmployeeRepository repository) {
        this.repository=repository;
    }

    public void doWork() {
        repository.deleteAll();

        Employee employee=new Employee();
        employee.setName("fog");
        employee.setGender(false);
        employee=repository.save(employee);
        employee=new Employee();
        employee.setAvatar(1);
        employee.setName("fog");
        employee.setID(233333);
        employee.setPwd("ddd");
        ArrayList<String> ll=new ArrayList<>();
        ll.add("ssss");
        ll.add("qqqqqqqqq");
        employee.setPhone(ll);
        employee=repository.save(employee);
        List<Employee> result=repository.findByName("fog");
        System.out.println(result);
    }
}
