const express = require('express')
const request = require('request')
const memoryCache = require('memory-cache')
const config = require('./config')
const router = express.Router()

router.get('/redirect', function (req, res) {
    const scope = req.query.scope;
    const redirect_url = req.query.url;
    memoryCache.put('redirect_url', redirect_url)
    const callback_url = 'http://cm.sym.com/api/wechat/getOpenId';
    const authrize_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.wx.appId}&redirect_uri=${callback_url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
    res.redirect(authrize_url)
})

router.get('/getOpenId', function (req, res) {
    //http://cm.sym.com/api/wechat/getOpenId?code=CODE&state=STATE
    const code = req.query.code;
    console.log('code:',code)
    const token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.wx.appId}&secret=${config.wx.appSecret}&code=${code}&grant_type=authorization_code`;
    if (!code) {
        res.json({
            code: 1001,
            data: '',
            message: '当前未获取到授权码'
        })
    } else {
        request.get(token_url, function (err, response, body) {
            if (!err && response.statusCode == 200) {
                const data = JSON.parse(body)
                console.log('body:', body)
                const expire_time = 1000 * 60 * 1
                res.cookie('openId', data.openId, { maxAge: expire_time })
                res.redirect(memoryCache.get('redirect_url'))
            } else {

            }
        })
    }
})
module.exports = router