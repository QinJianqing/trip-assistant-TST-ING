/**
 * 每个模块的错误码梯度递增 50
 */
export const errorMessages = new Map([
  [101, 'v01Ldap：内部错误'],
  [102, 'v01Ldap：用户名或密码无效'],
  [103, 'v01Ldap：用户信息无效'],
  [100000, '未知错误'],
  [100001, '不存在该用户'], // 用户相关
  [100002, '该用户已经存在，不能重复添加'],
  [100050, '检测到尚未登录，请先登录'], // 登录相关
  [100051, '密码错误'],
  [100052, 'accessToken过期'],
  [100053, 'cPubResultN错误'],
  [100054, 'Diffie-Hellman不成功，请尝试重新连接'],
  [100055, 'accessToken无效'],
  [100100, '数据库出错'], // 数据库相关
  [100101, '更新失败'],
  [100102, '添加失败'],
  [100103, '删除失败'],
  [100150, '参数错误'], // 统一的参数相关
  [100151, '参数错误, 参数不能为空']
]);
