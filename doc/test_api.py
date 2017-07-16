#! /usr/bin/env python
# -*- coding: utf-8 -*-
# PTS Script Version 1.0
# Trunner auto-generated test script at Fri Jul 14 19:52:55 CST 2017

from java.lang import String
from java.util import Random
from java.util import Date

# PTS脚本SDK：框架API、常用HTTP请求/响应处理API
from util import PTS
from HTTPClient import NVPair
from HTTPClient import Cookie
from HTTPClient import HTTPRequest
from HTTPClient import CookieModule
from HTTPClient import ShutdownException

# PTS对参数化的相关支持
from com.aliyun.pts import DsvReader
from com.aliyun.pts import ParamManager

# 脚本初始化段，可以设置压测引擎的常用HTTP属性
PTS.HttpUtilities.setUrlEncoding('UTF-8')
PTS.HttpUtilities.setFollowRedirects(True)
PTS.HttpUtilities.setTimeout(120000)
# PTS.HttpUtilities.setKeepAlive(False)
# PTS.HttpUtilities.setUseCookieModule(False)
# PTS.HttpUtilities.setProxyServer('localhost', 8888)
# PTS.Context.setParamDirectory("/Users/fei/Work/trunner/data")

# 支持socket测试, 如TCP\UDP等协议
# import socket

# 设置系统编码
import sys
reload(sys)
sys.setdefaultencoding('utf-8')


params = ParamManager.getInstance()

expiryDate = Date() 
expiryDate.year += 10

