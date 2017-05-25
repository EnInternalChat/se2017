package backend.controller;

import backend.mdoel.Company;
import backend.mdoel.Section;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by lenovo on 2017/5/26.
 */

@Controller
@RequestMapping(value = "/company")
public class CompanyController {
    @Autowired
    DataProcessCenter dataProcessCenter;

    @ResponseBody
    @RequestMapping(value = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Company companyData() {
        return dataProcessCenter.findComByID((long) 0);
    }

    @ResponseBody
    @RequestMapping(value = "/sections", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Section sectionData() {
        return dataProcessCenter.findSecByID((long) 0);
    }
}
