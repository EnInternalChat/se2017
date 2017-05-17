package backend.repository;

import backend.mdoel.Company;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by lenovo on 2017/5/14.
 */
public interface CompanyRepository extends PagingAndSortingRepository<Company, Long> {
}
