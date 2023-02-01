interface AdminObjItf {
    id?: number
    username?: string
    nickName?: string
    email?: string
    password?: string
    note?: string
    status?: number
    roleLists?: {}[]
}

interface AdminRoleFormData {
    userRoles: RoleObjItf[],
    roleLists: RoleObjItf[]
    id: number
}