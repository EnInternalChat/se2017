package backend.mdoel;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/7.
 */
public class Employee {
    @Id
    private long ID;
    private long companyID;
    private long sectionID;
    private int avatar;
    private String name;
    private String pwd;
    private String position;
    private List<String> phone;
    private List<String> email;
    private List<Map<String, Object>> chats;
    private List<Map<String, Object>> notifications;
    private List<Map<String, Object>> tasks;
    private boolean gender;

    public Employee() {
        sectionID=companyID=233;
        avatar=2;
        pwd=position=name="dfsgsdfhfgjdfj";
        phone=new ArrayList<>();
        email=new ArrayList<>();
        chats=new ArrayList<>();
        notifications=new ArrayList<>();
        tasks=new ArrayList<>();
    }

    public long getCompanyID() {
        return companyID;
    }

    public void setCompanyID(long companyID) {
        this.companyID = companyID;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public long getSectionID() {
        return sectionID;
    }

    public void setSectionID(int sectionID) {
        this.sectionID = sectionID;
    }

    public int getAvatar() {
        return avatar;
    }

    public void setAvatar(int avatar) {
        this.avatar = avatar;
    }

    public boolean isGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public List<String> getPhone() {
        return phone;
    }

    public void setPhone(ArrayList<String> phone) {
        this.phone = phone;
    }

    public List<String> getEmail() {
        return email;
    }

    public void setEmail(ArrayList<String> email) {
        this.email = email;
    }

    public long getID() {
        return ID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public List<Map<String, Object>> getChats() {
        return chats;
    }

    public List<Map<String, Object>> getNotifications() {
        return notifications;
    }

    public List<Map<String, Object>> getTasks() {
        return tasks;
    }

    public boolean addChat(Map<String, Object> newChat) {
        chats.add(newChat);
        return true;
    }

    public boolean addNotification(Map<String, Object> newNotification) {
        notifications.add(newNotification);
        return true;
    }

    public boolean addTask(Map<String, Object> newTask) {
        notifications.add(newTask);
        return true;
    }

}
