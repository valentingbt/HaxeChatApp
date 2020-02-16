package db;

import haxe.crypto.BCrypt;
import TypeDefinitions;

class Token {

	/**
	 * Create a authentication token for a user
	 * @param connection  MySQLConnection The connection to the database
	 * @param login  String user login to insert
	 * @param durationInMinute After this duration, the token must expire
	 */
     public static function createToken(connection:MySQLConnection, login:String, durationInMinute:Float = 0, callback:QueryResult<String>->Void) {
		var token:String = BCrypt.generateSalt().substr(0, 32);
		var durationInMs:Float = durationInMinute * 60 * 1000;
		connection.query("INSERT INTO token(id, user_id, expiration)  VALUES(?,?,?)", [
			token,
			login,
			(durationInMinute <= 0 ? "DEFAULT" : formatDateForMySQL(DateTools.delta(Date.now(), durationInMs)))
		], (error:js.lib.Error, results, fields) -> {
				if (error != null) {
					callback(Error(error));
					return;
				}
				callback(OK(token));
			});
	}

	/**
	 * Get user login from token if the token is valid
	 * @param connection connection  MySQLConnection The connection to the database
	 * @param token  String user login to insert
	 * @param callback 
	 */
	public static function fromToken(connection:MySQLConnection, token:String, callback:FromTokenResult->Void):Void {
		connection.query("DELETE FROM token WHERE expiration < now()", (error:js.lib.Error, results, fields) -> {
			connection.query("SELECT u.login, t.expiration FROM user u INNER JOIN token t ON u.login = t.user_id WHERE t.id = ?", [token],
				(error:js.lib.Error, results, fields) -> {
					if (error != null) {
						callback(Error(error));
						return;
					}
					if (results.length <= 0) {
						callback(Missing);
						return;
					}
					callback(User(results[0].login));
				});
		});
    }
    
    
	private static function formatDateForMySQL(date:Date):String {
		return DateTools.format(date, "%Y-%m-%d_%H:%M:%S");
	}
}