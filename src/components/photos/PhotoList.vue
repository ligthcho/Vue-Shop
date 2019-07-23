<template>
    <div>
        <!--顶部滑动条区域-->
        <div id="slider" class="mui-slider">
				<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
					<div class="mui-scroll">
						<!--添加样式表达式 默认第一个选中-->
						<a :class="['mui-control-item',item.id == 0 ? 'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateId(item.id)">
							{{item.title}}
						</a>
					</div>
				</div>

		</div>
		<ul class="photo-list">
			<router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id">
				<img v-lazy="item.img_url">
				<div class="info">
					<h1 class="info-title">{{item.title}}</h1>
					<div class="info-body">{{item.zhaiyao}}</div>
				</div>
			</router-link>
		</ul>
    </div>
</template>
<script>
//滑动导航栏需要导入mui.js
import mui from '../../lib/mui/js/mui.min.js'
export default {
	data(){
		return{
			cates:[],//顶部分类数组
			list:[]//图片列表的数组
		}
	},
	created(){
		this.getAllCatetory()
		this.getPhotoListByCateId(0)
	},
	mounted(){//在网页标签初始化之后执行 保证目标标签已存在并设置动作
			//初始化滑动元素
            mui('.mui-scroll-wrapper').scroll({
    	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
    },
	methods:{
		getAllCatetory(){
			//获取所有图片分类
			this.$http.get("api/getimgcategory").then(
				result=>{
					if(result.body.status === 0){
						//手动拼接出一个最完整的 分类列表
						result.body.message.unshift({title:"全部",id:0})
						this.cates = result.body.message
					}
				}
			)
		},
		getPhotoListByCateId(cateId){//根据图片ID获取图片列表
			this.$http.get("api/getimages/"+cateId).then(result => {
				if(result.body.status === 0){
					this.list = result.body.message
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
     *{
         touch-action: pan-y;//去除谷歌浏览器报错
     }
	
	.photo-list{
		list-style:none;
		margin:0;
		padding: 10px;
		padding-bottom: 0;
		li{ 	
			background-color: #ccc;
			text-align: center;//居中显示
			margin-bottom: 10px;
			box-shadow: 0 0 9px #999;
			position: relative;
			img{
				border-radius:5px;
				width: 100%;
				vertical-align: middle;
			}
			img[lazy=loading] {
				width: 40px;
				height: 300px;
				margin: auto;
			}
			.info{
				color:#f7f7f7;
				text-align: left;
				position:absolute;
				bottom: 0;//上来了
				background-color:rgba(0, 0, 0,0.4);
				max-height: 84px;
				padding: 0px 2px;
				.info-title{
					font-size: 14px;
				}
				.info-body{
					font-size: 13px
				}
			}
		}
	}
</style>
