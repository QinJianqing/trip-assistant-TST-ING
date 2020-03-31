import Router from 'koa-router';
import * as flight_apply_controller from './flight-apply-controller';

const router = new Router();
router.prefix('/');

/**
 * @api {POST} /flight_apply 添加机票预订
 * @apiDescription 添加机票预订
 * @apiVersion 1.0.0
 * @apiName postFlightApply
 * @apiGroup flight_apply
 *
 * @apiParam (query) {string} [uid] 提交“机票预订”用户的uid号
 * @apiParam (query) {string} [passenger_name] 登机人/客人姓名
 * @apiParam (query) {string} [passenger_mobile] 登机人手机号码
 * @apiParam (query) {string} [departure_flight_number] 航班号（去程）
 * @apiParam (query) {string} [departure_time] 出发时间
 * @apiParam (query) {string} [back_flight_number] 航班号（返程）
 * @apiParam (query) {string} [back_time] 返回时间
 * @apiParam (query) {string} [ID_number] 身份证号
 * @apiParam (query) {string} [flight_apply_submission_time] 机票预订提交时间
 * @apiParam (query) {number} [is_flight_book_succeed] 是否预定成功（0预订失败，1预订成功，2待预订）
 * @apiParam (query) {number} [flight_apply_update_time] 机票预订更新时间
 * @apiParam (query) {string} [remark] 备注
 * @apiParam (query) {number} [is_flight_apply_cancel] 是否已删除（0未删除，1已删除）
 */
router.post('/flight_apply', flight_apply_controller.postFlightApply);

/**
 * @api {DELETE} /flight_apply/:id 删除机票预订
 * @apiDescription 删除机票预订
 * @apiVersion 1.0.0
 * @apiName deleteFlightApply
 * @apiGroup flight_apply
 *
 * @apiParam (path) {flight_apply} [id] id
 */
router.delete('/flight_apply/:id', flight_apply_controller.deleteFlightApply);

/**
 * @api {PUT} /flight_apply/:id 更新机票预订
 * @apiDescription 更新机票预订
 * @apiVersion 1.0.0
 * @apiName putFlightApply
 * @apiGroup flight_apply
 *
 * @apiParam (query) {string} [passenger_name] 登机人/客人姓名
 * @apiParam (query) {string} [passenger_mobile] 登机人手机号码
 * @apiParam (query) {string} [departure_flight_number] 航班号（去程）
 * @apiParam (query) {string} [departure_time] 出发时间
 * @apiParam (query) {string} [back_flight_number] 航班号（返程）
 * @apiParam (query) {string} [back_time] 返回时间
 * @apiParam (query) {number} [is_flight_book_succeed] 是否预定成功（0预订失败，1预订成功，2待预订）
 * @apiParam (query) {number} [flight_apply_update_time] 机票预订更新时间
 * @apiParam (query) {string} [remark] 备注
 */
router.put('/flight_apply/:id', flight_apply_controller.putFlightApply);

/**
 * @api {GET} /flight_apply 查询机票预订
 * @apiDescription 查询机票预订
 * @apiVersion 1.0.0
 * @apiName getFlightApply
 * @apiGroup flight_apply
 *
 * @apiParam (query) {number} [id] id
 * @apiParam (query) {string} [uid] 提交“机票预订”用户的uid号
 * @apiParam (query) {string} [en_name] 英文名
 * @apiParam (query) {string} [job_number] 工号
 * @apiParam (query) {string} [mobile] 手机号
 * @apiParam (query) {string} [passenger_name] 登机人/客人姓名
 * @apiParam (query) {string} [passenger_mobile] 登机人手机号码
 * @apiParam (query) {string} [departure_flight_number] 航班号（去程）
 * @apiParam (query) {string} [departure_time] 出发时间
 * @apiParam (query) {string} [back_flight_number] 航班号（返程）
 * @apiParam (query) {string} [back_time] 返回时间
 * @apiParam (query) {string} [ID_number] 身份证号
 * @apiParam (query) {string} [flight_apply_submission_time] 机票预订提交时间
 * @apiParam (query) {string} [is_flight_book_succeed] 是否预定成功（0预订失败，1预订成功，2待预订）
 * @apiParam (query) {string} [flight_apply_update_time] 机票预订更新时间
 * @apiParam (query) {string} [remark] 备注
 * @apiParam (query) {string} [is_flight_apply_cancel] 是否已删除（0未删除，1已删除）
 * @apiParam (query) {string} [search] 关键词搜索
 * @apiParam (query) {string} [page_no] 页码
 * @apiParam (query) {string} [page_size] 页大小
 */
router.get('/flight_apply', flight_apply_controller.getFlightApply);

export default router;