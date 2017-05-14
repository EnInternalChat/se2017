package backend.repository;

import backend.mdoel.Chat;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by lenovo on 2017/5/14.
 */
public interface ChatRepository extends CrudRepository<Chat, Long> {
}
