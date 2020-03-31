import Router from 'koa-router';
import * as vehicle_arrange_controller from './vehicle-arrange-controller';

const router = new Router();
router.prefix('/');

/**
 * @api {POST} /vehicle_arrange 添加用车安排
 * @apiDescription 添加用车安排
 * @apiVersion 1.0.0
 * @apiName postVehicleArrange
 * @apiGroup vehicle_arrange
 *
 * @apiParam (query) {string} [uid] 提交“用车申请”用户的uid号
 * @apiParam (query) {string} [passenger_mobile] 乘车人手机号码
 * @apiParam (query) {string} [driver_name] 司机中文名
 * @apiParam (query) {string} [driver_mobile] 司机手机号码
 * @apiParam (query) {string} [voiture_number] 车牌号
 * @apiParam (query) {string} [voiture_type] 车型：奔驰车、上海通用别克GL8商务车、马自达8商务车...
 * @apiParam (query) {string} [voiture_color] 车辆颜色
 * @apiParam (query) {string} [voiture_seats] 车辆座位数
 * @apiParam (query) {string} [remaining_seats] 剩余座位数
 * @apiParam (query) {number} [vehicle_arrange_departure_time] 车辆安排出发时间
 * @apiParam (query) {number} [vehicle_arrange_departure_place] 车辆安排出发地点
 * @apiParam (query) {number} [vehicle_arrange_reach_place] 车辆安排到达地点
 * @apiParam (query) {number} [vehicle_arrange_is_round] 车辆安排是否往返（0单程， 1往返）
 * @apiParam (query) {number} [is_vehicle_arrange] 是否已安排车辆（0未安排，1已安排，2不安排）
 * @apiParam (query) {string} [remark] 备注
 * @apiParam (query) {string} [vehicle_arrange_add_time] 车辆安排添加时间
 * @apiParam (query) {string} [vehicle_arrange_update_time] 车辆安排更新时间
 * @apiParam (query) {number} [is_vehicle_arrange_cancel] 是否已删除（0未删除，1已删除）
 */
router.post('/vehicle_arrange', vehicle_arrange_controller.postVehicleArrange);

/**
 * @api {DELETE} /vehicle_arrange/:id 删除用车安排
 * @apiDescription 删除用车安排
 * @apiVersion 1.0.0
 * @apiName deleteVehicleArrange
 * @apiGroup vehicle_arrange
 *
 * @apiParam (path) {vehicle_arrange} [id] id
 */
router.delete('/vehicle_arrange/:id', vehicle_arrange_controller.deleteVehicleArrange);

/**
 * @api {PUT} /vehicle_arrange/:id 更新用车安排
 * @apiDescription 更新用车安排
 * @apiVersion 1.0.0
 * @apiName putVehicleArrange
 * @apiGroup vehicle_arrange
 *
 * @apiParam (query) {string} [passenger_mobile] 乘车人手机号码
 * @apiParam (query) {string} [driver_name] 司机中文名
 * @apiParam (query) {string} [driver_mobile] 司机手机号码
 * @apiParam (query) {string} [voiture_number] 车牌号
 * @apiParam (query) {string} [voiture_type] 车型：奔驰车、上海通用别克GL8商务车、马自达8商务车...
 * @apiParam (query) {string} [voiture_color] 车辆颜色
 * @apiParam (query) {string} [voiture_seats] 车辆座位数
 * @apiParam (query) {string} [remaining_seats] 剩余座位数
 * @apiParam (query) {number} [vehicle_arrange_departure_time] 车辆安排出发时间
 * @apiParam (query) {number} [vehicle_arrange_departure_place] 车辆安排出发地点
 * @apiParam (query) {number} [vehicle_arrange_reach_place] 车辆安排到达地点
 * @apiParam (query) {number} [vehicle_arrange_is_round] 车辆安排是否往返（0单程， 1往返）
 * @apiParam (query) {number} [is_vehicle_arrange] 是否已安排车辆（0未安排，1已安排，2不安排）
 * @apiParam (query) {string} [remark] 备注
 * @apiParam (query) {string} [vehicle_arrange_update_time] 车辆安排更新时间
 * @apiParam (query) {number} [is_vehicle_arrange_cancel] 是否已删除（0未删除，1已删除）
 */
router.put('/vehicle_arrange/:id', vehicle_arrange_controller.putVehicleArrange);

/**
 * @api {GET} /vehicle_arrange 查询用车安排
 * @apiDescription 查询用车安排
 * @apiVersion 1.0.0
 * @apiName getVehicleArrange
 * @apiGroup vehicle_arrange
 *
 * @apiParam (query) {number} [id] id
 * @apiParam (query) {string} [uid] 提交“用车申请”用户的uid号
 * @apiParam (query) {string} [passenger_mobile] 乘车人手机号码
 * @apiParam (query) {string} [driver_name] 司机中文名
 * @apiParam (query) {string} [driver_mobile] 司机手机号码
 * @apiParam (query) {string} [voiture_number] 车牌号
 * @apiParam (query) {string} [voiture_type] 车型：奔驰车、上海通用别克GL8商务车、马自达8商务车...
 * @apiParam (query) {string} [voiture_color] 车辆颜色
 * @apiParam (query) {string} [voiture_seats] 车辆座位数
 * @apiParam (query) {string} [remaining_seats] 剩余座位数
 * @apiParam (query) {string} [vehicle_arrange_departure_time] 车辆安排出发时间
 * @apiParam (query) {string} [vehicle_arrange_departure_place] 车辆安排出发地点
 * @apiParam (query) {string} [vehicle_arrange_reach_place] 车辆安排到达地点
 * @apiParam (query) {string} [vehicle_arrange_is_round] 车辆安排是否往返（0单程， 1往返）
 * @apiParam (query) {string} [is_vehicle_arrange] 是否已安排车辆（0未安排，1已安排，2不安排）
 * @apiParam (query) {string} [remark] 备注
 * @apiParam (query) {string} [vehicle_arrange_add_time] 车辆安排添加时间
 * @apiParam (query) {string} [vehicle_arrange_update_time] 车辆安排更新时间
 * @apiParam (query) {string} [is_vehicle_arrange_cancel] 是否已删除（0未删除，1已删除）
 * @apiParam (query) {string} [search] 关键词搜索
 * @apiParam (query) {string} [page_no] 页码
 * @apiParam (query) {string} [page_size] 页大小
 */
router.get('/vehicle_arrange', vehicle_arrange_controller.getVehicleArrange);

export default router;