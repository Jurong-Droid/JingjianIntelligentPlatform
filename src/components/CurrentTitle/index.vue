<template>
  <div :class="!isPadding ? 'title' : 'title padding-20tb'">
    <span v-if="showTitleStyle" class="title-style"></span>
    <span :class="size === 'big' ? 'title-name size-big' : 'title-name'">{{ name }}</span>
    <span v-if="showTitleStyle" class="title-style" style="margin-left: 10px;"></span>
  </div>
</template>
  
  
<script>
export default {
  props: {
    name: String,
    describe: String,
    isLine: Boolean,
    isPadding: Boolean,
    showTitleStyle: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: ''
    }
  },
  components: {}
};
</script>
  
<style scoped lang="scss">
.padding-20tb {
  padding: 20px 0;
}
.title {
  padding-left: 25%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0 !important;
  font-size: 14px;
  .title-style {
    display: block;
    height: 20px;
    width: 6px;
    background: #1990ff;
    border-radius: 20px;
    margin-right: 8px;
  }
  .describe {
    padding-left: 10px;
    padding-right: 10px;
    font-weight: normal;
    font-size: 14px;
    color: #bcbaba;
  }

  .line {
    width: 100%;
    height: 1px;
    background: #eaeaea;
    flex: 1;
  }
}

.size-big {
  font-size: 30px !important;
  font-weight: bold;
}
</style>
  