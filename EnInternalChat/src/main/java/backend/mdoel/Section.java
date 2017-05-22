package backend.mdoel;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by lenovo on 2017/5/14.
 * database model,not for front end
 */

@Document
public class Section {
    @Id
    private long ID;
    private long companyID;
    private long leaderID;
    //private long parrentSectionID;
    private Collection<Long> membersID;
    @DBRef
    private Collection<Section> childrenSections;
    private String name;
    private String note;

    public Section() {
        membersID=new HashSet<>();
        childrenSections=new HashSet<>();
    }

    public Section(long leaderID, String name, String note) {
        this();
        this.leaderID = leaderID;
        this.name = name;
        this.note = note;
    }

    public Collection<Section> getChildrenSectionsID() {
        return childrenSections;
    }

    public void setChildrenSectionsID(Set<Section> childrenSections) {
        this.childrenSections = childrenSections;
    }

    public long getCompanyID() {
        return companyID;
    }

    public void setCompanyID(long companyID) {
        this.companyID = companyID;
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public void setLeaderID(long leaderID) {
        this.leaderID = leaderID;
    }

//    public void setParrentSectionID(long parrentSectionID) {
//        this.parrentSectionID = parrentSectionID;
//    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public long getID() {
        return ID;
    }

    public long getLeaderID() {
        return leaderID;
    }

//    public long getParrentSectionID() {
//        return parrentSectionID;
//    }

    public Collection<Long> getMembersID() {
        return membersID;
    }

    public boolean addMember(long ID) {
        membersID.add(ID);
        return true;
    }

    public String getName() {
        return name;
    }

    public String getNote() {
        return note;
    }

    public boolean addChildSec(Section section) {
        childrenSections.add(section);
        return true;
    }

    public boolean deleteChildSec(Section section) {
        childrenSections.remove(section);
        return true;
    }
}
