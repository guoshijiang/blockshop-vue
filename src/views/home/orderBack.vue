<template>
  <div class="place-order-container">
    <div class="place-order-left-container">
      <!-- 账户信息 -->
      <account-info></account-info>
    </div>
    <div class="place-order-right-container">
      <p class="name-box">退货申请</p>
      <div class="form-box">
        <el-form :model="form" :rules="formRules" ref="form" label-width="110px" label-position="left">
          <el-form-item label="类型" prop="fund_ret">
            <el-select v-model="form.fund_ret" placeholder="请选择">
              <el-option
                v-for="item in fundRetOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退货原因" prop="ret_goods_rs">
            <el-input v-model="form.ret_goods_rs" placeholder="请输入退货原因" clearable></el-input>
          </el-form-item>
          <el-form-item label="问题描述" prop="qs_describe">
            <el-input v-model="form.qs_describe" placeholder="请输入问题描述因" clearable></el-input>
          </el-form-item>
          <el-form-item label="图片描述">
            <el-upload
              ref="elUpload"
              class="avatar-uploader"
              :action="`${baseApiUrl}v1/image/upload_file`"
              multiple
              list-type="picture-card"
              :limit="3"
              :before-upload="beforeAvatarUpload"
              :on-success="handleUploadSuccess"
              :on-remove="handleUploadRemove"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="是否收到货物" prop="is_recv_goods">
            <el-select v-model="form.is_recv_goods" placeholder="请选择">
              <el-option
                v-for="item in recvGoodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// "order_id": 1,
// "ret_goods_rs":"退货原因",
// "qs_describe": "问题描述",
// "qs_img_one": "1",
// "qs_img_two": "2",
// "qs_img_three": "3",
// "is_recv_goods": 0,  // 0:未收到货物，1:已经收到货物
// "fund_ret" 0 // 1.退货 2:换货
import accountInfo from '@/components/accountInfo'
import { orderBack } from '@/api/good.js'
import { getUserId } from '@/utils/auth.js'
import bus from '@/bus'
import { baseApiUrl } from '@/config.js'
export default {
  name: 'placeOrder',
  components: { accountInfo },
  data () {
    return {
      userId: +getUserId() || null,
      form: {
        ret_goods_rs: '',
        qs_describe: '',
        qs_img_one: '',
        qs_img_two: '',
        qs_img_three: '',
        is_recv_goods: 0,
        fund_ret: 1
      },
      formRules: {
        ret_goods_rs: [{ required: true, message: '请输入退货原因', trigger: 'blur' }],
        qs_describe: [{ required: true, message: '请输入问题描述', trigger: 'blur' }],
        is_recv_goods: [{ required: true, message: '请选择是否收到货物', trigger: 'blur' }],
        fund_ret: [{ required: true, message: '请选择类型', trigger: 'blur' }]
      },
      baseApiUrl,
      imageUrlList: [],
      fundRetOptions: [
        { label: '退货', value: 1 },
        { label: '换货', value: 2 }
      ],
      recvGoodOptions: [
        { label: '未收到货物', value: 0 },
        { label: '已经收到货物', value: 1 }
      ]
    }
  },
  created () {
    this.initBreadcrumb()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '退货申请' }
      ])
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 PNG/JPG/JPEG 格式!')
      }
      return (isJPG || isPNG)
    },
    handleUploadRemove (file) {
      this.imageUrlList = this.imageUrlList.filter(({ id }) => id !== file.response.data.imgage_id)
    },
    handleUploadSuccess (response) {
      this.imageUrlList.push({
        id: response.data.imgage_id,
        url: response.data.img_url
      })
    },
    async orderBack () {
      try {
        const params = {
          order_id: +this.$route.query.id,
          ret_goods_rs: this.form.ret_goods_rs,
          qs_describe: this.form.qs_describe,
          qs_img_one: this.imageUrlList.length >= 1 ? this.imageUrlList[0].url : '',
          qs_img_two: this.imageUrlList.length >= 2 ? this.imageUrlList[1].url : '',
          qs_img_three: this.imageUrlList.length >= 3 ? this.imageUrlList[2].url : '',
          is_recv_goods: this.form.is_recv_goods, // 0:未收到货物，1:已经收到货物
          fund_ret: this.form.fund_ret // 1.退货 2:换货
        }
        const res = await orderBack(params)
        console.log(res)
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          // history.go(-1)
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSubmit () {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.orderBack()
      })
    }
  }

}
</script>

<style lang="less" scoped>
  .place-order-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    padding-bottom: 60px;
    .place-oeder-left-container{
      width: 380px;
      margin-bottom: 35px;
    }
    .place-order-right-container{
      width: 791px;
      .name-box{
        font-size: 18px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        padding-top: 10px;
        padding-bottom: 18px;
        border-bottom: 1px solid #F0F0F0;
      }
      .form-box{
        width: 600px;
        padding: 20px;
      }
    }
  }
</style>
