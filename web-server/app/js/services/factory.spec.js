'use strict';

describe('Factories mails test', function() {
    var factory;
    var api;
    
    beforeEach(function() {
        module('app');

        inject(function(mails, API) {
            factory = mails;
            api = API;
        })

        var notices = [
            {
                ID: 0,
                companyID: 0,
                content: "这是一条公司破产程序员辞职了，策划被解雇，产品经理跑了的通知",
                senderName: "caocun",
                sentTime: "2017-06-21T11:45:36Z",
                title: "老总带钱跑啦！",
                fold: "read"
            },
            {
                ID: 1,
                companyID: 0,
                content: "这是一条公司破产程序员辞职了，策划被解雇，产品经理跑了的通知",
                senderName: "caocun",
                sentTime: "2017-06-21T11:45:36Z",
                title: "老总带钱跑啦！",
                fold: "unread"
            },
            {
                ID: 2,
                companyID: 0,
                content: "这是一条公司破产程序员辞职了，策划被解雇，产品经理跑了的通知",
                senderName: "caocun",
                sentTime: "2017-06-21T11:45:36Z",
                title: "老总带钱跑啦！",
                fold: "send"
            }
        ];



        spyOn(api, 'get_receive_notice').add.callFake(function(is_read) {
            if(is_read)
                return [notices[0]];
            else
                return [notices[1]];
        });

        spyOn(api, 'get_send_notice').add.callFake(function() {
            return [notices[2]];
        });

        spyOn(api, 'read_notice').add.callFake(function(id) {
            if(id === 1)
                notices[1].fold = "read";
            return true;
        });

        spyOn(api, 'find_notice').add.callFake(function(id) {
            if(id == notices[0].ID)
                return 0;
            else
                return 1;
        });

        spyOn(api, 'delete_received_notice').add.callFake(function(id) {
            notices.splice(id, 0);
            return true;
        });

        spyOn(api, 'delete_send_notice').add.callFake(function(id) {
            notices.splice(id, 0);
            return true;
        });

        spyOn(api, 'loading').add.callFake(function() {
            return;
        });

        spyOn(api, 'stop_loading').add.callFake(function() {
            return;
        });
    });

    it('Should have function', function() {
        expect(angular.isFunction(factory.get_mails)).toBe(true);
        expect(angular.isFunction(factory.get_detail)).toBe(true);
        expect(angular.isFunction(factory.delete_notice)).toBe(true);
    })

    it('Should get 3 mails', function() {
        var res = factory.get_mails('');
        expect(res.length).toBe(3);
    })

    it('Should get mail detail', function() {
        var res = factory.get_detail(0);

        expect(res.ID).toBe(0);
    })

    it('Should delete a notice', function() {
        factory.delete_notice(1);
        var res = factory.get_mails('');
        expect(res.length).toBe(2);
    })
})

describe("Factories tasks test", function() {
    var factory;
    var api;

    beforeEach(function() {
        module('app');

        inject(function(tasks, API) {
            factory = tasks;
            api = API;
        })

        var tasks = [
        {
            ID: 0,
            companyID: 0,
            content: "这是一条公司破产程序员辞职了，策划被解雇，产品经理跑了的通知",
            senderName: "caocun",
            sentTime: "2017-06-21T11:45:36Z",
            title: "老总带钱跑啦！",
            fold: "read"
        },
        {
            ID: 1,
            companyID: 0,
            content: "这是一条公司破产程序员辞职了，策划被解雇，产品经理跑了的通知",
            senderName: "caocun",
            sentTime: "2017-06-21T11:45:36Z",
            title: "老总带钱跑啦！",
            fold: "unread"
        },
        {
            ID: 2,
            companyID: 0,
            content: "这是一条公司破产程序员辞职了，策划被解雇，产品经理跑了的通知",
            senderName: "caocun",
            sentTime: "2017-06-21T11:45:36Z",
            title: "老总带钱跑啦！",
            fold: "send"
        }
        ];
    })
})