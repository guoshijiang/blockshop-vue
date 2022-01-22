<template>
  <div class="edit-container">
    <div class="edit-item-box">
      <p class="label align">用户名：</p>
      <div class="form-box">
        <el-input
          class="text-area-box"
          placeholder="请输入"
          resize="none"
          v-model="textarea">
        </el-input>
      </div>
    </div>
    <div class="edit-item-box">
      <p class="label">更改头像：</p>
      <div class="form-box">
        <el-upload
          class="avatar-uploader"
          :action="`${baseApiUrl}v1/image/upload_file`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <p class="hint-text">必须是PNG/JPG/JPEG，并且不能超过50 KB</p>
      </div>
    </div>
    <el-button class="save-btn" type="primary" @click="updataUserInfo">保存更改</el-button>
  </div>
</template>

<script>
import { updataUserInfo } from '@/api/login.js'
import { getUserId } from '@/utils/auth.js'
import { baseApiUrl } from '@/config.js'
export default {
  name: 'edit',
  data () {
    return {
      imageUrl: '',
      uploadImgUrl: '',
      uploadImgId: null,
      textarea: '',
      userId: +getUserId() || null,
      baseApiUrl
    }
  },
  methods: {
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
      const isLt2M = file.size / 1024 <= 50

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 PNG/JPG/JPEG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过50 KB!')
      }
      return (isJPG || isPNG) && isLt2M
    },
    async updataUserInfo () {
      try {
        const params = {
          user_id: this.userId,
          user_name: this.textarea,
          user_photo: this.uploadImgUrl
        }
        const res = await updataUserInfo(params)
        if (+res.data.code === 2000) {
          this.$message.success('修改成功')
          this.getUserInfoFn(this.userId)
          this.imageUrl = ''
          this.textarea = ''
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
  .edit-container{
    width: 100%;
    box-sizing: border-box;
    padding: 12px 20px;
    .edit-item-box{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 40px;
      &.fa-item-box{
        .label{
          text-align: left;
        }
        .hint-box{
          width: 1084px;
          height: 44px;
          display: flex;
          background-color: rgba(255, 0, 0, 0.17);
          margin-top: 18px;
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
      }
      .label{
        font-size: 16px;
        line-height: 40px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
        width: 115px;
        text-align: right;
        margin-right: 38px;
      }
      .form-box{
        width: 900px;
        .hint-text{
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          margin-top: 11px;
        }
        ::v-deep .el-textarea__inner{
          width: 900px;
          height: 200px;
        }
      }
    }
    .save-btn{
      display: block;
      width: 450px;
      height: 44px;
      background: linear-gradient(90deg, #008DFF, #0060FF);
      box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
      border-radius: 22px;
      margin: 89px auto 50px;
    }
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
</style>
