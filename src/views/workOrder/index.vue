<template>
  <div class="work-order-container">
    <div class="work-order-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
    </div>
    <div class="work-order-right-container">
      <div class="hint-box">
        <span></span>
        <p>点击<router-link to="/commonList">这里</router-link>查看常见问题，然后再提交一张可能有你答案的单。</p>
      </div>
      <p class="hint-text">我们努力在24小时内回答您的问题。</p>
      <div class="title-box">
        创建票证
      </div>
      <div class="form-box">
        <el-form :model="ticketForm" :rules="ticketFormRules" ref="ticketForm">
          <el-form-item label="联系人：" prop="author">
            <el-input v-model="ticketForm.author"></el-input>
          </el-form-item>
          <el-form-item label="联系方式：" prop="contract">
            <el-input v-model="ticketForm.contract"></el-input>
          </el-form-item>
          <el-form-item label="标题：" prop="hd_title">
            <el-input v-model="ticketForm.hd_title"></el-input>
          </el-form-item>
          <el-form-item label="内容：" prop="hd_detail">
            <el-input
              class="text-area-box"
              type="textarea"
              :rows="2"
              placeholder="请输入"
              resize="none"
              v-model="ticketForm.hd_detail">
            </el-input>
          </el-form-item>
          <div class="verification-code-box">
            <verification-code ref="verificationCode" :code="ticketForm.verificationCode"></verification-code>
          </div>
          <el-form-item label="验证码：" prop="verificationCode">
            <el-input v-model="ticketForm.verificationCode" placeholder="请输入验证码" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="send-btn" @click="handleSend">发送</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p class="work-title">工单</p>
      <el-table
        class="table-box"
        :data="tableData"
        :header-cell-style="{backgroundColor: '#F0F0F0',fontSize: '16px',fontFamily: 'PingFang SC',fontweight: 'bold',color: '#333333'}"
      >
        <el-table-column
          prop="qs_id"
          label="id"
          width="60"
        >
        </el-table-column>
        <el-table-column
          prop="qs_title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          prop="handName"
          label="状态"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="hd_time"
          label="最后一次更新"
        >
        </el-table-column>
        <el-table-column
          prop="operation"
          label="查看"
          width="120"
        >
          <template slot-scope="scope">
            <el-button
              class="remove-btn"
              size="mini"
              @click="getHdDetail(scope.row.qs_id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination-box"
        :current-page="pageParams.page"
        :page-size="pageParams.page_size"
        layout="prev, pager, next, jumper"
        :total="pageParams.total"
        @current-chang="handleSizeChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="工单详情"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div class="dialog-text">
        <p>id: {{ detail && detail.qs_id }}</p>
        <p>处理情况：{{ detail && detail.handName }}</p>
        <p>标题：{{ detail && detail.qs_title }}</p>
        <p>内容：{{ detail && detail.hd_detai }}</p>
        <p>时间：{{ detail && detail.hd_time }}</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import verificationCode from '@/components/verificationCode.vue'
import { createHelpDesk, getHdList, getHdDetail } from '@/api/message.js'
import bus from '@/bus'
export default {
  name: 'WorkOrder',
  components: {
    listOptions,
    verificationCode
  },
  data () {
    return {
      ticketForm: {
        author: '',
        contract: '',
        hd_title: '',
        hd_detail: '',
        verificationCode: ''
      },
      ticketFormRules: {
        author: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contract: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        hd_title: [{ required: true, message: '请输入工单标题', trigger: 'blur' }],
        hd_detail: [{ required: true, message: '请输入工单内容', trigger: 'blur' }],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: this.verificationCodeValida, trigger: 'blur' }
        ]
      },
      pageParams: {
        page: 1,
        page_size: 10,
        total: 0
      },
      tableData: [],
      dialogVisible: false,
      detail: null
    }
  },
  created () {
    this.initBreadcrumb()
  },
  mounted () {
    this.getHdList()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '工单支持' }
      ])
    },
    async getHdList () {
      try {
        const res = await getHdList(this.pageParams)
        if (+res.data.code === 2000) {
          this.tableData = (res.data.data.qs_list && res.data.data.qs_list.map(item => {
            item.handName = item.is_hand ? '已处理' : '未处理'
            return item
          })) || []
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChange (current) {
      this.pageParams.page = current
      this.getHdList()
    },
    async createHelpDesk () {
      try {
        const res = await createHelpDesk(this.ticketForm)
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.ticketForm = Object.assign({}, {
            author: '',
            contract: '',
            hd_title: '',
            hd_detail: '',
            verificationCode: ''
          })
          this.getHdList()
        } else {
          this.$mess.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSend () {
      console.log(this.$refs.ticketForm)
      this.$refs.ticketForm.validate((valid) => {
        if (!valid) return false
        this.createHelpDesk()
      })
    },
    verificationCodeValida (rule, value, callback) {
      if (!this.$refs.verificationCode.validateCode()) {
        callback(new Error('验证码不正确！'))
      }
      callback()
    },
    async getHdDetail (id) {
      try {
        const res = await getHdDetail({
          hd_id: id
        })
        if (+res.data.code === 2000) {
          this.detail = res.data.data
          this.detail.handName = res.data.data.is_hand ? '已处理' : '未处理'
          this.dialogVisible = true
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .work-order-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .work-order-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .work-order-right-container{
      width: 800px;
      margin-bottom: 30px;
      padding-right: 9px;
      .hint-box{
        width: 100%;
        height: 44px;
        display: flex;
        background-color: rgba(255, 0, 0, 0.17);
        span{
          width: 10px;
          height: 44px;
          background-color: #FF0000;
        }
        p{
          padding: 0 22px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FF0000;
          line-height: 44px;
        }
      }
      .hint-text{
        margin-top: 19px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        text-align: center;
      }
      .title-box{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        padding-bottom: 12px;
        border-bottom: 1px solid #F0F0F0;
        margin-top: 27px;
      }
      .form-box{
        width: 550px;
        padding: 22px 52px;
        ::v-deep .el-textarea__inner{
          width: 450px;
          height: 200px;
        }
        ::v-deep .el-input__inner{
          width: 450px;
          border: 1px solid #BFBFBF;
          border-radius: 22px;
        }
        ::v-deep .el-form-item{
          display: flex;
          .el-form-item__label{
            width: 150px;
            text-align: right;
          }
        }
        .text-area-box{
          width: 450px;
          height: 200px;
          background: #FFFFFF;
          border-radius: 5px;
        }
        .verification-code-box{
          width: 450px;
          margin-bottom: 22px;
          margin-left: 100px;
          img{
            width: 100%;
          }
        }
        .send-btn{
          width: 450px;
          height: 44px;
          margin-left: 100px;
          background: linear-gradient(90deg, #008DFF, #0060FF);
          box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
          border-radius: 22px;
          margin-top: 63px;
        }
      }
      .work-title{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        margin-bottom: 18px;
      }
      .table-box{
        .remove-btn{
          width: 90px;
          height: 30px;
          background: #1652B5;
          border-radius: 15px;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
        }
      }
    }
  }
  .dialog-text{
    p{
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 5px;
    }
  }
  .pagination-box{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
