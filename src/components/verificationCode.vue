<template>
  <div class="verification-code">
    <img :src="verificationCode.imgUrl" alt="verificationCode" @click="creatCode">
  </div>
</template>

<script>
import { randomLetter, generateBlob } from 'yh-verificationcode'
export default {
  name: 'verificationCode',
  data () {
    return {
      verificationCode: {
        code: '',
        imgUrl: null
      }
    }
  },
  props: {
    code: [String]
  },
  mounted () {
    this.creatCode()
  },
  methods: {
    async creatCode () {
      try {
        if (this.verificationCode && this.verificationCode.imgUrl) {
          window.URL.revokeObjectURL(this.verificationCode.imgUrl)
        }
        this.verificationCode.code = randomLetter(4)
        const res = await generateBlob(this.verificationCode.code, {
          width: 458,
          height: 100,
          padding: 10,
          lineNumber: 2,
          dotNumber: 80,
          bezierLineNumber: 2,
          imgType: 'image/png',
          encoderOptions: 1
        })
        if (res) {
          this.verificationCode.imgUrl = window.URL.createObjectURL(res)
          this.$emit('create', this.verificationCode)
        }
      } catch (e) {
        console.log(e)
      }
    },
    validateCode () {
      return this.code.toLowerCase() === this.verificationCode.code.toLowerCase()
    }
  }
}
</script>

<style lang="less" scoped>
  .verification-code{
    width: 100%;
    img{
      display: block;
      width: 100%;
    }
  }
</style>
