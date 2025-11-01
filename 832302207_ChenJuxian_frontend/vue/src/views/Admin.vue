<template>
  <div>
    <div class="card" style="margin-bottom: 5px" >
      <el-input clearable @clear="load" style="width: 260px; margin-right: 5px" v-model="data.username" placeholder="请输入账号查询" :prefix-icon="Search"></el-input>
      <el-input clearable @clear="load" style="width: 260px; margin-right: 5px" v-model="data.name" placeholder="请输入名称查询" :prefix-icon="Search"></el-input>
      <el-button type="primary" @click = "load">查 询</el-button>
      <el-button type="warning" @click = "reset">重 置</el-button>
    </div>

    <div class="card" style="margin-bottom: 5px" >
      <el-button type="primary" @click ="handleAdd">新 增</el-button>
      <el-button type="danger" @click = "deleteBatch">批量删除</el-button>
      <el-button type="success">批量导入</el-button>
      <el-button type="info">批量导出</el-button>
    </div>

    <div class="card" style="margin-bottom: 5px">
      <el-table :data="data.tableData" style="width: 100%" @selection-change="handleSelectionChange"
                :header-cell-style="{ color: '#333', backgroundColor: '#eaf4ff' }">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="username" label="账号"  />
        <el-table-column prop="name" label="名称"  />
        <el-table-column prop="phone" label="电话"  />
        <el-table-column prop="email" label="邮箱"  />

        <el-table-column label="操作" width="100">
          <template #default="scope">
            <el-button type="primary" icon="Edit" circle @click="handleEdit(scope.row)"></el-button>
            <el-button type="danger" icon="Delete" circle @click="del(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="card">
      <el-pagination
          v-model:current-page="data.pageNum"
          v-model:page-size="data.pageSize"
          :page-size="data.pageSize"
          layout="total, sizes,prev, pager, next,jumper"
          :page-sizes="[5, 8, 10]"
          :total="data.total"
          @current-change="load"
          @size-change="load"
      />
    </div>

    <el-dialog title="新增/编辑通讯录信息" v-model="data.formVisible"  width="35%"  destroy-on-close>
      <el-form ref="formRef" :model="data.form" :rules="data.rules" label-width="80px" style="padding: 20px 30px 10px 0">
        <el-form-item prop="username" label="账号" >
          <el-input v-model="data.form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="name" label="名称" >
          <el-input v-model="data.form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="phone" label="电话" >
          <el-input v-model="data.form.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱" >
          <el-input v-model="data.form.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="data.formVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { reactive ,ref } from "vue";
import {Search} from "@element-plus/icons-vue";
import request from "@/utils/request.js";
import {ElMessage, ElMessageBox} from "element-plus";

const data = reactive({
  username:null,
  name: null,
  pageNum: 1,
  pageSize: 5,
  total: 0,
  tableData:[],
  formVisible:false,
  form: {},
  rules:{
    username:[
      { required: true, message: '请填写账号', trigger: 'blur' }
    ],
    name: [
      { required: true, message: '请填写名称', trigger: 'blur' }
    ],
    phone: [
      { required: true, message: '请填写手机', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请填写邮箱', trigger: 'blur' }
    ]
  },
  rows:[]
  // tableData: [
  //   { name: '菊仙', phone: '13877886677', address: '北京市朝阳区' },
  //   { name: '菊仙儿子', phone: '13988997788', address: '上海市徐汇区' },
  //   { name: '菊仙孙子', phone: '138776554466', address: '安徽省合肥市' },
  //   { name: '菊仙曾孙', phone: '138799882566', address: '安徽省合肥市' },
  //   { name: '菊仙玄孙', phone: '13987622566', address: '安徽省合肥市' },
  //   { name: '菊仙来孙', phone: '13487772266', address: '安徽省合肥市' },
  //   { name: '菊仙晜孙', phone: '134877652366', address: '安徽省合肥市' },
  //   { name: '菊仙仍孙', phone: '13482372786', address: '安徽省合肥市' },
  //   { name: '菊仙云孙', phone: '13481572226', address: '安徽省合肥市' },
  //   { name: '菊仙耳孙', phone: '1348792236', address: '安徽省合肥市' },
  // ]
})

const formRef = ref()

// request.get('/admin/selectAll').then(res => {
//   if(res.code == '200'){
//     console.log(res)
//   }else{
//     ElMessage.error(res.msg)
//   }
// })
const load = () => {
  request.get('/admin/selectPage',{
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      name:data.name,
      username:data.username
    }
  }).then(res => {
    if (res.code === '200'){
      data.tableData=res.data.list
      data.total=res.data.total
      console.log(res.data)
    }else{
      ElMessage.error(res.msg)
    }

  })
}
load()

const reset = () => {
  data.username = null
  data.name = null
  load()
}

const handleAdd =() =>{
  data.formVisible=true
  data.form = {}
}

const add =() =>{
  // formRef 是表单的引用
  formRef.value.validate((valid) => {
    if(valid){  // 验证通过的情况下
      request.post('admin/add',data.form).then(res =>{
        if (res.code === '200'){
          data.formVisible=false
          ElMessage.success('新增成功')
          load()
        }else{
          ElMessage.error(res.msg)
        }
      })
    }
  })
}

const handleEdit = (row) => {
  data.form = JSON.parse(JSON.stringify(row))  // 深度拷贝数据
  data.formVisible = true
}

const update = () => {
  // formRef 是表单的引用
  formRef.value.validate((valid) => {
    if (valid) {   // 验证通过的情况下
      request.put('/admin/update', data.form).then(res => {
        if (res.code === '200') {
          data.formVisible = false
          ElMessage.success('修改成功')
          load()
        } else {
          ElMessage.error(res.msg)
        }
      })
    }
  })
}

const save = () => {
  data.form.id ? update() : add()
}

const del = (id) => {
  ElMessageBox.confirm('删除后无法恢复，您确认删除吗？', '删除确认', { type: 'warning' }).then(res => {
    request.delete('/admin/delete/' + id).then(res => {
      if (res.code === '200') {
        ElMessage.success('删除成功')
        load()
      } else {
        ElMessage.error(res.msg)
      }
    })
  }).catch(err => {})
}

const handleSelectionChange = (rows) => {  // rows 就是实际选择的数组
  data.rows = rows
  console.log(rows)
}

const deleteBatch = () => {
  if (data.rows.length === 0) {
    ElMessage.warning('请选择数据')
    return
  }
  ElMessageBox.confirm('删除后无法恢复，您确认删除吗？', '删除确认', { type: 'warning' }).then(res => {
    request.delete('/admin/deleteBatch', { data: data.rows }).then(res => {
      if (res.code === '200') {
        ElMessage.success('批量删除成功')
        load()
      } else {
        ElMessage.error(res.msg)
      }
    })
  }).catch(err => {})
}
</script>