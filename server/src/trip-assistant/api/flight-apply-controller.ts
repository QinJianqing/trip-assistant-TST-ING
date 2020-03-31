import { ResponseUtils, date_utils } from '@service-fw';
import { flight_apply_dao, FlightApplyGetRes, FlightApplyUpdateRes, FlightApplyDeleteRes, user_dao } from '../dao';
import { v01User } from '../common';

/**
 * 添加机票预订
 */
export async function postFlightApply(ctx) {
  const body = ctx.request.body;
  const param = {
    uid: body.uid,
    passenger_name: body.passenger_name,
    passenger_mobile: body.passenger_mobile,
    departure_flight_number: body.departure_flight_number,
    departure_time: body.departure_time,
    back_flight_number: body.back_flight_number,
    back_time: body.back_time,
    ID_number: body.ID_number,
    flight_apply_submission_time: body.flight_apply_submission_time,
    is_flight_book_succeed: body.is_flight_book_succeed,
    flight_apply_update_time: body.flight_apply_update_time,
    remark: body.remark,
    is_flight_apply_cancel: body.is_flight_apply_cancel
  };
  const flightApplyModel = {
    uid: null,
    passenger_name: null,
    passenger_mobile: null,
    departure_flight_number: null,
    departure_time: null,
    back_flight_number: null,
    back_time: null,
    ID_number: null,
    flight_apply_submission_time: null,
    is_flight_book_succeed: null,
    flight_apply_update_time: null,
    remark: null,
    is_flight_apply_cancel: null
  };
  Object.keys(flightApplyModel).forEach(item => {
    flightApplyModel[item] = param[item];
  });

  const getResult = await user_dao.getUser({
    uid: flightApplyModel.uid,
    is_user_cancel: 0
  });
  if (getResult.length === 0) {
    const userModel = {
      uid: null,
      job_number: null,
      cn_name: null,
      en_name: null,
      mobile: null,
      landline: null,
      mail: null,
      avatar: null,
      is_user_cancel: null
    };
    const uidGetResult = await v01User(flightApplyModel.uid);
    if (uidGetResult === 'ERROR') {
      return ctx.body = ResponseUtils.error<any>({ error_no: 101 });
    }
    if (!uidGetResult) {
      return ctx.body = ResponseUtils.error<any>({ error_no: 103, error_message: 'v01Ldap：uid号无效！' });
    }
    userModel.uid = flightApplyModel.uid;
    userModel.en_name = uidGetResult.displayName;
    userModel.mobile = uidGetResult.mobile.substring(4);
    userModel.mail = uidGetResult.mail;
    userModel.avatar = uidGetResult.thumbnailPhoto;
    userModel.is_user_cancel = 0;
    const insertResult = await user_dao.insertUser(userModel);
    if (insertResult[0] != 0) {
      return ctx.body = ResponseUtils.error({ error_no: 100102 });
    }
  }

  flightApplyModel.flight_apply_submission_time = date_utils.getNowDateString();
  const insertResult = await flight_apply_dao.insertFlightApply(flightApplyModel);
  if (insertResult[0] <= 0) {
    return ctx.body = ResponseUtils.error({ error_no: 100102 });
  }
  const getResult1 = await flight_apply_dao.getFlightApply({ id: insertResult[0] });
  const resData = flight_apply_dao.formatFlightApplyUserViewDb(getResult1[0]);
  return ctx.body = ResponseUtils.normal<FlightApplyGetRes>({
    data: resData
  });
}

/**
 * 删除机票预订
 */
