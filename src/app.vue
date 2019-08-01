<template>
    <div class="app-conter">
        <!---顶部Header区域-->
        <mt-header fixed title="基于vue的商城项目">
  			<router-link to="" slot="left" v-show="isShow">
    			<mt-button icon="back"  @click.native="$router.back(-1)">返回</mt-button><!--设置返回坑：https://blog.csdn.net/qq_35393869/article/details/87349360-->
 			 </router-link>
		</mt-header>

		<!--加动画-->
		<transition>
			<router-view></router-view>
		</transition>
		
        <!--底部区域-->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{this.$store.getters.getAllCount}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>
<script>
export default {
	data(){
		return{
			isShow:false //用于返回首页顶部条不显示返回按钮
		}
	},
	watch:{//监控一个值的变换,并调用因为变化需要执行的方法
			$route(now,old){     //监控路由变换，控制返回按钮的显示
				if(now.path=="/home"){
						this.isShow=false;
				} else{
					this.isShow=true;
				}
			}
		}
}
</script>
<style lang="scss" scoped>
    .app-conter{
        padding-top: 40px;
		padding-bottom:200px;
		overflow-x:hidden; 
    }

	.v-enter{
		opacity: 0;
		transform: translateX(100%);
		
	}
	.v-leave-to{
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}

	.v-enter-active,
	.v-leave-active{
		transition: all 0.5s ease;
	}
	.mui-bar-tab .mui-tab-item-llb.mui-active {
    	color: #007aff;
	}

	.mui-bar-tab .mui-tab-item-llb {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}
	.mui-bar-tab .mui-tab-item-llb .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-llb .mui-icon~.mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.mint-header{
		z-index: 999;
	}
</style>
