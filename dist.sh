#!/bin/bash

# 处理React组件
	# 转换js
babel --presets react,es2015 __js/__main/source -d __js/__main//build
	# 打包js
#browserify __js/__main/build/app.js -o __js/concat/main.js
webpack


# 处理一般js和css
grunt

#生成产品
cp *.html dist/
cp -r css dist/
cp -r fonts dist/
cp -r __js/vendor js/vendor
cp -r js dist/
cp -r img dist/

