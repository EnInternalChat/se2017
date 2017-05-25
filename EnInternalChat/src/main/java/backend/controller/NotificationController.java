package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * Created by lenovo on 2017/5/2.
 */
@Controller
public class NotificationController {
    @Autowired
    DataProcessCenter dataProcessCenter;

    @ResponseBody
    @RequestMapping(value = "/notifications", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<Map<String,Object>> allNotifications() {
        List<Map<String,Object>> notifications= dataProcessCenter.notifications();
        return notifications;
    }
}
