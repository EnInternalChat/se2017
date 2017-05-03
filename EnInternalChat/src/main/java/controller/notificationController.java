package controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/2.
 */
@Controller
public class notificationController {
    @ResponseBody
    @RequestMapping(value = "/notifications", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public List<Map<String,Object>> allNotifications() {
        List<Map<String,Object>> notifications=new ArrayList<>();
        Map<String,Object> resMap=new HashMap<>();
        resMap.put("notificationID",233);
        resMap.put("senderID",2344);
        resMap.put("type","meeting");
        resMap.put("time","2017-04-05T13:02:32.537Z");
        resMap.put("section",123);
        resMap.put("content","meeting afternoon!");
        resMap.put("read",false);

        notifications.add(resMap);
        resMap.put("type","simple");
        resMap.put("content","doctor.cao is watching you");
        resMap.put("time","2013-01-05T13:02:12.522Z");

        notifications.add(resMap);

        return notifications;
    }
}
