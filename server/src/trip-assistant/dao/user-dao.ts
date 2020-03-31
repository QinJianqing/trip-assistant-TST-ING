import { trip_db } from './trip-db';
import { UserDb } from './user-types';

// 添加用户
async function insertUser(user: UserDb) {
  return (await trip_db.table('user')
    .insert(user)) as Array<number>;
}

// 获取用户
async function getUser(user?: UserDb, pageNo?: number, pageSize?: number) {
  let sql = trip_db.table('user').select('*');
  for (const key in user) {
    if (user[key] === undefined) {
      delete user[key];
    }
  }
  if (user) {
    sql = sql.where(user);
  }
  if (pageNo && pageSize) {
    sql = sql.limit(pageSize).offset(pageSize * (pageNo - 1));
  }
  return (await sql) as Array<UserDb>;
}


export const user_dao = {
  insertUser,
  getUser
};