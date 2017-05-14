package backend.mdoel;

import org.springframework.data.annotation.Id;

import java.util.ArrayList;

/**
 * Created by lenovo on 2017/5/14.
 */
public class Company {
    @Id
    private long ID;
    private String name;
    private ArrayList<Section> sections;

    public Company() {
        sections=new ArrayList<>();
    }

    public long getID() {
        return ID;
    }

    public String getName() {
        return name;
    }

    public ArrayList<Section> getSections() {
        return sections;
    }

    public boolean addSection(Section section) {
        sections.add(section);
        return true;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public void setName(String name) {
        this.name = name;
    }
}
