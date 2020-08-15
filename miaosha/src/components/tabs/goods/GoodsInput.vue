<template>
    <div class="block">
      <!-- 商品名称 -->
      <el-row>
        <el-col :span="2">
          <font color='red'>*</font>商品名称
        </el-col>
        <el-col :span="22">
          <el-input v-model="name" placeholder="请输入商品名称"></el-input>
        </el-col>
      </el-row>

      <!-- 副标题 -->
      <el-row>
        <el-col :span="2">
          <font color='red'>*</font>副标题
        </el-col>
        <el-col :span="22">
          <el-input v-model="caption" placeholder="请输入副标题"></el-input>
        </el-col>
      </el-row>

      <!-- 分类选项 -->
      <el-row>
        <el-col :span="2">
          <font color='red'>*</font>商品分类
        </el-col>
        <el-col :span="22">
          <el-cascader
            placeholder=""
            :options="options"
            @change="handleChange"
            filterable></el-cascader>
        </el-col>
      </el-row>

      <!-- 品牌选项 -->
      <el-row>
        <el-col :span="2">
          <font color='red'>*</font>商品品牌
        </el-col>
        <el-col :span="22">
          <el-select v-model="brandId" placeholder="请选择">
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <!-- 商品货号 -->
      <el-row>
        <el-col :span="2">
          <font color='red'>*</font>商品货号
        </el-col>
        <el-col :span="22">
          <el-input v-model="sn" placeholder="请输入货号"></el-input>
        </el-col>
      </el-row>

      <!-- 规格选项 -->
      <el-row v-for="(item, index) in specList" :key="index">
        <el-col :span="2">
          {{item.name}}
        </el-col>
        <el-col :span="22">
          <el-checkbox-group v-model="checkedSpecList[index]" >
            <el-checkbox v-for="(data,ind) in item.options.split(',')" @change="checkedChange(data,ind,item.id,item.name)" :label="data" :key="ind">{{data}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>

      <!-- 根据规格选项产生Sku列表 -->
      <el-table style="width: 100%" :data="skuList['dataList']">
        <el-table-column v-for="(item,index) in skuList['dataColumn']" :key="index" :label="item" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row[index] }}</span>
          </template>
        </el-table-column>
        <!-- 固定列 -->
        <el-table-column align="center"
          prop="price"
          label="价格">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price" placeholder="价格" @change="priceChanged(scope.$index, scope.row.price)" ></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center"
          prop="num"
          label="库存数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.num" placeholder="库存数量" @change="numChanged(scope.$index, scope.row.num)"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center"
          prop="alertNum"
          label="库存预警值">
          <template slot-scope="scope">
            <el-input v-model="scope.row.alertNum" placeholder="库存预警值" @change="alertNumChanged(scope.$index, scope.row.alertNum)"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center"
          prop="name"
          label="SKU编号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" placeholder="SKU编号" @change="nameChanged(scope.$index, scope.row.name)"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center"
          prop="weight"
          label="重量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.weight" placeholder="重量" @change="weightChanged(scope.$index, scope.row.weight)"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center"
          prop="isEnableSpec"
          label="是否启用规格">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.isEnableSpec" @change="isEnableSpecChanged(scope.$index, scope.row.isEnableSpec)"/>
          </template>
        </el-table-column>
        <el-table-column align="center"
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-upload :action="uploadUrl" :on-success="(value)=>uploadImageSuccess(scope.$index, value)" :show-file-list="false">
              <el-button size="small" type="primary">上传图片</el-button>
            </el-upload>
          </template>
        </el-table-column>
      </el-table>

      <!-- 参数选项 -->
      <el-row v-for="(it,index) in paraList" :key="index + 'rose'">
        <el-col :span="2">
          {{it.name}}
        </el-col>
        <el-col :span="22">
          <el-select v-model="checkedParaList[it.name]" :label="it.name" placeholder="请选择" @change="selectChange(checkedParaList[it.name],it.id)">
            <el-option
              v-for="(data,ind) in it.options.split(',')"
              :key="ind"
              :label="data"
              :value="data">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <!-- 商品相册 -->
      <el-upload
        :action="uploadUrl"
        list-type="picture-card"
        name="file"
        :file-list="images"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
        <!-- <div slot="tip" class="el-upload__tip"><font color='black'>*默认第一个为相册主图</font></div> -->
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <!-- 详情描述 -->
      <el-row class="classA">
        <el-col :span="24">
          <vEditor v-model="introduction" :upload-url="uploadUrl" fileName="file"/>
        </el-col>
      </el-row>

      <!-- 售后服务 -->
      <el-row>
        <el-col :span="2">
          售后服务
        </el-col>
        <el-col :span="22">
          <el-checkbox-group v-model="saleService">
            <el-checkbox label="无忧退货"></el-checkbox>
            <el-checkbox label="快速退款"></el-checkbox>
            <el-checkbox label="免费包邮"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-button type="success" round @click="addGoods">提交审核</el-button>
        </el-col>
      </el-row>
    </div>
