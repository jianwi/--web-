/*
* @Author: du
* @Date:   2019-05-08 18:42:58
* @Last Modified by:   du
* @Last Modified time: 2019-05-09 10:52:12
*/

$.ajaxSettings.async = false;
$.getJSON('http://cron.jianwi.cn/2019/php/index.php?mode=2',function(data){
 
//每条弹幕发送间隔
var looper_time=3*1000;
var items=data;
//弹幕总数
var total=data.length;
//是否首次执行
var run_once=true;
//弹幕索引
var index=0;
//先执行一次
barrager();
function  barrager(){
 
  if(run_once){
      //如果是首次执行,则设置一个定时器,并且把首次执行置为false
      looper=setInterval(barrager,looper_time);                
      run_once=false;
  }
  //发布一个弹幕
  $('body').barrager(items[index]);
  //索引自增
  index++;
  //所有弹幕发布完毕，清除计时器。
  if(index == total){
 
      clearInterval(looper);
      return false;
  }
}
});              