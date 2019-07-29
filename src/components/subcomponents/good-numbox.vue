<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' > <!--:data-numbox-max='max' -->
					<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
					<input id="test" class="mui-input-numbox" type="number" ref="numbox" value="1" @change="onChange"/>
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
        //console.log(this.$refs.numbox.value)
        this.$emit("getcount",parseInt(this.$refs.numbox.value))
      }
    },
    props:[
      "max"
    ],
    watch:{//监听父组件传过来的最大值
        'max':function(newVal,oldVal){
          mui(".mui-numbox").numbox().setOption("max",newVal)
        }
    }
}
</script>
