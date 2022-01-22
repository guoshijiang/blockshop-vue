<template>
  <div class="add-shop-container">
    <div class="add-shop-left-container">
      <!-- 账户信息 -->
      <account-info></account-info>
      <!-- 店铺成长 -->
      <shop-growth></shop-growth>
    </div>
    <div class="add-shop-right-container">
      <div class="title-box">
        <p class="title">添加商品</p>
        <p class="more"></p>
      </div>
      <div class="form-box">
        <el-form :model="addShopForm" ref="addShopForm" :rules="addShopFormRules" label-width="150px">
          <el-form-item prop="imageUrl" label="产品图片">
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
          <el-form-item prop="title" label="商品标题">
            <el-input v-model="addShopForm.title" clearable placeholder="请输入商品标题"></el-input>
          </el-form-item>
          <el-form-item prop="price" label="产品价格">
            <el-input v-model="addShopForm.price" type="number" placeholder="请输入产品价格"></el-input>
          </el-form-item>
          <el-form-item prop="goods_name" label="产品名称">
            <el-input v-model="addShopForm.goods_name" clearable placeholder="请输入产品名称"></el-input>
          </el-form-item>
          <el-form-item prop="goods_params" label="产品参数">
            <el-input v-model="addShopForm.goods_params" clearable placeholder="请输入产品参数"></el-input>
          </el-form-item>
          <el-form-item prop="goods_detail" label="产品详细介绍">
            <el-input v-model="addShopForm.goods_detail" clearable placeholder="请输入产品详细介绍"></el-input>
          </el-form-item>
          <el-form-item prop="goods_cat_name" label="商品分类">
            <el-input v-model="addShopForm.goods_cat_name" clearable placeholder="请输入商品分类"></el-input>
          </el-form-item>
          <el-form-item prop="goods_type_name" label="商品类别">
            <el-input v-model="addShopForm.goods_type_name" clearable placeholder="请输入商品类别"></el-input>
          </el-form-item>
          <el-form-item prop="goods_mark" label="商品备注">
            <el-input v-model="addShopForm.goods_mark" clearable placeholder="请输入商品备注"></el-input>
          </el-form-item>
          <el-form-item prop="total_amount" label="库存">
            <el-input v-model="addShopForm.total_amount" type="number" placeholder="请输入商品库存"></el-input>
          </el-form-item>
          <el-form-item prop="origin_st_name" label="产地">
            <el-input v-model="addShopForm.origin_st_name" clearable placeholder="请输入商品产地"></el-input>
          </el-form-item>
          <el-form-item prop="serveice" label="服务说明">
            <el-input v-model="addShopForm.serveice" clearable placeholder="请输入商品服务说明"></el-input>
          </el-form-item>
          <el-form-item prop="is_admin" label="是否代管">
            <el-switch
              v-model="addShopForm.is_admin"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </el-form-item>
          <el-form-item prop="sale" label="是否上架">
            <el-switch
              v-model="addShopForm.sale"
              :active-value="0"
              :inactive-value="1"
            >
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button class="add-btn" @click="handleAddShop">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import accountInfo from '@/components/accountInfo'
import shopGrowth from '@/components/shopGrowth.vue'
import { baseApiUrl } from '@/config.js'
import { addGood } from '@/api/becomeSeller.js'
import { getUserId } from '@/utils/auth.js'
import bus from '@/bus'
export default {
  name: 'addShop',
  components: {
    accountInfo,
    shopGrowth
  },
  data () {
    return {
      baseApiUrl,
      userId: +getUserId() || null,
      addShopForm: {
        title: '',
        price: null,
        goods_name: '',
        goods_params: '',
        goods_detail: '',
        goods_cat_name: '',
        goods_type_name: '',
        goods_mark: '',
        total_amount: null,
        origin_st_name: '',
        serveice: '',
        is_admin: 0,
        sale: 0
      },
      addShopFormRules: {
        title: [{ required: true, message: '请输入商品标题', trigger: 'blur' }],
        price: [{ required: true, message: '请输入产品价格', trigger: 'blur' }],
        goods_name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        goods_params: [{ required: true, message: '请输入产品参数', trigger: 'blur' }],
        goods_detail: [{ required: true, message: '请输入产品详细介绍', trigger: 'blur' }],
        goods_cat_name: [{ required: true, message: '请输入商品分类', trigger: 'blur' }],
        goods_type_name: [{ required: true, message: '请输入商品类别', trigger: 'blur' }],
        goods_mark: [{ required: true, message: '请输入商品备注', trigger: 'blur' }],
        total_amount: [{ required: true, message: '请输入商品库存', trigger: 'blur' }],
        origin_st_name: [{ required: true, message: '请输入商品产地', trigger: 'blur' }],
        serveice: [{ required: true, message: '请输入商品服务说明', trigger: 'blur' }]
      },
      imageUrlList: []
    }
  },
  mounted () {
    this.initBreadcrumb()
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [
        { name: '添加商品' }
      ])
    },
    initForm () {
      const formValue = {
        title: '',
        price: null,
        goods_name: '',
        goods_params: '',
        goods_detail: '',
        goods_cat_name: '',
        goods_type_name: '',
        goods_mark: '',
        total_amount: null,
        origin_st_name: '',
        serveice: '',
        is_admin: 0,
        sale: 0
      }
      this.addShopForm = Object.assign({}, formValue)
      this.imageUrlList = []
      this.$refs.elUpload.clearFiles()
    },
    async addGood () {
      try {
        const params = Object.assign(this.addShopForm)
        params.user_id = this.userId
        params.goods_img_ids = this.imageUrlList.map(({ id }) => id)
        params.merchant_id = this.userInfo.mct_id
        params.logo = this.imageUrlList[0].url
        params.goods_price = +params.price
        params.total_amount = +params.total_amount
        const res = await addGood(params)
        if (+res.data.code === 2000) {
          this.$message.success(res.data.msg)
          this.initForm()
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleAddShop () {
      this.$refs.addShopForm.validate((valid) => {
        if (!valid) return false
        if (!this.imageUrlList.length) return this.$message.error('请上传商品图片')
        this.addGood()
      })
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
    }
  }
}
</script>

<style lang="less" scoped>
  .add-shop-container{
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    .add-shop-left-container{
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
