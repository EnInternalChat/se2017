package backend.repository;

import backend.mdoel.Task;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by lenovo on 2017/5/14.
 */
public interface TaskRepository extends CrudRepository<Task, Long> {
}
