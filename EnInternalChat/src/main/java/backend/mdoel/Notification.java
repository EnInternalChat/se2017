package backend.mdoel;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lenovo on 2017/5/14.
 */
public class Notification {
    @Id
    private long ID;
    private long companyID;
    private long senderID;
    private long sentTime;
    private String content;
    private String senderName;
    private String title;
    private List<Long> rcvSecID;

    public Notification(long sentTime) {
        this.sentTime = sentTime;
        senderID=233;
        rcvSecID=new ArrayList<>();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getCompanyID() {
        return companyID;
    }

    public void setCompanyID(long companyID) {
        this.companyID = companyID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public void setSenderID(int senderID) {
        this.senderID = senderID;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public long getID() {
        return ID;
    }

    public long getSenderID() {
        return senderID;
    }

    public long getSentTime() {
        return sentTime;
    }

    public String getContent() {
        return content;
    }

    public String getSenderName() {
        return senderName;
    }
}