<template>
  <div>
    <quilleditor v-model="content" class="ql-editor"
                 ref="myTextEditor"
                 :options="editorOption"
                 :action="uploadUrl"
                 @change="onChange">
    </quilleditor>
    <!--videoUploadTag 默认是 false -->
    <!--所以这里的上传弹框是隐藏的 -->
    <!--当点击编辑器菜单栏中的视频图标时，将videoUploadTag 修改为 true 在页面上显示出来插入视频的弹框-->
    <div :visible.sync="videoUploadTag">
      <el-dialog
        width="50%"
        id="video_upload"
        style="margin-top: 1px"
        title="视频上传"
        :visible.sync="videoUploadTag"
        append-to-body>
        <el-tabs v-model="activeName" value="0">
          <el-tab-pane label="添加视频链接" name="first">
            <el-input v-model="videoLink" placeholder="请输入视频链接" clearable></el-input>
            <el-button type="primary" size="small" style="margin: 20px 0px 0px 0px " @click="addVideoLink()">添加</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped>
.ql-editor{
  margin: 0;
  padding: 0;
}
</style>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import {quillEditor} from 'vue-quill-editor'

  export default {
    name: 'v-editor',
    props: {
      value: {
        type: String
      },
      /* 上传图片的地址 */
      uploadUrl: {
        type: String,
        default: '/'
      },
      /* 上传图片的file控件name */
      fileName: {
        type: String,
        default: 'file'
      },
      maxUploadSize: {
        type: Number,
        default: 1024 * 1024 * 1024 * 5 // 默认最大5M
      }
    },
    data() {
      var self2 = this;
      return {
        content: '',
        // 显示插入视频链接弹框的标识
        videoUploadTag: false,
        // 弹框插入的视频链接记录
        videoLink: '',
        activeName: 'first',
        // 编辑器配置选项
        editorOption: {
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                ['blockquote', 'code-block'], // 引用  代码块
                [{ header: 1 }, { header: 2 }], // 1、2 级标题
                [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
                [{ script: 'sub' }, { script: 'super' }], // 上标/下标
                [{ indent: '-1' }, { indent: '+1' }], // 缩进
                [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
                [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                [{ font: [] }], // 字体种类
                [{ align: [] }], // 对齐方式
                ['clean'], // 清除文本格式
                ['link', 'image', 'video'] // 链接、图片、视频
              ],
              handlers: {
                'image': function(value) {
                  if (!self2.uploadUrl) {
                    alert('图片上传路径不存在')
                    return;
                  }
                  /* 内存创建input file */
                  var input = document.createElement('input');
                  input.type = 'file';
                  input.name = self2.fileName;
                  input.accept = 'image/jpeg,image/png,image/jpg,image/gif';
                  input.onchange = self2.onFileChange;
                  input.click()
                },
                'video': function(value) {
                  self2.videoUploadTag = true;
                }
              }
            }
          }
        }
      }
    },
    methods: {
      addVideoLink() {
        if (this.videoLink.length === 0) {
          alert('请输入视频链接');
        }
        // 当编辑器中没有输入文本时，这里获取到的 range 为 null
        var range = this.$refs.myTextEditor.quill.getSelection();
        // 视频插入在富文本中的位置
        var index = 0;
        if (range == null) {
          index = 0;
        } else {
          index = range.index;
        }
        // 隐藏弹框
        this.videoUploadTag = false;
        // 将视频链接插入到当前的富文本当中
        this.$refs.myTextEditor.quill.insertEmbed(index, 'video', this.videoLink);
      },
      onChange() {
        this.$emit('input', this.content)
      },
      /* 选择上传图片切换 */
      onFileChange(e) {
        var fileInput = e.target;
        if (fileInput.files.length === 0) {
          return
        }
        this.editor.focus();
        if (fileInput.files[0].size > this.maxUploadSize) {
          this.$alert('图片不能大于500KB', '图片尺寸过大', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
        var data = new FormData();
        data.append(this.fileName, fileInput.files[0]);
        this.$http.post(this.uploadUrl, data)
          .then(res => {
            if (res.data.data) {
              console.log(res.data.data);
              this.editor.insertEmbed(this.editor.getSelection().index, 'image', res.data.data)
            }
          })
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      }
    },
    components: {
      'quilleditor': quillEditor
    },
    mounted() {
      this.content = this.value;
    },
    watch: {
      'value'(newVal, oldVal) {
        if (this.editor) {
          if (newVal !== this.content) {
            this.content = newVal
          }
        }
      }
    }
  }

</script>
