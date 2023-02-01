import request from "./request";
import qs from 'qs'

// 登录返回 token
export const adminLoginApi = (
  data: AdminLoginData
): PromiseRes<AdminLoginRes> => request.post("/admin/login", data);

// 获取当前用户登录信息
export const getAdminInfoApi = (): PromiseRes<AdminInfoRes> =>
  request.get("/admin/info");

// 获取用户数据列表
export const getAdminList = (params: AdminListParams):PromiseRes<AdminListRes> =>
  request.get("/admin/list", { params });

// 修改用户信息
export const updateAdmin = (id: number, data: AdminObjItf):PromiseRes => request.post(`/admin/update/${id}`, data)

// 获取所有角色
export const getRoleListAll = ():PromiseRes<RoleObjItf[]> => request.get('/role/listAll')

// 获取指定用户的角色
export const getAdminRoleById = (adminId: number):PromiseRes<RoleObjItf[]> => request.get(`/admin/role/${adminId}`)

// 给用户分配角色(数组用拼接的方法传参)
// export const updateAdminRole = (data: {
//   adminId: number
//   roleIds: string  // join
// }):PromiseRes => request.post(`/admin/role/update`, null, { params: data })
// 给用户分配角色(用qs.stringify来拼接)
export const updateAdminRole = (data: {
  adminId: number
  roleIds: string  // qs.stringify
}):PromiseRes => request.post(`/admin/role/update`, qs.stringify(data))

// 获取首页数据
export const getAdminStat = ():PromiseRes<IndexDataItf> => request.get('http://kumanxuan1.f3322.net:8360/admin/stat')