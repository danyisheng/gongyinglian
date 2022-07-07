<template>
    <div class="pageBox">
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pages.currentPage"
                :page-sizes="[20, 40, 60, 80, 100]"
                :page-size="pages.pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :total="pages.totalCount"
>
        </el-pagination>
    </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {};
    },
    props: {
        pages: {
            type: Object,
            default() {
                return {
                    currentPage: 1,
                    pageSize: 20,
                    totalPage: 1,
                    totalCount: 0
                };
            }
        }
    },
    computed: {},
    components: {},
    methods: {
      handleCurrentChange (size) {
        this.$emit('handleCurrentChange', size)

      },
      handleSizeChange (size) {
        this.$emit('handleSizeChange', size)
      }
    },
    created() {
    },
    mounted() {
    },
    watch: {
        pages: {
            handler(newVal, oldVal){

            },
            deep: true
        }
    }
  };
</script>

<style scoped lang="scss">

</style>

<style lang="scss">

</style>




