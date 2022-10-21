<template>
  <div class="user-comtainer">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 新增用户 -->
      <el-form
        :inline="true"
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="居住地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入年龄"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="handeQuxiao">取 消</el-button>
        <el-button type="primary" @click="handelclick">确 定</el-button>
      </span>
    </el-dialog>

    <div class="manage-header">
      <el-button class="btn1" type="primary" @click="addshuju"
        >+ 新增</el-button
      >

      <!-- form 搜索区域 -->
      <el-form :model="userform" :inline="true">
        <el-form-item>
          <el-input
            v-model="userform.name"
            placeholder="请输入搜索姓名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    
    <el-table height="90%" :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.sex == 1 ? "男" : "女"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="birth" label="出生日期"> </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>

      <el-table-column prop="" label="添加删除">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDel(scope.row)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="this.total"
        @current-change="handelYema"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  name: "UserView",
  data() {
    return {
      userform: {},
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      tableData: [],
      modalType: 0, //1 编辑  0新增
      total: 0,
      yemaData: {
        page: 1,
        limit: 10,
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { min: 1, max: 3, message: "长度在 3 到 11 个字符", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择" }],
        birth: [{ required: true, message: "请选择" }],
        addr: [{ required: true, message: "请选择" }],
      },
    };
  },
  methods: {
    handelclick() {
      this.$refs.form.validate((val) => {
        // console.log(val,'val')
        if (val) {
          // 填满才验证ture,处理
          if (this.modalType == 0) {
            addUser(this.form).then(() => {
              this.gengxinList();
            });
          } else {
            editUser(this.form).then(() => {
              this.gengxinList();
            });
          }
          console.log(this.form, "form");

          // 关闭
          this.dialogVisible = false;
        }
      });
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    handeQuxiao() {
      this.handleClose();
    },
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      // 深拷贝
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDel(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
          this.gengxinList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addshuju() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    // 获取列表数据
    gengxinList() {
      getUser({ params: { ...this.userform, ...this.yemaData } }).then(
        ({ data }) => {
          console.log(data, "7676");
          this.tableData = data.list;
          this.total = data.count || 0;
        }
      );
    },
    handelYema(val) {
      console.log(val, "fdfdfdfdfdfdf");
      this.yemaData.page = val;
      this.gengxinList();
    },
    // 列表查询
    onSubmit() {
      this.gengxinList();
    },
  },
  mounted() {
    this.gengxinList();
  },
};
</script>
<style lang="scss" scoped>
.user-comtainer {
  height: 92%;
}
.manage-header {
  display: flex;
  justify-content: space-between;
  .btn1 {
    height: 40px;
  }
}
</style>
