package backend.repository;

import backend.mdoel.Process;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by lenovo on 2017/5/14.
 */
public interface ProcessRepository extends MongoRepository<Process, Long> {
    List<Process> findByCompanyID(long companyID);
}
