package backend.mdoel;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by lenovo on 2017/5/14.
 */
public class Company {
    @Id
    private long ID;
    private long headSecID;
    private String name;
    private String introduction;
    private List<Section> sections;

    public Company() {
        sections=new ArrayList<>();
    }

    public long getHeadSecID() {
        return headSecID;
    }

    public void setHeadSecID(long headSecID) {
        this.headSecID = headSecID;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public long getID() {
        return ID;
    }

    public String getName() {
        return name;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public void setName(String name) {
        this.name = name;
    }
}
