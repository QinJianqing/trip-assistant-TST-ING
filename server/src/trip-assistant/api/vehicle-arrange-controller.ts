import { ResponseUtils, date_utils } from '@service-fw';
import { vehicle_arrange_dao, VehicleArrangeGetRes, VehicleArrangeDeleteRes, VehicleArrangeUpdateRes } from '../dao';

/**
 * 添加用车安排
 */
export async function postVehicleArrange(ctx) {
  const body = ctx.request.body;
  const param = {
    uid: body.uid,
    passenger_mobile: body.passenger_mobile,
    driver_name: body.driver_name,
    driver_mobile: body.driver_mobile,
    voiture_number: body.voiture_number,
    voiture_type: body.voiture_type,
    voiture_color: body.voiture_color,
    voiture_seats: body.voiture_seats,
    remaining_seats: body.remaining_seats,
    vehicle_arrange_departure_time: body.vehicle_arrange_departure_time,
    vehicle_arrange_departure_place: body.vehicle_arrange_departure_place,
    vehicle_arrange_reach_place: body.vehicle_arrange_reach_place,
    vehicle_arrange_is_round: body.vehicle_arrange_is_round,
    is_vehicle_arrange: body.is_vehicle_arrange,
    remark: body.remark,
    vehicle_arrange_add_time: body.vehicle_arrange_add_time,
    vehicle_arrange_update_time: body.vehicle_arrange_update_time,
    is_vehicle_arrange_cancel: body.is_vehicle_arrange_cancel
  };
  const vehicleArrangeModel = {
    uid: null,
    passenger_mobile: null,
    driver_name: null,
    driver_mobile: null,
    voiture_number: null,
    voiture_type: null,
    voiture_color: null,
    voiture_seats: null,
    remaining_seats: null,
    vehicle_arrange_departure_time: null,
    vehicle_arrange_departure_place: null,
    vehicle_arrange_reach_place: null,
    vehicle_arrange_is_round: null,
    is_vehicle_arrange: null,
    remark: null,
    vehicle_arrange_add_time: null,
    vehicle_arrange_update_time: null,
    is_vehicle_arrange_cancel: null
  };
  Object.keys(vehicleArrangeModel).forEach(item => {
    vehicleArrangeModel[item] = param[item];
  });

  vehicleArrangeModel.vehicle_arrange_add_time = date_utils.getNowDateString();
  const insertResult = await vehicle_arrange_dao.insertVehicleArrange(vehicleArrangeModel);
  if (insertResult[0] <= 0) {
    return ctx.body = ResponseUtils.error({ error_no: 100102 });
  }
  const getResult1 = await vehicle_arrange_dao.getVehicleArrange({ id: insertResult[0] });
  const resData = vehicle_arrange_dao.formatVehicleApplyVehicleArrangeUserViewDb(getResult1[0]);
  return ctx.body = ResponseUtils.normal<VehicleArrangeGetRes>({
    data: resData
  });
}

/**
 * 删除用车安排
 */
export async function deleteVehicleArrange(ctx) {
  const param = {
    id: ctx.params.id
  };
  const vehicleArrangeModel = {
    is_vehicle_arrange_cancel: null
  };
  Object.keys(vehicleArrangeModel).forEach(item => {
    vehicleArrangeModel[item] = param[item];
  });

  const getResult = await vehicle_arrange_dao.getVehicleArrange({ id: param.id, is_vehicle_arrange_cancel: 0 });
  if (getResult.length === 0) {
    return ctx.body = ResponseUtils.error({
      error_no: 100103,
      error_message: '删除失败，不存在该用车安排！'
    });
  }

  // 删除用车安排
  vehicleArrangeModel.is_vehicle_arrange_cancel = 1;
  const updateResult = await vehicle_arrange_dao.updateVehicleArrange(param.id, vehicleArrangeModel);
  if (updateResult !== 1) {
    // 删除失败（更新失败）
    return ctx.body = ResponseUtils.error({ error_no: 100103 });
  }

  // 返回删除结果
  ctx.body = ResponseUtils.normal<VehicleArrangeDeleteRes>({
    data: { isDeleteSuccess: true }
  });
}

/**
 * 更新用车安排
 */
