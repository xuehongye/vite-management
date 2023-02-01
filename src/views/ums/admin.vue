<template>
  <div class="content">
    <el-scrollbar height="100%">
      <el-card shadow="always" class="box-card">
        <div class="d-flex jc-between">
          <div class="d-flex ai-center">
            <el-icon :size="20"><Tickets /></el-icon>
            <span class="ml-1">数据列表</span>
          </div>
          <el-button type="primary" @click="addAdmin">添加</el-button>
        </div>
      </el-card>
      <div class="mt-2">
        <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
          border
        >
          <el-table-column prop="id" label="编号" width="80" />
          <el-table-column prop="username" label="账号" />
          <el-table-column prop="nickName" label="姓名" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column label="添加时间">
            <template #default="scope">
              {{ formateDate(scope.row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column label="最后登录">
            <template #default="scope">
              {{ formateDate(scope.row.loginTime) }}
            </template>
          </el-table-column>
          <el-table-column label="是否启用" width="80" align="center">
            <template #default="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-space>
                <el-button text type="primary" @click="editRole(row.id)"
                  >分配角色</el-button
                >
                <el-button text type="primary" @click="editAdmin(row)"
                  >编辑</el-button
                >
              </el-space>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="d-flex jc-end mt-1">
        <el-pagination
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 20, 39]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-scrollbar>
    <EditAdmin :visible="visible" :form="rowData" @close="closeDialog" />
    <EditRole :visible="visibleRole" :form="roleData" @close="closeRoleDialog"/>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, onMounted } from "vue";
import { getAdminList, getRoleListAll, getAdminRoleById } from "@/request/api";
import { formateDate } from "@/utils";
import EditAdmin from "./components/EditAdmin.vue";
import EditRole from "./components/EditRole.vue";
import { Tickets } from "@element-plus/icons-vue";
const state = reactive<{
  tableData: {}[];
  pageNum: number;
  pageSize: number;
  keyword: string;
  total: number;
  loading: boolean;
  visible: boolean;
  rowData: AdminObjItf;
  visibleRole: boolean;
  roleData: AdminRoleFormData
}>({
  tableData: [],
  pageNum: 1,
  pageSize: 20,
  keyword: "",
  total: 0,
  loading: false,
  visible: false,
  rowData: {},
  visibleRole: false,
  roleData: {
    userRoles: [],
    roleLists: [],
    id: 0
  }
});
let {
  total,
  tableData,
  pageNum,
  pageSize,
  keyword,
  loading,
  visible,
  rowData,
  visibleRole,
  roleData
} = toRefs(state);
const init = async () => {
  loading.value = true;
  const data = await getAdminList({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    keyword: keyword.value,
  });
  loading.value = false;
  if (data.code === 200) {
    tableData.value = data.data.list;
    total.value = data.data.total;
  } else {
    tableData.value = [];
    total.value = 0;
  }
};
// 点击添加按钮
const addAdmin = () => {
  visible.value = true;
  rowData.value = {};
};
// 点击编辑按钮
const editAdmin = (row: AdminObjItf) => {
  visible.value = true;
  rowData.value = row;
};
const editRole = (id:number) => {
  getAdminRoleByIdApi(id)
  roleData.value.id = id
};
const closeRoleDialog = () => {
    visibleRole.value = false;
};
const closeDialog = (r?: string) => {
  visible.value = false;
  // 清空用户编辑内容
  rowData.value = {};
  if (r === "reload") {
    init();
  }
};
// 获取所有角色
const getAdminRoleByIdApi = async(id: number) => {
    const res = await getAdminRoleById(id)
    if(res.code === 200) {
        visibleRole.value = true;
        roleData.value.userRoles = res.data
    }
}
const getRoleListAllApi = async() => {
    const res = await getRoleListAll()
    if(res.code === 200) {
        roleData.value.roleLists = res.data
    }
}
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  init();
};
const handleCurrentChange = (val: number) => {
  pageNum.value = val;
  init();
};

onMounted(() => {
  init();
  getRoleListAllApi()
});
</script>

<style lang="less" scoped>
.content {
  height: calc(100% - 80px);
}
</style>
