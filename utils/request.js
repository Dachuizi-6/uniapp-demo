const BASE_URL = "https://www.fastmock.site/mock/682724154432b2998154c7ac8d4daf1b/api"

function request({url,data,method}){
	return new Promise((resolve,reject) => {
		uni.request({
			url: BASE_URL + url,
			data,
			method,
			success:( {data} ) => {
				if(data.success){
					// 这里的data是服务器返回的最原始的数据
					resolve(data)
				}else{
					// 接口内部错误
					uni.showToast({
						title:data.message,
						icon:'none',
						mask:true,
						duration:3000
					});
					reject(data.mesage)
				}
			},
			// 最外层网络请求错误
			fail:(error) => {
				reject(error)
			}
		})
	})
}

export default request