class TestRunner:
    
    target = u'https://106.15.186.180/EnInternalChat'
    companyID = u'0'
    admin_sectionID = u'-1'
    sectionID = u'1'
    admin_ID = u'20'
    other_ID = u'13'

    # TestRunner对象的初始化方法，每个线程在创建TestRunner后执行一次该方法
    def __init__(self):
        self.threadContext = PTS.Context.getThreadContext()


    # 主体压测方法，每个线程在测试生命周期内会循环调用该方法
    def __call__(self):
        PTS.Data.delayReports = 1

        statusCode = self.action_company()
        PTS.Framework.setExtraData(statusCode)

        statusCode = self.action_section()
        PTS.Framework.setExtraData(statusCode)

        statusCode = self.action_section_member()
        PTS.Framework.setExtraData(statusCode)

        statusCode = self.action_employees()
        PTS.Framework.setExtraData(statusCode)

        statusCode = self.action_personal()
        PTS.Framework.setExtraData(statusCode)

        statusCode = self.action_read_notice()
        PTS.Framework.setExtraData(statusCode)

        statusCode = self.action_unread_notice()
        PTS.Framework.setExtraData(statusCode)

        statusCode = self.action_send_notice()
        PTS.Framework.setExtraData(statusCode)

        statusCode = self.action_task_type()
        PTS.Framework.setExtraData(statusCode)

        statusCode = self.action_working_task()
        PTS.Framework.setExtraData(statusCode)


        PTS.Data.report()
        PTS.Data.delayReports = 0

    def action_company(self):
        statusCode = [0L, 0L, 0L, 0L]

        headers = [NVPair(u'Accept', u'application/json;charset=UTF-8'),NVPair(u'Content-Type', u'application/json'),]
        result = HTTPRequest().GET(self.target + u'/company/' + self.companyID,[],headers)
        PTS.Framework.addHttpCode(result.getStatusCode(), statusCode)
        if(300 <= result.getStatusCode()):
            PTS.Data.forCurrentTest.success = False
        return statusCode
    
    def action_section(self):
        statusCode = [0L, 0L, 0L, 0L]

        headers = [NVPair(u'Accept', u'application/json;charset=UTF-8'),NVPair(u'Content-Type', u'application/json'),]
        result = HTTPRequest().GET(self.target + u'/company/' + self.companyID + u'/sections/' + self.admin_sectionID,[],headers)
        PTS.Framework.addHttpCode(result.getStatusCode(), statusCode)
        if(300 <= result.getStatusCode()):
            PTS.Data.forCurrentTest.success = False
        return statusCode

    def action_section_member(self):
        statusCode = [0L, 0L, 0L, 0L]

        headers = [NVPair(u'Accept', u'application/json;charset=UTF-8'),NVPair(u'Content-Type', u'application/json'),]
        result = HTTPRequest().GET(self.target + u'/employees/' + self.companyID + u'/' + self.sectionID,[],headers)
        PTS.Framework.addHttpCode(result.getStatusCode(), statusCode)
        if(300 <= result.getStatusCode()):
            PTS.Data.forCurrentTest.success = False
        return statusCode

    def action_employees(self):
        statusCode = [0L, 0L, 0L, 0L]

        headers = [NVPair(u'Accept', u'application/json;charset=UTF-8'),NVPair(u'Content-Type', u'application/json'),]
        result = HTTPRequest().GET(self.target + u'/employees/' + self.companyID ,[],headers)
        PTS.Framework.addHttpCode(result.getStatusCode(), statusCode)
        if(300 <= result.getStatusCode()):
            PTS.Data.forCurrentTest.success = False
        return statusCode

    def action_personal(self):
        statusCode = [0L, 0L, 0L, 0L]

        headers = [NVPair(u'Accept', u'application/json;charset=UTF-8'),NVPair(u'Content-Type', u'application/json'),]
        result = HTTPRequest().GET(self.target + u'/employees/' + self.companyID + u'/' + self.admin_sectionID
                                   + u'/' + self.admin_ID,[],headers)
        PTS.Framework.addHttpCode(result.getStatusCode(), statusCode)
        if(300 <= result.getStatusCode()):
            PTS.Data.forCurrentTest.success = False
        return statusCode

    def action_read_notice(self):
        statusCode = [0L, 0L, 0L, 0L]

        headers = [NVPair(u'Accept', u'application/json;charset=UTF-8'),NVPair(u'Content-Type', u'application/json'),]
        result = HTTPRequest().GET(self.target + u'/notifications/received/read/' + self.admin_ID,[],headers)
        PTS.Framework.addHttpCode(result.getStatusCode(), statusCode)
        if(300 <= result.getStatusCode()):
            PTS.Data.forCurrentTest.success = False
        return statusCode

    def action_unread_notice(self):
        statusCode = [0L, 0L, 0L, 0L]

        headers = [NVPair(u'Accept', u'application/json;charset=UTF-8'),NVPair(u'Content-Type', u'application/json'),]
        result = HTTPRequest().GET(self.target + u'/notifications/received/unread/' + self.admin_ID,[],headers)
        PTS.Framework.addHttpCode(result.getStatusCode(), statusCode)
        if(300 <= result.getStatusCode()):
            PTS.Data.forCurrentTest.success = False
        return statusCode

    def action_send_notice(self):
        statusCode = [0L, 0L, 0L, 0L]

        headers = [NVPair(u'Accept', u'application/json;charset=UTF-8'),NVPair(u'Content-Type', u'application/json'),]
        result = HTTPRequest().GET(self.target + u'/notifications/sent/' + self.other_ID,[],headers)
        PTS.Framework.addHttpCode(result.getStatusCode(), statusCode)
        if(300 <= result.getStatusCode()):
            PTS.Data.forCurrentTest.success = False
        return statusCode

    def action_task_type(self):
        statusCode = [0L, 0L, 0L, 0L]

        headers = [NVPair(u'Accept', u'application/json;charset=UTF-8'),NVPair(u'Content-Type', u'application/json'),]
        result = HTTPRequest().GET(self.target + u'/tasks/all/' + self.companyID,[],headers)
        PTS.Framework.addHttpCode(result.getStatusCode(), statusCode)
        if(300 <= result.getStatusCode()):
            PTS.Data.forCurrentTest.success = False
        return statusCode

    def action_working_task(self):
        statusCode = [0L, 0L, 0L, 0L]

        headers = [NVPair(u'Accept', u'application/json;charset=UTF-8'),NVPair(u'Content-Type', u'application/json'),]
        result = HTTPRequest().GET(self.target + u'/tasks/working/' + self.companyID + u'/' + self.other_ID,[],headers)
        PTS.Framework.addHttpCode(result.getStatusCode(), statusCode)
        if(300 <= result.getStatusCode()):
            PTS.Data.forCurrentTest.success = False
        return statusCode

# 调用施压引擎施压。第一个参数是事务名，可以为中文；第二个参数是执行事务方法的方法名；第三个统一写TestRunner
PTS.Framework.instrumentMethod(u'获取公司信息', 'action_company', TestRunner)
PTS.Framework.instrumentMethod(u'获取公司部门信息', 'action_section', TestRunner)
PTS.Framework.instrumentMethod(u'获取公司人员信息', 'action_employees', TestRunner)
PTS.Framework.instrumentMethod(u'获取部门人员信息', 'action_section_member', TestRunner)
PTS.Framework.instrumentMethod(u'获取个人信息', 'action_personal', TestRunner)
PTS.Framework.instrumentMethod(u'获取已读通知', 'action_read_notice', TestRunner)
PTS.Framework.instrumentMethod(u'获取未读通知', 'action_unread_notice', TestRunner)
PTS.Framework.instrumentMethod(u'获取发送通知', 'action_send_notice', TestRunner)
PTS.Framework.instrumentMethod(u'获取任务类型', 'action_task_type', TestRunner)
PTS.Framework.instrumentMethod(u'获取进行任务', 'action_working_task', TestRunner)