export async function deleteFlightApply(ctx) {
  const param = {
    id: ctx.params.id
  };
  const flightApplyModel = {
    is_flight_apply_cancel: null
  };
  Object.keys(flightApplyModel).forEach(item => {
    flightApplyModel[item] = param[item];
  });

  const getResult = await flight_apply_dao.getFlightApply({ id: param.id, is_flight_apply_cancel: 0 });
  if (getResult.length <= 0) {
    return ctx.body = ResponseUtils.error({
      error_no: 100103,
      error_message: '删除失败，不存在该机票预订！'
    });
  }

  // 删除机票预订
  flightApplyModel.is_flight_apply_cancel = 1;
  const updateResult = await flight_apply_dao.updateFlightApply(param.id, flightApplyModel);
  if (updateResult !== 1) {
    // 删除失败（更新失败）
    return ctx.body = ResponseUtils.error({ error_no: 100103 });
  }

  // 返回删除结果
  ctx.body = ResponseUtils.normal<FlightApplyDeleteRes>({
    data: { isDeleteSuccess: true }
  });
}

/**
 * 更新机票预订
 */
export async function putFlightApply(ctx) {
  const param = {
    id: ctx.params.id
  };
  const flightApplyModel = {
    passenger_name: null,
    passenger_mobile: null,
    departure_flight_number: null,
    departure_time: null,
    back_flight_number: null,
    back_time: null,
    is_flight_book_succeed: null,
    flight_apply_update_time: null,
    remark: null
  };
  Object.keys(flightApplyModel).forEach(item => {
    flightApplyModel[item] = ctx.request.body[item];
  });

  const getResult = await flight_apply_dao.getFlightApply({ id: param.id, is_flight_apply_cancel: 0 });

  if (getResult.length <= 0) {
    return ctx.body = ResponseUtils.error({
      error_no: 100101,
      error_message: '更新失败，不存在该机票预订！'
    });
  }

  flightApplyModel.flight_apply_update_time = date_utils.getNowDateString();
  const updateResult = await flight_apply_dao.updateFlightApply(param.id, flightApplyModel);
  if (updateResult !== 1) {
    // 更新失败
    return ctx.body = ResponseUtils.error({ error_no: 100101 });
  }

  return ctx.body = ResponseUtils.normal<FlightApplyUpdateRes>({
    data: { isUpdateSuccess: true }
  });
}

/**
 * 查询机票预订
 */
export async function getFlightApply(ctx) {
  const query = ctx.request.query;
  const param = {
    id: query.id,
    uid: query.uid,
    en_name: query.en_name,
    job_number: query.job_number,
    mobile: query.mobile,
    passenger_name: query.passenger_name,
    passenger_mobile: query.passenger_mobile,
    departure_flight_number: query.departure_flight_number,
    departure_time: query.departure_time,
    back_flight_number: query.back_flight_number,
    back_time: query.back_time,
    ID_number: query.ID_number,
    flight_apply_submission_time: query.flight_apply_submission_time,
    is_flight_book_succeed: query.is_flight_book_succeed,
    flight_apply_update_time: query.flight_apply_update_time,
    remark: query.remark,
    is_flight_apply_cancel: query.is_flight_apply_cancel,
    search: query.search,
    page_no: query.page_no,
    page_size: query.page_size
  };
  const flightApplyModel = {
    id: null,
    uid: null,
    en_name: null,
    job_number: null,
    mobile: null,
    passenger_name: null,
    passenger_mobile: null,
    departure_flight_number: null,
    departure_time: null,
    back_flight_number: null,
    back_time: null,
    ID_number: null,
    flight_apply_submission_time: null,
    is_flight_book_succeed: null,
    flight_apply_update_time: null,
    remark: null,
    is_flight_apply_cancel: null
  };
  Object.keys(flightApplyModel).forEach(item => {
    flightApplyModel[item] = param[item];
  });

  const getResult = await flight_apply_dao.getFlightApply(flightApplyModel, param.search, param.page_no, param.page_size);
  const resData = flight_apply_dao.formatFlightApplyUserViewDbList(getResult);
  const totalCount = await flight_apply_dao.getFlightCount(flightApplyModel, param.search);
  // 响应数据
  return ctx.body = ResponseUtils.normal<Array<FlightApplyGetRes>>({
    data: resData,
    pageNo: param.page_no,
    pageSize: param.page_size,
    totalCount
  });
}
