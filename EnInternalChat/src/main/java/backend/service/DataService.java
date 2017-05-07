package backend.service;

import backend.mdoel.Employee;
import backend.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by lenovo on 2017/5/7.
 */

@Service
public class DataService {
    private final EmployeeRepository repository;

    @Autowired
    public DataService(EmployeeRepository repository) {
        this.repository=repository;
    }

    public void doWork() {
        repository.deleteAll();

        Employee employee=new Employee();
        employee.setName("fog");
        employee.setGender(false);
        employee=repository.save(employee);

        List<Employee> result=repository.findByName("fog");
    }
}
