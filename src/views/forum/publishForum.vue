<template>
  <div class="publish-forum-container">
    <p class="title">发布帖子</p>
    <el-form :model="form" label-width="80px" :rules="formRules" ref="form">
      <el-form-item prop="cat_name" label="类别">
        <el-autocomplete
          v-model="form.cat_name"
          :fetch-suggestions="(queryString, cb) => querySearch(queryString, cb, 1)"
          value-key="tc_name"
          placeholder="请输入类别或关键字"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item prop="top_name" label="话题">
        <el-autocomplete
          v-model="form.top_name"
          value-key="tc_name"
          :fetch-suggestions="(queryString, cb) => querySearch(queryString, cb, 2)"
          placeholder="请输入话题或关键字"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item prop="title" label="标题">
        <el-input class="title-ipt-box" placeholder="请输入标题" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item prop="abstract" label="摘要">
        <el-input class="title-ipt-box" placeholder="请输入摘要" v-model="form.abstract" type="textarea" :row="5"></el-input>
      </el-form-item>
      <el-form-item prop="content">
        <rich-editor
          :content="content"
          @catchData="handleRichTxt"
          height="500px"
        ></rich-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="submit-btn" @click="handleSubmit">发布</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import bus from '@/bus'
import { getFtcList, createForum } from '@/api/forum.js'
import richEditor from '@/components/rich-edit'
import { getUserId } from '@/utils/auth.js'
export default {
  name: 'publishForum',
  components: {
    richEditor
  },
  data () {
    return {
      content: '',
      userId: +getUserId() || null,
      form: {
        title: '',
        cat_name: '',
        top_name: '',
        content: '',
        abstract: ''
      },
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        cat_name: [{ required: true, message: '请输入类别', trigger: 'blur' }],
        top_name: [{ required: true, message: '请输入话题', trigger: 'blur' }],
        abstract: [{ required: true, message: '请输入摘要', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.initBreadcrumb()
  },
  mounted () {
  },
  methods: {
    initBreadcrumb () {
      bus.$emit('breadcrumb', [{ name: '发布帖子' }])
    },
    handleRichTxt (content) {
      this.form.content = content
    },
    async querySearch (queryString, cb, type) {
      try {
        const params = {
          tc_name: queryString,
          is_tc: type
        }
        const res = await getFtcList(params)
        console.log(res)
        if (+res.data.code === 2000) {
          const data = res.data.data || []
          cb(data)
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async createForum () {
      try {
        const res = await createForum(this.form)
        if (+res.data.code === 2000) {
          this.$message.success('发布成功')
          this.form = Object.assign({}, {
            title: '',
            cat_name: '',
            top_name: '',
            content: '',
            abstract: ''
          })
        } else {
          this.$message.error(res.data.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSubmit () {
      try {
        this.$refs.form.validate(valid => {
          if (!valid) return false
          this.createForum()
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .publish-forum-container{
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px 20px;
    .title{
      width: 100%;
      font-size: 26px;
      line-height: 40px;
      color: #333;
      padding: 10px;
    }
    .title-ipt-box{
      width: 100%;
    }
    ::v-deep .el-autocomplete{
      width: 100%;
    }
  }
  .submit-btn{
    display: block;
    width: 450px;
    height: 44px;
    background: linear-gradient(90deg, #008DFF, #0060FF);
    box-shadow: 0px 10px 20px 0px rgba(76, 110, 245, 0.3);
    border-radius: 22px;
    margin: 10px auto;
  }
</style>
