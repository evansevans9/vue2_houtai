<template>
  <div class="tabs">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name == tag.name ? 'dark' : 'Plain'"
      @click="changeMenu(tag)"
      @close="deleMenu(tag, index)"
      size='small'
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tablist,
    }),
  },
  methods: {
    ...mapMutations(["changeMenutag"]),
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    deleMenu(item, index) {
      this.changeMenutag(item);
      if (item.name !== this.$route.name) {
        return;
      }
      if (index === this.tags.length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 10px;
        cursor: pointer;
    }
}
</style>