</template>

<style scoped>
.el-row{
  margin: 8px 0;
  height: 35px;
  line-height: 35px;
}
.classA{
  height: auto;
}
</style>

<script>
import vEditor from '@/components/ue/ue.vue';
  export default {
    components: {
      vEditor
    },
    data() {
      return {
        name: '外星人笔记本', // 商品名称
        caption: '酣畅吃鸡', // 副标题
        brandId: '', // 品牌编号
        category1Id: '', // 1级选择器属性
        category2Id: '', // 2级选择器属性
        category3Id: '', // 2级选择器属性
        sn: 'NO005', // 商品货号
        saleService: [], // 售后服务
        uploadUrl: 'http://127.0.0.1:18025/upload', // 图片上传路径
        selCategory: 1, // 选择的分类
        price: [], // sku商品价格
        num: [], // sku商品库存
        alertNum: [], // sku商品库存预警值
        skuname: [], // sku商品名称，后台对应着name字段
        weight: [], // sku商品的重量
        isEnableSpec: [], // sku商品是否启用规格
        image: '', // sku商品相册封面
        images: [], // 商品相册图片列表
        options: [], // 分类集合
        specList: [], // 规格集合
        brandList: [], // 品牌集合
        checkedSpecList: [], // 选中的规格集合，不定长度，需要提前进行初始化，另外checkbox使用v-model进行绑定数据时必须指定一个数组，因此，该变量是一个变长的二维数组
        skuList: [], // 规格选项产生的商品
        paraList: [], // 参数集合
        checkedParaList: {}, // 选中的参数集合
        introduction: '', // 详情描述，富文本编辑器中的内容
        dialogImageUrl: '', // 相片预览图片路径
        dialogVisible: false // 预览对话框是否显示
      }
    },
    methods: {
      priceChanged(ind, value) {
        this.price[ind] = value;
      },
      numChanged(ind, value) {
        this.num[ind] = value;
      },
      alertNumChanged(ind, value) {
        this.alertNum[ind] = value;
      },
      nameChanged(ind, value) {
        this.skuname[ind] = value;
      },
      weightChanged(ind, value) {
        this.weight[ind] = value;
      },
      isEnableSpecChanged(ind, value) {
        this.isEnableSpec[ind] = value;
      },
      // 相册封面上传成功
      uploadImageSuccess (ind, response) {
        console.log(ind);
        this.images[ind] = response.data;
        this.$message('相册封面上传成功');
      },
      // 相册移除图片
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      // 预览相册图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 选择的商品分类改变
      handleChange(node) {
        if (node.length === 1) {
          this.category1Id = node[0];
        } else if (node.length === 2) {
          this.category1Id = node[0];
          this.category2Id = node[1];
        } else {
          this.category1Id = node[0];
          this.category2Id = node[1];
          this.category3Id = node[2];
        }
      },
      // 上传图片
      uploadImage(e) {
        console.log(e);
      },
      checkedChange(data, ind, id, name) {
        console.log(this.skuList);
        this.skuList = [];
        // 生成skuList数据[生成组合数据]
        var arr = [];// 不包含没有选中的checkbox组
        var col = [];
        for (var s = 0; s < this.checkedSpecList.length; s++) {
          // 某一组没有一个被选中，则不显示改组的规格
          if (this.checkedSpecList[s].length > 0) {
            arr.push(this.checkedSpecList[s]);
            col.push(this.specList[s].name);
          }
        }
        this.$set(this.skuList, 'dataColumn', col);
        // 进行排列组合
        var sarr = [[]];
        for (var i = 0; i < arr.length; i++) {
          var tarr = [];
          for (var j = 0; j < sarr.length; j++) {
            for (var k = 0; k < arr[i].length; k++) {
              tarr.push(sarr[j].concat(arr[i][k]));
            }
          }
          sarr = tarr;
        }
        this.$set(this.skuList, 'dataList', sarr);
        console.log(this.skuList);
      },
      selectChange(data, id) {
        console.log(this.checkedParaList);
      },
      // 添加商品
      addGoods() {
        var url = '/spu/goods';

        // 封装spu
        const spu = {
          'sn': this.sn,
          'name': this.name,
          'caption': this.caption,
          'brandId': this.brandId,
          'category1Id': this.category1Id,
          'category2Id': this.category2Id,
          'category3Id': this.category3Id,
          'image': this.image,
          'images': this.images.join(','),
          'specItems': this.skuList['dataColumn'].join(','), // 规则名称列表
          'paraItems': JSON.stringify(this.checkedParaList), // 参数名称列表
          'saleService': this.saleService.join(','),
          'introduction': this.introduction
        };

        var skus = [];
        var list = this.skuList['dataList'];
        for (var row in list) {
          var tmp = {};

          this.$set(tmp, 'sn', this.sn);// 货号
          this.$set(tmp, 'spec', list[row].join(','));// 规格信息
          this.$set(tmp, 'price', this.price[row]);
          this.$set(tmp, 'num', this.num[row]);
          this.$set(tmp, 'alertNum', this.alertNum[row]);
          this.$set(tmp, 'name', this.skuname[row]);
          this.$set(tmp, 'weight', this.weight[row]);
          this.$set(tmp, 'isEnableSpec', this.isEnableSpec[row]);
          this.$set(tmp, 'image', this.images[row]);
          this.$set(tmp, 'images', this.images[row]);

          skus.push(tmp);
        }
        console.log({spu: spu, skuList: skus})

        const data = JSON.stringify({spu: spu, skuList: skus});
        this.ajaxPost(url, data, response => {
          this.$message({
            type: 'success',
            message: '保存商品信息成功!'
          });
          console.log(response.data.data);
        }, e => {
          console.log(e);
        })

        // 跳转到列表Tab页
        this.$emit('tabChanged', 'goods');
      }
    },
    mounted() {
      // 在页面加载完成后请求数据
      this.queryGet('/category/menu', {redirect: '/category/menu'}, response => {
        this.options = response.data.data
      }, e => {
        console.log(e)
      })
      // 请求商品规格数据
      var url = '/spec/category/' + this.selCategory;
      this.queryGet(url, {redirect: url}, response => {
        this.specList = response.data.data;
        // 初始checkedSpecList数组，必须指定大小
        for (var key in this.specList) {
          this.$set(this.checkedSpecList, key, [])
        }
      }, e => {
        console.log(e)
      })
      // 请求商品参数数据
      url = '/para/category/' + this.selCategory;
      this.queryGet(url, {redirect: url}, response => {
        this.paraList = response.data.data;
      }, e => {
        console.log(e)
      })
      // 请求商品的品牌数据brandList
      url = '/brand/category/' + this.selCategory;
      this.queryGet(url, {redirect: url}, response => {
        this.brandList = response.data.data;
      }, e => {
        console.log(e)
      })
    }
  }
</script>
