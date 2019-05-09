<?php
/**
 * Created by PhpStorm.
 * User: du
 * Date: 2019/5/9
 * Time: 12:58
 */
require_once 'danmu.php';
$danmu=new Danmu();
if (isset($_GET['pw'])&&$_GET['pw']=="123"){
    echo $danmu->cleanData();
}else{
    echo "不允许的操作";
}
