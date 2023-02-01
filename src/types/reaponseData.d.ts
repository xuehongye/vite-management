interface AdminLoginData {
    username: string;
    password: string;
  }
  
  type PromiseRes<T = {}> = Promise<ManageResult<T>>;
  
  interface ManageResult<T = {}> {
    code?: number;
    errno?: number;
    data: T;
    message?: string;
    errmsg?: string
  }
  // 登录返回token
  interface AdminLoginRes {
    token: string;
    tokenHead: string;
  }
  // 当前用户信息
  interface AdminInfoRes {
    menus: [];
  }
  
  interface AdminListParams {
    keyword: string;
    pageNum: number;
    pageSize: number;
  }
  
  interface AdminListRes {
      total: number
      totalPage: number
      pageNum: number
      pageSize: number
      list: {}[]
  }