#!/bin/bash

arg=${2:-master}

submitWithComment(){
    git add . ;
    git commit -m "$1" ;
    git push origin $arg ;
    echo "成功提交";
    # exit 0;
}


if [ -n '$1' ]; then 
    submitWithComment $1;
else 
    echo "请输入提交说明：";
fi