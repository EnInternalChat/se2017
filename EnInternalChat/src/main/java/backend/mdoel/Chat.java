package backend.mdoel;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/14.
 */
public class Chat {
    @Id
    private long ID;
    private long companyID;
    private long ownerID;
    private String ownerName;
    private ArrayList<Long> membersID;
    private ArrayList<Map<String, Object>> messageList;

    public Chat() {
        membersID=new ArrayList<>();
        messageList=new ArrayList<>();
    }
}
