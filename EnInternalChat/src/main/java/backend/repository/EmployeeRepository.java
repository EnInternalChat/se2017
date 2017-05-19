package backend.repository;

import backend.mdoel.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by lenovo on 2017/5/7.
 */

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, Long> {
    List<Employee> findBySectionIDAndCompanyID (long companyID, long sectionID);
    List<Employee> findByCompanyID(long companyID);
}
