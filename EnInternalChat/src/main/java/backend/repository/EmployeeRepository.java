package backend.repository;

import backend.mdoel.Employee;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * Created by lenovo on 2017/5/7.
 */
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {
    List<Employee> findBySectionIDAndCompanyID (long companyID, long sectionID);
    List<Employee> findByCompanyID(long companyID);
}
