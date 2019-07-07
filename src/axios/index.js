
var axios = require('axios')
var qs = require('qs');
axios.defaults.withCredentials = true
// 配置API接口地址接口调用工具
var root = process.env.NODE_ENV === 'production' ? '' : '/api/'
// 过期code
window.code6 = 0;
//  储存cancel token
let axiosPromiseArr = []
axios.interceptors.request.use(function (config) {
    // 在发送请求设置cancel token
    config.cancelToken = new axios.CancelToken(cancel => {
        axiosPromiseArr.push({cancel})
    })
    return config
}, function (error) {
    // 对请求错误的处理
    return Promise.reject(error)
})


// 自定义判断元素类型JS
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}

/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios(method, url, params, success, failure) {
    if (params) {
        params = filterNull(params)
    }
    // 相同get 请求 从缓存获取问题
    params.now = new Date().getTime()
    axios({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? qs.stringify(params) : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
        baseURL: root,
        withCredentials: true
    })
        .then(function (res) {
            let r = res.data
            //返回code 判断
            if (r.code === 1) {
                success(r)
            } else if (r.code === 6 && window.code6 === 0) {
                window.code6 += 1;
                window.logoutBack = setTimeout(function () {
                    document.getElementById("logoutClick").click();
                    window.code6 = 0;
                }, 3000)
            } else {
                // 错误回调
                if (failure) {
                    failure(r)
                } else {
                    //消息提示
                }
            }
        })
        .catch(function (err) {
            if (failure) {
                failure(err)
            } else {
                if (err) {
                }
            }
        })
}


function downloadExcel(url, params, success, failure) {
    if (params) {
        params = filterNull(params)
    }
    // 相同get 请求 从缓存获取问题
    params.now = new Date().getTime()
    /* 合并默认 参数 */
    axios({
        method: "POST",
        url: url,
        data: qs.stringify(params),
        baseURL: root,
        responseType: "arraybuffer"
    }).then(function (r) {
        // console.log(r)
        fileDownload(r.data,window._filename)
        success(r);
    }).catch(function (r) {
        failure(r)
    })
}

/**
 *
 * @param data 流
 * @param fileName 名称
 */
function fileDownload(data, fileName) {
    let blob = new Blob([data], {
        type: "application/octet-stream"
    });
    let filename = fileName || "filename.xls";
    if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        var blobURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
            tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
};
// 返回在vue模板中的调用接口
let api = {};
api.get = function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
};
api.post = function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
};
api.put = function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
};
api.delete = function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
};
api.downloadExcel = function (url, params, success, failure) {
    return downloadExcel(url, params, success, failure)
}
/**
 * 请求终止
 */
api.abort = function () {
    axiosPromiseArr.forEach((ele, index) => {
        ele.cancel()
        delete axiosPromiseArr[index]
    })
}
export default api


