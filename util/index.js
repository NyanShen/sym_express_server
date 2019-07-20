module.exports = {
    handleResponse(err, response, body) {
        if (!err && response.statusCode == 200) {
            const data = JSON.parse(body);
            if (data && !data.errCode) {
                return this.handleSuccess(data);
            }else{
                return this.handleFail(data.errMsg, data.errCode);
            }
        }else {
            return this.handleFail(err, 10009)
        }
    },
    handleSuccess(data = '') {
        return {
            code: 0,
            data,
            message: ""
        }
    },
    handleFail(message = '', code = 10001) {
        return {
            code,
            data: "",
            message
        }
    }
}