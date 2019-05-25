#!/usr/bin/env node 
/*
__dirname：    获得当前执行文件所在目录的完整目录名
__filename：   获得当前执行文件的带有完整绝对路径的文件名
process.cwd()：获得当前执行node命令时候的文件夹目录名 
*/

const fs=require("fs");
const path=require("path");

const arg=process.argv;
const param=arg.slice(2);
const curdir=__dirname;
//console.log('curdir==',curdir);


const result = fs.readdirSync(curdir);

/**
 * 
 * @param {String} curdir 
 * @param {Array} paths 
 * @param {Object} result 
 */
function getDirMap(curdir,paths,result){
    if(result===undefined){
        result={
            dir:{
                type:"dir",
                paths:[],
                path:curdir
            }
        };
    }

    paths.forEach((item,index)=>{
        const filePath=path.resolve(path.join(curdir,item));
        const fileDetail=fs.statSync(filePath);
        const newFileObj={
            type:"unknow",
        }
        if(fileDetail.isFile()){
            newFileObj.type="file";
            newFileObj.path=filePath
            result.dir.paths.push(newFileObj);
        }else if(fileDetail.isDirectory()){
            newFileObj.type="dir";
            newFileObj.path=filePath;
            
            newFileObj.dir={
                paths:[]
            }
            const newdir=newFileObj;
            const newdirFiles=fs.readdirSync(filePath);
            result.dir.paths.push(newdir);
            getDirMap(filePath,newdirFiles,newdir);
        }
    });

    return result;
}

/**
 * 复制目标目录
 * @param {String} targetPath 
 */
function copy(targetPath,copyPath){
    //console.log('tagetPath=============',targetPath);
 
    const dirMap=getDirMap(targetPath,fs.readdirSync(targetPath));
    //console.log('dirMap',JSON.stringify(dirMap));
    const dir=dirMap.dir;
    function _copy(targetPath){

    }
    //console.log(JSON.stringify(dir));
    
    dir.paths.forEach((pathitem,index)=>{
        var curitem=pathitem;
        if(pathitem.type==="file"){
           
            const basefileName=path.basename(pathitem.path);
            //console.log('文件',basefileName);
            const copyFilePath=path.join(copyPath,basefileName);
            fs.copyFileSync(pathitem.path,copyFilePath)
            console.log(copyFilePath);
            
        }else if(pathitem.type==="dir"){

            if(!fs.existsSync(pathitem.path)){
                console.log('目录不存在');
            }
            //console.log('目录-----',path.basename(pathitem.path));
            console.log('目录',fs.readdirSync(pathitem.path));
        }

    })
    return;
    for(var dirObj in dir.paths){
        
        if(dirObj.type==="file"){
            console.log('目录下的文件',fs.readdirSync(dir.path));
        }else if(dirObj.type==="dir"){
            if(fs.existsSync(dir.path)){
                //fs.mkdirSync(dir.path);
            }
            console.log('目录下的文件',fs.readdirSync(dir.path));
        }
    }
}

//var dirMap=getDirMap(curdir,result);

copy(curdir,"J:\\myProject\\wx-create\\copytest");


//console.log(result);

let type,option;

if(param.length>1){
    switch(param[0]){
        case "create":
            
        break;

        case "create-page":

        break;

        case "create-component":
        
        break;

        
    }
}
else{

}










console.log(arg);
console.log(param);


