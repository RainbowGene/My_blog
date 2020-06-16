<template>
  <h3>Welcome you,{{username}}!</h3>
</template>

<script>
export default {
  data () {
    return {}
  },
  computed: {
    username () {
      return sessionStorage.getItem('username') || '游客'
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
