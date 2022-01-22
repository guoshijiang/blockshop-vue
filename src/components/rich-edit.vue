<template>
  <div class="tinymce-editor">
    <editor v-model="myValue" :init="init" :disabled="disabled"></editor>
  </div>
</template>
<script>
import { uploadFile } from '@/api/forum.js'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
// import "tinymce/icons/default";
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/link'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/code'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/preview'
import 'tinymce/icons/default/icons.min.js' // 解决乱码问题 有可能有坑

export default {
  components: {
    Editor
  },
  props: {
    // 高度
    height: {
      type: String,
      default: '400'
    },
    // 图片类型
    uploadType: {
      type: String,
      default: 'RICH_TEXT'
    },
    content: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default:
        'lists image media table wordcount code emoticons link hr fullscreen searchreplace contextmenu colorpicker preview'
    },
    toolbar: {
      type: [String, Array],
      default:
        'formatselect | bold italic forecolor backcolor  | fontsizeselect | fontselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |   image media table  | removeformat emoticons hr preview  | fullscreen code undo redo searchreplace  | '
    }
  },
  data () {
    return {
      init: {
        branding: false,
        table_responsive_width: true,
        language_url: '/rich/langs/zh_CN.js', // public目录下
        emoticons_database_url: '/rich/plugins/emoticons/js/emojis.min.js',
        language: 'zh_CN',
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 40pt',
        font_formats:
          "微软雅黑=Microsoft YaHei;宋体='宋体';黑体='黑体';仿宋='仿宋';楷体='楷体';苹果苹方=PingFang SC;隶书='隶书';幼圆='幼圆';Arial='Arial';Helvetica Neue;sans-serif",
        skin_url: '/rich/skins/ui/oxide', // public目录下
        height: this.height,
        plugins: this.plugins, // 父组件传入 或者 填写个默认的插件 要选用什么插件都可以 去官网可以查到
        toolbar: this.toolbar, // 工具栏 我用到的也就是lists image media table wordcount 这些 根据需求而定
        images_upload_handler: (blobInfo, success, failure) =>
          this.images_upload_handler(blobInfo, success, failure)
      },
      myValue: this.content,
      info: null
    }
  },
  mounted () {
    tinymce.init({})
  },
  methods: {
    onClick (e) {
      this.$emit('onClick', e, tinymce)
    },
    images_upload_handler: function (blobInfo, success, failure) {
      this.performupload(blobInfo, success, failure)
    },
    async performupload (blobInfo, success, failure) {
      try {
        const form = new FormData()
        form.append('file', blobInfo.blob())
        const res = await uploadFile(form)
        console.log(res)
        if (+res.data.code === 2000) {
          success(res.data.data.img_url)
        } else {
          failure('上传失败请重试')
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  watch: {
    content (newValue) {
      this.myValue = newValue
    },
    myValue (newValue) {
      this.$emit('catchData', newValue)
    }
  }
}
</script>
