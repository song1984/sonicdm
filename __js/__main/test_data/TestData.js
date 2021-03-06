import carouselData from './carouselData';
import navigatorData from './navigatorData';
import navigatorDataVer2 from './navigatorData-Ver2';

const TestData = {
	Carousel: carouselData,		// bootstrap 原版轮播图测试数据
	Navigator: navigatorData,	// bootstrap 原版导航栏测试数据
	NavigatorVer2: navigatorDataVer2,


	get_data: function(prop_name){
		if(prop_name in this){
			return this[prop_name];
		}else {
			console.log('Error: undefined prop in TestData !');
		}
	}
};

const get_data = TestData.get_data.bind(TestData);

export default get_data