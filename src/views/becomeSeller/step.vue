<template>
  <div class="become-seller-container">
    <div class="become-seller-left-container">
      <!-- 清单选项 2 -->
      <list-options></list-options>
      <!-- 虚拟币汇率 -->
      <buyer-statistics></buyer-statistics>
    </div>
    <div class="add-shop-right-container">
      <div class="title-box">
        <p class="title">完善店铺信息</p>
        <p class="more"></p>
      </div>
      <div class="form-box">
        <el-form :model="addShopForm" label-width="150px" :rules="addShopFormRules" ref="addShopForm">
          <el-form-item prop="imageUrl" label="产品图片">
            <el-upload
              class="avatar-uploader"
              :action="`${baseApiUrl}v1/image/upload_file`"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="uploadImgUrl" :src="uploadImgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item prop="mct_name" label="商家名称">
            <el-input v-model="addShopForm.mct_name"></el-input>
          </el-form-item>
          <el-form-item prop="mct_abstruct" label="商家简介">
            <el-input v-model="addShopForm.mct_abstruct"></el-input>
          </el-form-item>
          <el-form-item prop="mct_detail" label="商家详情">
            <el-input v-model="addShopForm.mct_detail"></el-input>
          </el-form-item>
          <el-form-item prop="mct_service" label="商家服务说明">
            <el-input v-model="addShopForm.mct_service"></el-input>
          </el-form-item>
          <el-form-item prop="mct_crt_name" label="商家联系人">
            <el-input v-model="addShopForm.mct_crt_name"></el-input>
          </el-form-item>
          <el-form-item prop="mct_crt_phone" label="商家联系方式">
            <el-input v-model="addShopForm.mct_crt_phone"></el-input>
          </el-form-item>
          <el-form-item prop="mct_crt_address" label="商家收货地址">
            <el-input v-model="addShopForm.mct_crt_address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="add-btn" @click="handleOpen">确认开通</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import listOptions from '@/components/listOptions.vue'
import buyerStatistics from '@/components/buyerStatistics.vue'
import { getUserId } from '@/utils/auth.js'
import { openMarchant } from '@/api/becomeSeller.js'
import { baseApiUrl } from '@/config.js'
import bus from '@/bus'
export default {
  name: 'becomeSeller',
  components: {
    listOptions,
    buyerStatistics
  },
  data () {
    return {
      userId: +getUserId() || null,
      baseApiUrl,
      addShopForm: {
        mct_name: '',
        mct_abstruct: '',
        mct_detail: '',
        mct_logo: '',
        mct_service: '',
        mct_crt_name: '',
        mct_crt_phone: '',
        mct_crt_address: ''
      },
      addShopFormRules: {
        mct_name: [{ required: true, message: '请输入商家名称', trigger: 'blur' }],
        mct_abstruct: [{ required: true, message: '请输入商家简介', trigger: 'blur' }],
        mct_detail: [{ required: true, message: '请输入商家详情', trigger: 'blur' }],
        mct_service: [{ required: true, message: '请输入商家服务说明', trigger: 'blur' }],
        mct_crt_name: [{ required: true, message: '请输入商家联系人', trigger: 'blur' }],
        mct_crt_address: [{ required: true, message: '请输入商家收货地址', trigger: 'blur' }],
        mct_crt_phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ]
      },
      uploadImgUrl: '',
      uploadImgId: 0
    }
  },
  created () {
    this.initBreadcrumb()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '完善店铺信息' }
      ])
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(res)
      if (+res.code === 2000) {
        this.uploadImgUrl = res.data.img_url
        this.uploadImgId = res.data.imgage_id
      }
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 PNG/JPG/JPEG 格式!')
      }
      return (isJPG || isPNG)
    },
    async openMarchant () {
      try {
        const params = Object.assign({}, this.addShopForm)
        params.pay_way = +this.$route.query.way
        params.user_id = this.userId
        params.mct_logo = this.uploadImgUrl
        const res = await openMarchant(params)
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.$router.replace({
            path: '/orderAdmin'
          })
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleOpen () {
      this.$refs.addShopForm.validate((valid) => {
        if (!valid) return false
        this.openMarchant()
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .become-seller-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .become-seller-left-container{
      width: 380px;
      margin-bottom: 30px;
    }
    .add-shop-right-container{
      width: 810px;
      margin-bottom: 30px;
      .title-box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 26px;
        box-sizing: border-box;
        padding: 0 20px;
        border-bottom: 1px solid #F0F0F0;
        p.title{
          font-size: 18px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-bottom: 14px;
        }
      }
      .form-box{
        width: 600px;
        padding: 10px 0;
        ::v-deep .el-input__inner{
          border: 1px solid #BFBFBF;
          border-radius: 22px;
        }
        .add-btn{
          width: 450px;
          height: 44px;
          background: linear-gradient(90deg, #008DFF, #0060FF);
          box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
          border-radius: 22px;
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
        }
        .avatar-uploader {
          ::v-deep   .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          ::v-deep .el-upload:hover {
            border-color: #409EFF;
          }
          .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
          }
          .avatar {
            width: 178px;
            height: 178px;
            display: block;
          }
        }
      }
    }
  }
</style>
