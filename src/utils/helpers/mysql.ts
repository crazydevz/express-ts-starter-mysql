import mysql2 from 'mysql2/promise';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
const options = {
	host: MYSQL_HOST,
	user: MYSQL_USER,
	password: MYSQL_PASSWORD,
	database: MYSQL_DATABASE,
};

export class MySql {
	private static instance: MySql;
	private static connection: mysql2.Connection;

	private contructor() {}

	public static getInstance(): MySql {
		if (!MySql.instance) {
			MySql.instance = new MySql();
		}

		return MySql.instance;
	}

	static async createConnection(): Promise<any> {
		console.log('options', options);
		MySql.connection = await mysql2.createConnection(options);
		return MySql.connection;
	}

	static async query(sql: string, params: any[] = []): Promise<any> {
		const [rows, fields] = await MySql.connection.execute(sql, params);
		return rows;
	}
}
