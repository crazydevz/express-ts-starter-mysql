// import UserModel from '@/resources/user/user.model';
// import token from '@/utils/token';
import { MySql } from '@/utils/helpers/mysql';

class UserService {
	// private user = UserModel;

	/**
	 * Register a new user
	 */

	/**
	 * Attempt to login a user
	 */

	constructor() {
		MySql.getInstance();
	}

	public async getAllUsers(): Promise<any> {
		try {
			const query: string = 'SELECT * FROM users';
			const data = await MySql.query(query);
			return data;
		} catch (error) {
			throw new Error('Unable to fetch user');
		}
	}

	public async getUser(id: string): Promise<any> {
		try {
			const query: string = 'SELECT * FROM users WHERE id = ?';
			const params: any[] = [id];
			const data = await MySql.query(query, params);
			return data;
		} catch (err) {
			throw new Error('Unable to fetch user');
		}
	}

	public async updateUser(id: string, body: Body): Promise<any> {
		try {
			const update = Object.entries({ ...body })
				.map(([key, value]) => `${key} = '${value}'`)
				.join(', ');

			const query: string = `
			UPDATE users
			SET
				${update}
			WHERE
				id = ${id}`;

			const data = await MySql.query(query);
			return data;
		} catch (err: any) {
			throw new Error(err.message);
		}
	}

	public async deleteUser(id: string): Promise<any> {
		const query = `
		DELETE FROM users
		WHERE
		id = ${id}`;

		const data = await MySql.query(query);
		return data;
	}
}

export default UserService;
