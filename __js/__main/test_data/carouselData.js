let carousel_data = {
	id: "Carousel-Demonstration",	// 轮播标记组的id
	pics:{
		items : [							// 二维数组，表示每个轮播项可以是一个或任意多个图片
			[
				{
					src: "img/img_1-1.jpg",
					alt: "Demonstration 1",
					href: "#"
				},
				{
					src: "img/img_1-2.jpg",
					alt: "Demonstration 1",
					href: "#"
				},
				{
					src: "img/img_1-3.jpg",
					alt: "Demonstration 1",
					href: "#"
				}
			],
			[
				{
					src: "img/img_2-1.jpg",
					alt: "Demonstration 1",
					href: "#"
				},
				{
					src: "img/img_2-2.jpg",
					alt: "Demonstration 1",
					href: "#"
				},
				{
					src: "img/img_3-3.jpg",
					alt: "Demonstration 1",
					href: "#"
				}
			],
			[
				{
					src: "img/img_3-1.jpg",
					alt: "Demonstration 1",
					href: "#"
				},
				{
					src: "img/img_3-2.jpg",
					alt: "Demonstration 1",
					href: "#"
				},
				{
					src: "img/img_3-3.jpg",
					alt: "Demonstration 1",
					href: "#"
				}
			],
		],
		url: "#"	// 获得图片的请求地址，这个和pics 必须有一个不为空， 如果同时存在则以pics为准
	}
};

export default carousel_data