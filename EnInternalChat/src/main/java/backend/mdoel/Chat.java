package backend.mdoel;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/14.
 */

@Document
public class Chat {
    @Id
    private long ID;
    private long companyID;
    private long ownerID;
    private String ownerName;
    private Collection<Long> membersID;
    private Collection<Map<String, Object>> messageList;

    public Chat() {
        membersID=new ArrayList<>();
        messageList=new ArrayList<>();
    }
}
