/**
 * Mysql externs for npm package "mysql"
 * See documentation at https://github.com/mysqljs/mysql
 * Those types are extrapolated (deduced) from usages seen on the documentation.
 */
typedef MySQLConfig = {
	?host:String,
	?port:Int,
	?user:String,
	?password:String,
	database:String
}

typedef MySQL = {
	createConnection:Dynamic->MySQLConnection,
	format:String->Array<String>->Dynamic
}

typedef MySQLConnection = {
	connect:Void->Void,
	changeUser:Dynamic->(Dynamic->Void)->Void,
	escape:String->String,
	escapeId:String->String,
	pause:(Dynamic->Void)->Void,
	end:Void->Void,
	query:String->?Array<Dynamic>->?(Dynamic->Array<Dynamic>->Array<Dynamic>->Void)->Dynamic
}

enum UserExistsResult {
	Yes;
	Missing;
	WrongPassword;
	Error(err:js.lib.Error);
}

enum FromTokenResult {
	User(login:String);
	Missing;
	Error(err:js.lib.Error);
}

enum QueryResult<T> {
	OK(data:T);
	Error(err:js.lib.Error);
}