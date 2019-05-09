<?php
/**
 * Created by PhpStorm.
 * User: du
 * Date: 2019/5/9
 * Time: 12:56
 */

/**
 * 弹幕类
 */
class Danmu {

	private $db;

	/**
	 * 构造函数，初始化数据库
	 * Danmu constructor.
	 */
	function __construct() {
		$db = new PDO("sqlite:danmu.db");
		$this->db = $db;
		if ("0" === $this->isExistTable()) {
			$this->createTable();
		}
	}

	/**
	 * 检测表是否已经写了
	 * @return mixed
	 */
	protected function isExistTable() {
		$sql_c = "SELECT COUNT(*) AS count FROM sqlite_master WHERE name=\"danmu\";";
		return $this->db->query($sql_c)->fetchColumn();
	}

	/**
	 * 创建表
	 * @return int
	 */
	protected function createTable() {
		$sql_c = "CREATE TABLE \"danmu\" ( \"id\" integer NOT NULL COLLATE RTRIM PRIMARY KEY AUTOINCREMENT, \"name\" TEXT, \"type\" TEXT, \"text\" TEXT );";
		return $this->db->exec($sql_c);
	}

	/**
	 * 写数据
	 * @param $name
	 * @param $type
	 * @param $text
	 * @return int
	 */
	public function write($name, $type, $text) {
//	    html代码转为字符实体，防止xss攻击
		$name = htmlspecialchars($name);
		$text = htmlspecialchars($text);
		$type = htmlspecialchars($type);

//	    防sql注入
		$name = $this->db->quote($name);
		$text = $this->db->quote($text);
		$type = $this->db->quote($type);
		$sql_w = "INSERT INTO `danmu` (`name`,`type`,`text`)VALUES ({$name},{$type},{$text})";
		return $this->db->exec($sql_w);
	}

	/**
	 * 读数据
	 * @param $offset
	 * @param $limit
	 * @return array
	 */
	public function read($offset, $limit) {
//	    将两个变量转为int
		$offset = intval($offset);
		$limit = intval($limit);
		$offset = $offset > 0 ? $offset * $limit : 0;
		$sql_r = "SELECT * FROM  `danmu` ORDER BY id DESC LIMIT {$limit} OFFSET {$offset}";
		$res = $this->db->query($sql_r)->fetchAll(PDO::FETCH_CLASS);
		return $res;
	}

	/**
	 * 清空数据
	 * @return int
	 */
	public function cleanData() {
		$sql_c = "DELETE FROM danmu";
		return $this->db->exec($sql_c);
	}
}