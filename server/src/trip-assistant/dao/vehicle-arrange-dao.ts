import { trip_db } from './trip-db';
import { VehicleArrangeDb, VehicleApplyVehicleArrangeUserViewDb } from './vehicle-arrange-types';

// 添加用车安排
async function insertVehicleArrange(vehicleArrange: VehicleArrangeDb) {
  return (await trip_db.table('vehicle_arrange')
    .insert(vehicleArrange)) as Array<number>;
}

// 更新用车安排
async function updateVehicleArrange(id: number, vehicleArrange: VehicleArrangeDb) {
  return (await trip_db.table('vehicle_arrange')
    .update(vehicleArrange)
    .where('id', id)) as number;
}

// 获取用车安排
async function getVehicleArrange(vehicleArrange?: VehicleArrangeDb, search?: string, pageNo?: number, pageSize?: number) {
  let sql = trip_db.table('vehicle_apply_vehicle_arrange_user_view').select('*');
  for (const key in vehicleArrange) {
    if (vehicleArrange[key] === undefined) {
      delete vehicleArrange[key];
    }
  }
  if (vehicleArrange) {
    sql = sql
      .where(vehicleArrange);
  }
  if (search) {
    const searchSql = '%' + search + '%';
    sql = sql
      .orWhere('uid', 'like', searchSql)
      .orWhere('en_name', 'like', searchSql)
      .orWhere('job_number', 'like', searchSql)
      .orWhere('mobile', 'like', searchSql)
      .orWhere('driver_name', 'like', searchSql)
      .orWhere('driver_mobile', 'like', searchSql)
      .orWhere('voiture_number', 'like', searchSql)
      .orWhere('voiture_type', 'like', searchSql)
      .orWhere('voiture_color', 'like', searchSql)
      .orWhere('voiture_seats', 'like', searchSql)
      .orWhere('remaining_seats', 'like', searchSql)
      .orWhere('vehicle_arrange_departure_time', 'like', searchSql)
      .orWhere('vehicle_arrange_departure_place', 'like', searchSql)
      .orWhere('vehicle_arrange_reach_place', 'like', searchSql)
      .orWhere('vehicle_arrange_is_round', 'like', searchSql)
      .orWhere('remark', 'like', searchSql)
      .orWhere('vehicle_arrange_add_time', 'like', searchSql)
      .orWhere('vehicle_arrange_update_time', 'like', searchSql)
      .orWhere('passenger_name', 'like', searchSql)
      .orWhere('passenger_mobile', 'like', searchSql)
      .orWhere('vehicle_apply_departure_place', 'like', searchSql)
      .orWhere('vehicle_apply_reach_place', 'like', searchSql)
      .orWhere('vehicle_apply_detail_place', 'like', searchSql)
      .orWhere('flight_number', 'like', searchSql)
      .orWhere('flight_departure_time', 'like', searchSql)
      .orWhere('flight_reach_time', 'like', searchSql)
      .orWhere('cost_center', 'like', searchSql)
      .orWhere('project_budget_no', 'like', searchSql)
      .orWhere('vehicle_apply_submission_time', 'like', searchSql);
  }
  if (pageNo && pageSize) {
    sql = sql.limit(pageSize).offset(pageSize * (pageNo - 1));
  }
  return (await sql) as Array<VehicleApplyVehicleArrangeUserViewDb>;
}

