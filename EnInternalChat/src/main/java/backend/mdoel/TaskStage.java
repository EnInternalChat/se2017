package backend.mdoel;

import backend.util.IdManager;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/31.
 */
@Document
public class TaskStage {
    @Id
    private long ID;
    private String activityID;
    private String content;
    private long startTime;
    private long finishTime;
    @DBRef
    private Collection<Employee> person;
    private Collection<Map<String,String>> stages;

    public TaskStage() {
        ID=IdManager.IdForTaskStage++;
        person=new ArrayList<>();
        stages=new ArrayList<>();
    }

}
