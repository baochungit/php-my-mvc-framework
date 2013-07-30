<?php defined( '_CEXEC' ) or die( 'Restricted access' );

	class Database {
		
		private $conn = null;
		private $settings = null;
		private $num_affected_rows = 0;
		private $status = 0; // not ready

		function __construct($settings = null) {
			
			if (is_array($settings)) {
				$this->settings = $settings;
			}
		}
		
		function set($settings = null) {
			$this->close();		
			$this->settings = $settings;
		}

		function connect() {
			
			if (!isset($this->settings['params'])) {
				return false;
			}
			
			$params = $this->settings['params'];
			$this->conn = @mysql_connect($params['host'], $params['username'], $params['password']) or die('Failed to connect to database');
			
			if ($this->conn) {
				$this->status = 1; // connected

				if (mysql_select_db($params['dbname'], $this->conn)) {
					if (strlen($params['charset']) > 0) {
						$this->query("SET NAMES '{$params['charset']}'");
					}
					
					return true;
				}
				else {
					$this->status = 2; // db not found					
					return false;
				}
			}
			
			return false;
		}
		
		function getStatus() {
			return $this->status;
		}

		function query($sql = '') {			
			if (strlen(trim($sql)) > 0) {
				$result = mysql_query($sql, $this->conn);

				if ($result === false) {
					$this->num_affected_rows = 0;
					return false;
				}
				elseif ($result === true) {
					$this->num_affected_rows = mysql_affected_rows($this->conn);
					return true;
				}
				else {
					$this->num_affected_rows = 0;
					return new DatabaseResult($result);
				}
			}
			
			return false;
		}
		
		function numAffectedRows() {
			return $this->num_affected_rows;
		}

		function getErrno() {
			return mysql_errno($this->conn);
		}

		function getError() {
			return mysql_error($this->conn);
		}

		function close() {			
			$res = false;
			
			if ($status != 0) {
				$res = mysql_close($this->conn);
				$this->status = 0;
				$num_affected_rows = 0;
				$conn = null;
			}

			return $res;
		}
		
	}
	
	class DatabaseResult {
		
		private $result = null;
		
		function __construct($result = null) {
			$this->result = $result;
		}
		
		function setResult($result) {
			$this->result = $result;
		}
		
		function fetch($type = MYSQL_ASSOC) {
			if ($this->result == null) {
				return false;
			}
			
			return mysql_fetch_array($this->result, $type);
		}

		function fetchAll($type = MYSQL_ASSOC) {
			if ($this->result == null) {
				return false;
			}
			
			$rows = array();
			while ($row = $this->fetch()) {
				$rows[] = $row;
			}
			
			return $rows;
		}

		function numRows() {
			if ($this->result == null) {
				return false;
			}
			
			return mysql_num_rows($this->result);
		}

		function free() {
			if ($this->result == null) {
				return false;
			}

			return mysql_free_result($this->result);
		} 
		
		function seek($pos) {
			if ($this->result == null) {
				return false;
			}

			return mysql_data_seek($this->result, $pos);
		}
		
	}
?>
