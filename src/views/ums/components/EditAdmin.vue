<template>
  <el-dialog
    :model-value="visible"
    :title="newForm.id ? '编辑用户' : '添加用户'"
    @close="close"
    :close-on-click-modal="false"
  >
    <el-form :model="newForm" :label-width="formLabelWidth">
      <el-form-item label="账号：">
        <el-input v-model="newForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="姓名：">
        <el-input v-model="newForm.nickName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="newForm.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：">
        <el-input
          type="password"
          v-model="newForm.password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          type="textarea"
          rows="4"
          resize="none"
          v-model="newForm.note"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-radio-group v-model="newForm.status">
          <el-radio :label="1" size="large">是</el-radio>
          <el-radio :label="0" size="large">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="modifyAdmin">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { updateAdmin } from "@/request/api";
import { reactive, ref, toRefs, watch } from "vue";
const props = defineProps<{
  visible: Boolean;
  form: AdminObjItf;
}>();
const emit = defineEmits<{
  (event: "close", r?: string): void;
}>();
const state = reactive<{
  formLabelWidth: string;
  newForm: AdminObjItf;
}>({
  formLabelWidth: "120px",
  newForm: {},
});
const { formLabelWidth, newForm } = toRefs(state);
// 拷贝form
watch(
  () => props.form,
  () => {
    newForm.value = { ...props.form };
  }
);

const close = (r?: string) => {
  emit("close", r);
};
// 确定按钮
const modifyAdmin = async () => {
  let res: ManageResult;
  if (newForm.value.id) {
    res = await updateAdmin(newForm.value.id, newForm.value);
  } else {
    res = {
        code: 200,
        data: [],
        message: 'sdfsad'
    };
  }
  if (res.code === 200) {
    close("reload");
  }
};
</script>

<style lang="less" scoped></style>
