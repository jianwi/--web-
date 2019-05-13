"use strict"
/*
* @Author: du
* @Date:   2019-04-28 21:01:37
* @Last Modified by:   du
* @Last Modified time: 2019-05-13 17:11:21
*/
// 初始化
// 给导航设置事件监听
var nav=document.getElementsByClassName("header nav")[0].children;

// for(let item of nav){
// 	item.setAttribute("onclick","showItem(this);return false;");
// }
// 
// ie和edage把node不当iterable，所以弃用for...of

for (var i = nav.length - 1; i >= 0; i--) {
	nav[i].setAttribute("onclick","showItem(this);return false;");
}
// 首页上背景图片
showItem(document.getElementsByName("sy")[0]);
/**
 * 导航切换事件
 * @return {[type]} [description]
 */
function showItem(ele){
	var item=ele.name;
	switch (item) {
		case "bg":
			break;
		case "fk":
			changeText(item);
			return;
			break;
		default:
			break;
	}
	changeBackground(item);
	changePic(item);
	changeText(item);
}
/**
 * 修改背景图片
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function changeBackground(name){
	var main=document.getElementById("main");
	main.style.backgroundImage=`url("res/${name}/${name}(1).jpg")`
}
/**
 * 修改文字
 * @param  {[type]} name [description]模块名称
 * @return {[type]}      [description]
 */
function changeText(name){
	main.innerHTML=document.getElementById(name).innerHTML;
}
/**
 * 把文件中的图片放上来
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
function changePic(name){
	var pic_group=document.getElementById("pic-group");
	// pic_group.style.display="block";
	var images=pic_group.children;
	for (var i = 0; i < images.length; i++) {
		let p=i+1;
		images[i].src=`res/${name}/${name}(${p}).jpg`;
	}
}

/**
 * 背景随机切换
 * @return {[type]} [description]
 */
function autoChange(){
	var pic_group=document.getElementById("pic-group");
	var images=pic_group.children;
	var count=images.length;
	let t=Math.floor(Math.random()*count);
	let src=images[t].src;
	main.style.backgroundImage=`url("${src}")`
}
// 自动切换背景
setInterval("autoChange()",3000);

/**
 * 提交数据
 * @return {[type]} [description]
 */
function submitData(ele) {
	var name=n[1].value;
	var text=ly[1].value;
	var mk=module[1].value;
	if (name===" " || text==="" || mk==="") {
		alert("请把数据输入完整再提交");
		return;
	}else{
		var con=confirm("提交以后，全世界都能看到您发表的弹幕，确认要提交？");
	}
	if (con) {
		$.post("http://cron.jianwi.cn/2019/php/?action=sm",{
			"name":name,
			"text":text,
			"type":mk
		},(res,err)=>{
			if (res) {
				alert("恭喜你，提交成功")
			}
		})
	}
}
/**
 * 弹幕初始化
 * @return {[type]} [description]
 */
function danmuInit(){
	var pattern=/\[c=([\S\s]*?)\]([\S\s]*?)\[\/c\]/;
	$.getJSON("http://cron.jianwi.cn/2019/php/",(res,erro)=>{
		// console.log(res);
		$("#danmu").empty();
		for (let dm_data of res){
			var dm_ubb=pattern.exec(dm_data.text)
			if (dm_ubb){
				// console.log(dm_ubb);
				var danmu=`${dm_data.name}@${dm_data.type}:${dm_ubb[2]}`;
				var dm_box=`
				<div class="dm">
				<span style="color:${dm_ubb[1]}">
					${danmu}
				</span>
				</div>
				`;
			}else {
			var danmu=`${dm_data.name}@${dm_data.type}:${dm_data.text}`;
				var dm_box=`
				<div class="dm">
				<span>
					${danmu}
				</span>
				</div>
				`;
			}
			$("#danmu").append(dm_box);
		}
		danMu();
	})
}
danmuInit()
/**
 * css3动画监听
 */
$(".dm").on('animationend',function(){
	this.style="";
});
/**
 * 开始弹幕
 * @return {[type]} [description]
 */
function danMu() {
	$(".dm").attr("style","");
	var danmu=document.getElementsByClassName("dm");
	dh.innerHTML="";
	for (var index = danmu.length - 1; index >= 0; index--) {
        var dm=danmu[index];
		var win_width=window.innerWidth;
		let width=dm.clientWidth;
    	dm.style=`right:-${width}rem;`;
 	var keyframes=`
		@keyframes ani${index}{
		from {
			right: -${width}rem;
		}
		to{
			right:${win_width}rem;
		}
		}
	`
	dh.innerHTML+=keyframes;
	let time =Math.floor(Math.random() * 120+180);
	let top=Math.floor(Math.random() * 10+1);
	dm.style=`animation:ani${index} ${time}s ease-out 0s;margin-top:${top}rem`;
	}
}
//45s刷新一次弹幕数据
setInterval("danmuInit()",45000);
// 彩蛋
$("#github").click(()=>{window.open("https://github.com/jianwi/-","_blank")})