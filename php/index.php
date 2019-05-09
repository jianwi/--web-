<?php
/**
 * @Author: du
 * @Date:   2019-05-08 00:32:18
 * @Last Modified by:   du
 * @Last Modified time: 2019-05-09 13:09:13
 */
// 设置同源跨域
header("Access-Control-Allow-Origin: *");
require_once "danmu.php";
$danmu = new Danmu();
if (isset($_POST['name']) && isset($_POST['text']) && isset($_POST['type'])) {
	echo $danmu->write($_POST['name'], $_POST['type'], $_POST['text']);
	return;
} else {
	echo json_encode($danmu->read(0, 20), JSON_UNESCAPED_UNICODE);
}
