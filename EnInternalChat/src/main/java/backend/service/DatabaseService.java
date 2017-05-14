package backend.service;

import backend.repository.ChatRepository;
import backend.repository.EmployeeRepository;
import backend.repository.NotificationRepository;
import backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by lenovo on 2017/5/7.
 */

@Service
public class DatabaseService {
    private final EmployeeRepository employeeRepository;
    private final NotificationRepository notificationRepository;
    private final TaskRepository taskRepository;
    private final ChatRepository chatRepository;

    @Autowired
    public DatabaseService(EmployeeRepository employeeRepository, NotificationRepository notificationRepository, TaskRepository taskRepository, ChatRepository chatRepository) {
        this.employeeRepository = employeeRepository;
        this.notificationRepository = notificationRepository;
        this.taskRepository = taskRepository;
        this.chatRepository = chatRepository;
    }

    //    public void doWork() {
//        repository.deleteAll();
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
//    }
}
