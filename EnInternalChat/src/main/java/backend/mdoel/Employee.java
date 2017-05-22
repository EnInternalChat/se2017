package backend.mdoel;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/7.
 */

@Document
public class Employee {
    @Id
    private long ID;
    private long companyID;
    private long sectionID;
    private int avatar;
    private String name;
    private String password;
    private String position;
    private Collection<String> phone;
    private Collection<String> email;
    private Collection<Map<String, Object>> chats;
    private Collection<Map<String, Object>> notifications;
    private Collection<Map<String, Object>> tasks;
    private boolean gender;
    private boolean active;

    public Employee() {
        sectionID=companyID=233;
        avatar=2;
        password=position=name="dfsgsdfhfgjdfj";
        phone=new ArrayList<>();
        email=new ArrayList<>();
        chats=new ArrayList<>();
        notifications=new ArrayList<>();
        tasks=new ArrayList<>();
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
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

    public Collection<String> getPhone() {
        return phone;
    }

    public void setPhone(Collection<String> phone) {
        this.phone = phone;
    }

    public Collection<String> getEmail() {
        return email;
    }

    public void setEmail(Collection<String> email) {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<Map<String, Object>> getChats() {
        return chats;
    }

    public Collection<Map<String, Object>> getNotifications() {
        return notifications;
    }

    public Collection<Map<String, Object>> getTasks() {
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

    public boolean addPhone(String newPhone) {
        if(!phone.contains(newPhone)) return false;
        phone.add(newPhone);
        return true;
    }

    public boolean addMail(String newEmail) {
        if(!email.contains(newEmail)) return false;
        email.add(newEmail);
        return true;
    }
}
