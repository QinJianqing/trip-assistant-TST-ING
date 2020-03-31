import { trip_db } from './trip-db';
import { FlightApplyDb, FlightApplyUserViewDb } from './flight-apply-types';

// 添加机票预订
async function insertFlightApply(flightApply: FlightApplyDb) {
  return (await trip_db.table('flight_apply')
    .insert(flightApply)) as Array<number>;
}

// 删除机票预订
async function deleteFlightApply(id: number) {
  return await trip_db.table('flight_apply')
    .del()
    .where('id', id);
}

// 更新机票预订
async function updateFlightApply(id: number, flightApply: FlightApplyDb) {
  return (await trip_db.table('flight_apply')
    .update(flightApply)
    .where('id', id)) as number;
}

// 获取机票预订
async function getFlightApply(flightApply?: FlightApplyDb, search?: string, pageNo?: number, pageSize?: number) {
  let sql = trip_db.table('flight_apply_user_view').select('*');
  for (const key in flightApply) {
    if (flightApply[key] === undefined) {
      delete flightApply[key];
    }
  }
  if (flightApply) {
    sql = sql
      .where(flightApply);
  }
  if (search) {
    const searchSql = '%' + search + '%';
    sql = sql
      .orWhere('uid', 'like', searchSql)
      .orWhere('en_name', 'like', searchSql)
      .orWhere('job_number', 'like', searchSql)
      .orWhere('mobile', 'like', searchSql)
      .orWhere('passenger_name', 'like', searchSql)
      .orWhere('passenger_mobile', 'like', searchSql)
      .orWhere('departure_flight_number', 'like', searchSql)
      .orWhere('departure_time', 'like', searchSql)
      .orWhere('back_flight_number', 'like', searchSql)
      .orWhere('back_time', 'like', searchSql)
      .orWhere('ID_number', 'like', searchSql)
      .orWhere('flight_apply_submission_time', 'like', searchSql)
      .orWhere('flight_apply_update_time', 'like', searchSql)
      .orWhere('remark', 'like', searchSql);
  }
  if (pageNo && pageSize) {
    sql = sql.limit(pageSize).offset(pageSize * (pageNo - 1));
  }
  return (await sql) as Array<FlightApplyUserViewDb>;
}

// 获取机票预订总数
async function getFlightCount(flightApply?: FlightApplyDb, search?: string) {
  let sql = trip_db.table('flight_apply_user_view').count('*', { as: 'count' });
  if (flightApply) {
    sql = sql
      .where(flightApply);
  }
  if (search) {
    const searchSql = '%' + search + '%';
    sql = sql
      .orWhere('uid', 'like', searchSql)
      .orWhere('en_name', 'like', searchSql)
      .orWhere('job_number', 'like', searchSql)
      .orWhere('mobile', 'like', searchSql)
      .orWhere('passenger_name', 'like', searchSql)
      .orWhere('passenger_mobile', 'like', searchSql)
      .orWhere('departure_flight_number', 'like', searchSql)
      .orWhere('departure_time', 'like', searchSql)
      .orWhere('back_flight_number', 'like', searchSql)
      .orWhere('back_time', 'like', searchSql)
      .orWhere('ID_number', 'like', searchSql)
      .orWhere('flight_apply_submission_time', 'like', searchSql)
      .orWhere('flight_apply_update_time', 'like', searchSql)
      .orWhere('remark', 'like', searchSql);
  }
  const result = await sql;
  return result[0]['count'] as number;
}

function formatFlightApplyUserViewDbList(dbList: string | Array<FlightApplyUserViewDb>) {
  if (dbList === '') {
    return [];
  }
  const flightList = [];
  for (let i = 0; i < dbList.length; i++) {
    const flightApply = formatFlightApplyUserViewDb(dbList[i]);
    flightList.push(flightApply);
  }
  return flightList;
}

function formatFlightApplyUserViewDb(flightDb: string | FlightApplyUserViewDb) {
  const flightApply = {
    id: flightDb['id'],
    uid: flightDb['uid'],
    enName: flightDb['en_name'],
    jobNumber: flightDb['job_number'],
    mobile: flightDb['mobile'],
    passengerName: flightDb['passenger_name'],
    passengerMobile: flightDb['passenger_mobile'],
    departureFlightNumber: flightDb['departure_flight_number'],
    departureTime: flightDb['departure_time'],
    backFlightNumber: flightDb['back_flight_number'],
    backTime: flightDb['back_time'],
    IDNumber: flightDb['ID_number'],
    flightApplySubmissionTime: flightDb['flight_apply_submission_time'],
    isFlightBookSucceed: flightDb['is_flight_book_succeed'],
    flightApplyUpdateTime: flightDb['flight_apply_update_time'],
    remark: flightDb['remark'],
    isFlightApplyCancel: flightDb['is_flight_apply_cancel']
  };
  return flightApply;
}

export const flight_apply_dao = {
  insertFlightApply,
  updateFlightApply,
  deleteFlightApply,
  getFlightApply,
  getFlightCount,
  formatFlightApplyUserViewDbList,
  formatFlightApplyUserViewDb
};
