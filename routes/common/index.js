/**
 * @author NyanShen
 * @description 微信接口统一封装
 */

const request = require('request')
let config = require('./../pay/config')
const util = require('./../../util/index')
config = config.wx;

exports.getAccessToken =function(code) {
    const token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appId}&secret=${config.appSecret}&code=${code}&grant_type=authorization_code`;
    return new  Promise((resolve, reject) => {
        request.get(token_url, function (err, response, body) {
            const result = util.handleResponse(err, response, body)
            resolve(result);
        })
    })
}