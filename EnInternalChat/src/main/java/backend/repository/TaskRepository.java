package backend.repository;

import backend.mdoel.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by lenovo on 2017/5/14.
 */
public interface TaskRepository extends CrudRepository<Task, Long> {
    List<Task> findByCompanyID(long companyID);
}
