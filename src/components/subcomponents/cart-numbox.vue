<template>
    <div>
        <div class="mui-numbox" style="height:25px" > <!--:data-numbox-max='max' -->
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" ref="numbox" :value="initcount" @change="onChange"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
		</div>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    mounted(){
		mui(".mui-numbox").numbox() //初始化数字选择控件 解决初始化页面时 点击失效的问题
    },
    methods:{
        onChange(){
        //每当文本框的数据被修改的时候，立即把最新的数据，通过事件调用，传递给父组件
        console.log(this.$refs.numbox.value)
        //this.$emit("getcount",parseInt(this.$refs.numbox.value))
        //调用store 更新数量
        this.$store.commit("updateToCart",{
            id:this.goodid,
            count:this.$refs.numbox.value
        })
      }
    },
    props:[
      "initcount","goodid"
    ]
}
</script>
