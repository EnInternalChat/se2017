package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by lenovo on 2017/5/2.
 */

@Controller
@CrossOrigin
public class RootController {
    @Autowired
    DataProcessCenter dataProcessCenter;

    @ResponseBody
    @RequestMapping(value = "/login.do", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public void logindo(@RequestParam("name") String name,@RequestParam("pwd") String password) {

    }
}
