package backend.mdoel;

import java.util.ArrayList;

/**
 * Created by lenovo on 2017/5/14.
 * database model,not for front end
 */

public class Section {
    private long ID;
    private long leaderID;
    private long parrentSectionID;
    private ArrayList<Long> membersID;
    private ArrayList<Long> childrenSectionsID;
    private String name;
    private String note;

    public Section() {
        membersID=new ArrayList<>();
        childrenSectionsID=new ArrayList<>();
    }

    public void setID(long ID) {
        this.ID = ID;
    }

    public void setLeaderID(long leaderID) {
        this.leaderID = leaderID;
    }

    public void setParrentSectionID(long parrentSectionID) {
        this.parrentSectionID = parrentSectionID;
    }

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

    public long getParrentSectionID() {
        return parrentSectionID;
    }

    public boolean addChildSection(long ID) {
        childrenSectionsID.add(ID);
        return true;
    }

    public ArrayList<Long> getMembersID() {
        return membersID;
    }

    public boolean addMember(long ID) {
        membersID.add(ID);
        return true;
    }

    public ArrayList<Long> getChildrenSectionsID() {
        return childrenSectionsID;
    }

    public String getName() {
        return name;
    }

    public String getNote() {
        return note;
    }
}
