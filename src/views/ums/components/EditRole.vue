<template>
  <el-dialog
    :model-value="visible"
    title="分配角色"
    @close="close"
    width="40%"
    :close-on-click-modal="false"
  >
  <el-form :model="form">
    <el-select
      v-model="roles"
      multiple
      style="width: 240px"
    >
      <el-option
        v-for="item in form.roleLists"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="updateRole">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { updateAdminRole } from "@/request/api";
import { json } from "stream/consumers";
import { reactive, ref, toRefs, watch, onMounted } from "vue";
const props = defineProps<{
  visible: boolean;
  form: AdminRoleFormData;
}>();
const emit = defineEmits<{
  (event: "close"): void;
}>();

const roles = ref<number[]>([])

watch(() => props.form.userRoles, () => {
    roles.value = props.form.userRoles.map(item => item.id)
})

const close = () => {
  emit("close");
};
// 确定按钮
const updateRole = async () => {
  const res = await updateAdminRole({adminId: props.form.id, roleIds: roles.value.join(',')});
  if (res.code === 200) {
    close();
  }
};
</script>

<style lang="less" scoped></style>
