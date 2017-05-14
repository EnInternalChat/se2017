package backend.repository;

import backend.mdoel.Notification;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by lenovo on 2017/5/14.
 */
public interface NotificationRepository extends CrudRepository<NotificationRepository, Long> {
    List<Notification> findByRcvSecID(long rcvSecID);
    List<Notification> findBySenderID(long senderID);
}