export async function putVehicleArrange(ctx) {
  const param = {
    id: ctx.params.id
  };
  const vehicleArrangeModel = {
    passenger_mobile: null,
    driver_name: null,
    driver_mobile: null,
    voiture_number: null,
    voiture_type: null,
    voiture_color: null,
    voiture_seats: null,
    remaining_seats: null,
    vehicle_arrange_departure_time: null,
    vehicle_arrange_departure_place: null,
    vehicle_arrange_reach_place: null,
    vehicle_arrange_is_round: null,
    is_vehicle_arrange: null,
    remark: null,
    vehicle_arrange_update_time: null,
    is_vehicle_arrange_cancel: null
  };
  Object.keys(vehicleArrangeModel).forEach(item => {
    vehicleArrangeModel[item] = ctx.request.body[item];
  });

  const getResult = await vehicle_arrange_dao.getVehicleArrange({ id: param.id, is_vehicle_arrange_cancel: 0 });

  if (getResult.length <= 0) {
    return ctx.body = ResponseUtils.error({
      error_no: 100101,
      error_message: '更新失败，不存在该用车安排！'
    });
  }

  vehicleArrangeModel.vehicle_arrange_update_time = date_utils.getNowDateString();
  const updateResult = await vehicle_arrange_dao.updateVehicleArrange(param.id, vehicleArrangeModel);
  if (updateResult !== 1) {
    // 更新失败
    return ctx.body = ResponseUtils.error({ error_no: 100101 });
  }

  return ctx.body = ResponseUtils.normal<VehicleArrangeUpdateRes>({
    data: { isUpdateSuccess: true }
  });
}

/**
 * 查询用车安排
 */
export async function getVehicleArrange(ctx) {
  const query = ctx.request.query;
  const param = {
    id: query.id,
    uid: query.uid,
    passenger_mobile: query.passenger_mobile,
    driver_name: query.driver_name,
    driver_mobile: query.driver_mobile,
    voiture_number: query.voiture_number,
    voiture_type: query.voiture_type,
    voiture_color: query.voiture_color,
    voiture_seats: query.voiture_seats,
    remaining_seats: query.remaining_seats,
    vehicle_arrange_departure_time: query.vehicle_arrange_departure_time,
    vehicle_arrange_departure_place: query.vehicle_arrange_departure_place,
    vehicle_arrange_reach_place: query.vehicle_arrange_reach_place,
    vehicle_arrange_is_round: query.vehicle_arrange_is_round,
    is_vehicle_arrange: query.is_vehicle_arrange,
    remark: query.remark,
    vehicle_arrange_add_time: query.vehicle_arrange_add_time,
    vehicle_arrange_update_time: query.vehicle_arrange_update_time,
    is_vehicle_arrange_cancel: query.is_vehicle_arrange_cancel,
    search: query.search,
    page_no: query.page_no,
    page_size: query.page_size
  };
  const vehicleArrangeModel = {
    id: null,
    uid: null,
    passenger_mobile: null,
    driver_name: null,
    driver_mobile: null,
    voiture_number: null,
    voiture_type: null,
    voiture_color: null,
    voiture_seats: null,
    remaining_seats: null,
    vehicle_arrange_departure_time: null,
    vehicle_arrange_departure_place: null,
    vehicle_arrange_reach_place: null,
    vehicle_arrange_is_round: null,
    is_vehicle_arrange: null,
    remark: null,
    vehicle_arrange_add_time: null,
    vehicle_arrange_update_time: null,
    is_vehicle_arrange_cancel: null
  };
  Object.keys(vehicleArrangeModel).forEach(item => {
    vehicleArrangeModel[item] = param[item];
  });

  const getResult = await vehicle_arrange_dao.getVehicleArrange(vehicleArrangeModel, param.search, param.page_no, param.page_size);
  const resData = vehicle_arrange_dao.formatVehicleApplyVehicleArrangeUserViewDbList(getResult);
  const totalCount = await vehicle_arrange_dao.getVehicleArrangeCount(vehicleArrangeModel, param.search);
  // 响应数据
  return ctx.body = ResponseUtils.normal<Array<VehicleArrangeGetRes>>({
    data: resData,
    pageNo: param.page_no,
    pageSize: param.page_size,
    totalCount
  });
}