// 获取用车安排总数
async function getVehicleArrangeCount(vehicleArrange?: VehicleArrangeDb, search?: string) {
  let sql = trip_db.table('vehicle_apply_vehicle_arrange_user_view').count('*', { as: 'count' });
  if (vehicleArrange) {
    sql = sql
      .where(vehicleArrange);
  }
  if (search) {
    const searchSql = '%' + search + '%';
    sql = sql
    .orWhere('uid', 'like', searchSql)
    .orWhere('en_name', 'like', searchSql)
    .orWhere('job_number', 'like', searchSql)
    .orWhere('mobile', 'like', searchSql)
    .orWhere('driver_name', 'like', searchSql)
    .orWhere('driver_mobile', 'like', searchSql)
    .orWhere('voiture_number', 'like', searchSql)
    .orWhere('voiture_type', 'like', searchSql)
    .orWhere('voiture_color', 'like', searchSql)
    .orWhere('voiture_seats', 'like', searchSql)
    .orWhere('remaining_seats', 'like', searchSql)
    .orWhere('vehicle_arrange_departure_time', 'like', searchSql)
    .orWhere('vehicle_arrange_departure_place', 'like', searchSql)
    .orWhere('vehicle_arrange_reach_place', 'like', searchSql)
    .orWhere('vehicle_arrange_is_round', 'like', searchSql)
    .orWhere('remark', 'like', searchSql)
    .orWhere('vehicle_arrange_add_time', 'like', searchSql)
    .orWhere('vehicle_arrange_update_time', 'like', searchSql)
    .orWhere('passenger_name', 'like', searchSql)
    .orWhere('passenger_mobile', 'like', searchSql)
    .orWhere('vehicle_apply_departure_place', 'like', searchSql)
    .orWhere('vehicle_apply_reach_place', 'like', searchSql)
    .orWhere('vehicle_apply_detail_place', 'like', searchSql)
    .orWhere('flight_number', 'like', searchSql)
    .orWhere('flight_departure_time', 'like', searchSql)
    .orWhere('flight_reach_time', 'like', searchSql)
    .orWhere('cost_center', 'like', searchSql)
    .orWhere('project_budget_no', 'like', searchSql)
    .orWhere('vehicle_apply_submission_time', 'like', searchSql);
  }
  const result = await sql;
  return result[0]['count'] as number;
}

function formatVehicleApplyVehicleArrangeUserViewDbList(dbList: string | Array<VehicleApplyVehicleArrangeUserViewDb>) {
  if (dbList === '') {
    return [];
  }
  const vehicleArrangeList = [];
  for (let i = 0; i < dbList.length; i++) {
    const vehicleArrange = formatVehicleApplyVehicleArrangeUserViewDb(dbList[i]);
    vehicleArrangeList.push(vehicleArrange);
  }
  return vehicleArrangeList;
}

function formatVehicleApplyVehicleArrangeUserViewDb(db: string | VehicleApplyVehicleArrangeUserViewDb) {
  const vehicleArrange = {
    id: db['id'],
    uid: db['uid'],
    enName: db['en_name'],
    jobNumber: db['job_number'],
    mobile: db['mobile'],
    passengerName: db['passenger_name'],
    passengerMobile: db['passenger_mobile'],
    vehicleApplyDeparturePlace: db['vehicle_apply_departure_place'],
    vehicleApplyReachPlace: db['vehicle_apply_reach_place'],
    vehicleApplyIsRound: db['vehicle_apply_is_round'],
    vehicleApplyDetailPlace: db['vehicle_apply_detail_place'],
    flightNumber: db['flight_number'],
    flightDepartureTime: db['flight_departure_time'],
    flightReachTime: db['flight_reach_time'],
    costCenter: db['cost_center'],
    projectBudgetNo: db['project_budget_no'],
    vehicleApplySubmissionTime: db['vehicle_apply_submission_time'],
    driverName: db['driver_name'],
    driverMobile: db['driver_mobile'],
    voitureNumber: db['voiture_number'],
    voitureType: db['voiture_type'],
    voitureColor: db['voiture_color'],
    voitureSeats: db['voiture_seats'],
    remainingSeats: db['remaining_seats'],
    vehicleArrangeDepartureTime: db['vehicle_arrange_departure_time'],
    vehicleArrangeDeparturePlace: db['vehicle_arrange_departure_place'],
    vehicleArrangeReachPlace: db['vehicle_arrange_reach_place'],
    vehicleArrangeIsRound: db['vehicle_arrange_is_round'],
    isVehicleArrange: db['is_vehicle_arrange'],
    remark: db['remark'],
    vehicleArrangeAddTime: db['vehicle_arrange_add_time'],
    vehicleArrangeUpdateTime: db['vehicle_arrange_update_time'],
    isVehicleArrangeCancel: db['is_vehicle_arrange_cancel']
  };
  return vehicleArrange;
}

export const vehicle_arrange_dao = {
  insertVehicleArrange,
  getVehicleArrange,
  formatVehicleApplyVehicleArrangeUserViewDbList,
  formatVehicleApplyVehicleArrangeUserViewDb,
  updateVehicleArrange,
  getVehicleArrangeCount
};