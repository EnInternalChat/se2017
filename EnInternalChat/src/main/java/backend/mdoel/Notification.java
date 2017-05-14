package backend.mdoel;

import org.springframework.data.annotation.Id;

/**
 * Created by lenovo on 2017/5/14.
 */
public class Notification {
    @Id
    private long ID;
    private long senderID;
    private long rcvSecID;
    private long sentTime;
    private String content;
    private String senderName;
    private String rcvSecName;

    public Notification(long sentTime) {
        this.sentTime = sentTime;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public void setSenderID(int senderID) {
        this.senderID = senderID;
    }

    public void setRcvSecID(int rcvSecID) {
        this.rcvSecID = rcvSecID;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public void setRcvSecName(String rcvSecName) {
        this.rcvSecName = rcvSecName;
    }

    public long getID() {
        return ID;
    }

    public long getSenderID() {
        return senderID;
    }

    public long getRcvSecID() {
        return rcvSecID;
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

    public String getRcvSecName() {
        return rcvSecName;
    }
}
