后台管理系统的布局一直中规中矩，对于一个后端工程师，对前端知识也需要有一定的了解。下面介绍一下自己用vue做的一个后台模板，主要是方便自己以后的[使用](https://github.com/jack13163/vue-admin-custom)。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2020080315462227.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eGhhbmdpaWFuMTIzNDU2Nzg5,size_16,color_FFFFFF,t_70)
先对页面的结果做一下分析，首先可以看到上边是公司的logo和个人头像，下边分为两个部分，左边是导航栏，右边是点击导航后展示的Tab选项卡。这里没有做[点击导航时右边直接展示详情页](https://blog.csdn.net/weixin_41614732/article/details/105495539?utm_medium=distribute.pc_relevant.none-task-blog-baidujs-3&spm=1001.2101.3001.4242)，主要是因为实际中我们可能更喜欢选项卡这种方式，方便同时打开多个管理页面。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200803155411740.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eGhhbmdpaWFuMTIzNDU2Nzg5,size_16,color_FFFFFF,t_70)
主要实现代码如下图所示，这里有四个文件：
1. Layout.vue：布局组件，完成基本的布局结构，同时负责协调组件通信；
2. Main.vue：选项卡组件，完成选项卡的具体功能；
3. Nav.vue：导航组件，完成导航功能；
4. Top.vue：顶部布局组件，完成顶部的布局。

另外，还有Goods.vue，这个组件主要展示商品的详情，当点击导航栏中的“编辑商品”按钮后，选项卡组件中就会添加一个该组件。

推荐阅读：[vue组件间通信六种方式](https://segmentfault.com/a/1190000019208626)

# 1. 在标签 el-tabs 中使用组件作为 content

模板：
```bash
<el-tabs v-model="editableTabsValue" type="border-card" @edit="removeTab" closable style="height: 100%;">
    <el-tab-pane :key="item.name" v-for="(item) in editableTabs" :label="item.title" :name="item.name">
        <tab-component :is=item.content></tab-component>
    </el-tab-pane>
</el-tabs>
```

引入组件：
```bash
import tableTab from '@/components/main/tabs/TableTab'
```

并注册为子组件：
```bash
components: {
 tableTab
}
```
使用组件
```bash
editableTabs: [{
    title: '对象',
    name: '1',
    content: 'tableTab'
}]
```

# 2. 组件之间的通信
## 2.1 删除选项卡功能

为了完成Main组件和Layout组件的双向数据绑定，本文做法：

> 父组件（Layout组件）调用子组件（Main组件）传值，子组件通过props接收父组件传来的值，并通过emit发送方法名和值，父组件根据传来的方法名定义方法接收值并进行赋值操作，[详情请移步](https://www.cnblogs.com/clsl/p/12656334.html)。

如下图所示，父组件Layout向子组件Main传入数据 **tabData**。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200803233604804.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eGhhbmdpaWFuMTIzNDU2Nzg5,size_16,color_FFFFFF,t_70)
当子组件Main中某一个选项卡将要被删除时，则可以通过```this.$emit('tabDeleted', targetName)```通知Layout父组件删除选项卡，Layout组件接收到通知后将会执行绑定的事件处理方法执行更新。这里你可以做一些额外的操作，例如：仅能删除处于选中状态的选项卡。具体做法是：首先，判断当前需要删除的选项卡是否处于被选中状态，如果是则删除相应的选项卡数据；否则，不做任何处理。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200803234908643.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eGhhbmdpaWFuMTIzNDU2Nzg5,size_16,color_FFFFFF,t_70)
## 2.2 导航点击功能
在点击Nav组件时，需要通知Layout组件添加选项卡。注意，应当避免同一个组件被打开两次，Layout组件需要判断当前组件是否已经打开，若是，则直接定位选中该选项卡；否则，通知Main组件添加选项卡。因为上一节中已经完成了数据的双向绑定，所以这里只需要更改相关的数据即可。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200804004727270.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eGhhbmdpaWFuMTIzNDU2Nzg5,size_16,color_FFFFFF,t_70)
## 2.3 添加选项卡功能

值得注意的是，为了将所有的其他模块统一在Main组件中注册和管理，这里所有需要通过选项卡展示的模块统一注册到Main组件中。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200804002143868.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eGhhbmdpaWFuMTIzNDU2Nzg5,size_16,color_FFFFFF,t_70)
特别注意：

1. 注册需要在选项卡中显示的组件
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200804001804819.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eGhhbmdpaWFuMTIzNDU2Nzg5,size_16,color_FFFFFF,t_70)
2. 创建选项卡时指定要组件的名称要和注册时保持一致
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200804001911622.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3p5eGhhbmdpaWFuMTIzNDU2Nzg5,size_16,color_FFFFFF,t_70)

本文没有介绍更改选中的选项卡功能的实现。虽然这个功能可以通过和删除选项卡功能比较类似的做法实现。但是，实践表明，框架已经帮我们实现了，我们可以不关心这一点。