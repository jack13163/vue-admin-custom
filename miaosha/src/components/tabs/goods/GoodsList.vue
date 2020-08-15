<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="全部列表" name="first">
      <el-row>
        <el-col :span="6">
          <el-input v-model="goodsName" placeholder="请输入商品名称">
            <template slot="prepend">商品名称</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="goodsCategory" placeholder="请输入商品分类">
            <template slot="prepend">商品分类</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-input v-model="goodsBrand" placeholder="请输入商品品牌">
            <template slot="prepend">品牌</template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" round @click="search">查询</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          align="center"
          prop="id"
          label="编号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          align="center"
          label="图片"
          prop="image">
          <template slot-scope="scope">
            <img :src="scope.row.image" width="40" height="40" />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="saleNum"
          label="销量">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === '0'">未审核</span>
            <span v-else >已审核</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status === '0'" @click="audit(scope.row.id)" size="small" type="primary">审核</el-button>
            <el-button v-else-if="scope.row.isMarketable === '0'" @click="push(scope.row.id)" size="small" type="primary">上架</el-button>
            <el-button v-else @click="pull(scope.row.id)" size="small"  type="primary">下架</el-button>
            <el-button v-if="scope.row.isDelete === '0'" @click="deleteGoods(scope.row.id)" size="small"  type="primary">删除</el-button>
            <el-button v-else type="primary" primary size="small" @click="find(scope.row.id)">找回</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--仅有一页时不显示分页插件-->
      <el-pagination
        background
        :hide-on-single-page="true"
        layout="prev, pager, next"
        :current-page="pageNo"
        :page-size="pageSize"
        :total="total"
        @current-change="pageChange">
      </el-pagination>
    </el-tab-pane>
    <el-tab-pane label="已上架" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="未上架" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="待审核" name="fourth">定时任务补偿</el-tab-pane>
    <el-tab-pane label="已删除" name="five">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>

<style scoped>
.el-col{
  margin-bottom: 10px;
  height: 35px;
  line-height: 35px;
}
.el-col{
  padding: 0 20px;
  height: auto;
}
</style>

<script>
  export default {
    data() {
      return {
        pageNo: 1,
        pageSize: 5,
        total: 1,
        pages: 1,
        tableData: [],
        activeName: 'first',
        goodsName: '',
        goodsCategory: '',
        goodsBrand: ''
      }
    },
    methods: {
      // 关键字搜索
      search() {

      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      // 商品上架
      push(id) {
        var url = '/spu/push/' + id;
        this.ajaxPut(url, {redirect: url}, response => {
          // 成功提示
          const msg = response.data.message;
          this.$message(msg);
          this.updateData();
        }, e => {
          // 错误提示
          this.$notify.error({
            title: '错误',
            message: e
          });
        })
      },
      // 商品下架
      pull(id) {
        var url = '/spu/pull/' + id;
        this.ajaxPut(url, {redirect: url}, response => {
          // 成功提示
          const msg = response.data.message;
          this.$message(msg);
          this.updateData();
        }, e => {
          // 错误提示
          this.$notify.error({
            title: '错误',
            message: e
          });
        })
      },
      // 商品审核
      audit(id) {
        var url = '/spu/audit/' + id;
        this.ajaxPut(url, {redirect: url}, response => {
          const msg = response.data.message;
          // 成功提示
          this.$message(msg);
          this.updateData();
        }, e => {
          // 错误提示
          this.$notify.error({
            title: '错误',
            message: e
          });
        })
      },
      // 商品删除
      deleteGoods(id) {
        var url = '/spu/goods/' + id;
        this.ajaxDelete(url, {redirect: url}, response => {
          const msg = response.data.message;
          // 成功提示
          this.$message(msg);
          this.updateData();
        }, e => {
          // 错误提示
          this.$notify.error({
            title: '错误',
            message: e
          });
        })
      },
      // 商品找回
      find(id) {
        var url = '/spu/goods/find/' + id;
        this.ajaxPut(url, {redirect: url}, response => {
          const msg = response.data.message;
          // 成功提示
          this.$message(msg);
          this.updateData();
        }, e => {
          // 错误提示
          this.$notify.error({
            title: '错误',
            message: e
          });
        })
      },
      updateData() {
        // 在页面加载完成后请求数据
        var url = '/spu/search/' + this.pageNo + '/' + this.pageSize;
        this.queryGet(url, {redirect: url}, response => {
          const data = response.data.data;
          this.tableData = data.list;
          this.pages = data.pages;
          this.pageNo = data.pageNum;
          this.total = data.total;
        }, e => {
          console.log(e)
        })
      },
      pageChange(page) {
        this.pageNo = page;
        // 在页面加载完成后请求数据
        this.updateData();
      },
      deleteClick(row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const url = '/album/' + row.id;
          this.ajaxDelete(url, {redirect: url}, response => {
            // 更新表格中的数据
            this.updateData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }, e => {
            console.log(e);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    mounted() {
      // 在页面加载完成后请求数据
      this.updateData();
    }
  }
</script>
