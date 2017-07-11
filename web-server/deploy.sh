#!/bin/bash
check_result=`rpm -qa | grep "nginx"`
if [ -n "${check_result}" ];
then
    echo "install"
else
    echo "not install"
fi


# https://github.com/EnInternalChat/se2017/archive/master.zip
