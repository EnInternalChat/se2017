package backend.mdoel;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by lenovo on 2017/5/14.
 */

@Document
public class Company {
    @Id
    private long ID;
    @DBRef
    private Section headSec;
    private String name;
    private String introduction;

    public Section getHeadSec() {
        return headSec;
    }

    public void setHeadSec(Section headSec) {
        this.headSec = headSec;
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
