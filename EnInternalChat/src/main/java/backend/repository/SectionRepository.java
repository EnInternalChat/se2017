package backend.repository;

import backend.mdoel.Section;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * Created by lenovo on 2017/5/15.
 */
public interface SectionRepository extends PagingAndSortingRepository<Section, Long> {
    List<Section> findByCompanyID(long companyID);
    List<Section> findByCompanyIDAndParrentSectionID(long companyID,long parrentSectionID);
}
