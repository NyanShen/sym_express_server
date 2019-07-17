const express = require('express')
const request = require('request')
const memoryCache = require('memory-cache')
const config = require('./config')
const router = express.Router()

router.get('/test', function (req, res) {
    res.json({
        code: 0,
        data: {
            test: "Nyan Test"
        },
        message: ''
    })
})
router.get('/redirect', function (req, res) {
    const redirectUrl = req.query.url;
    memoryCache.put('redirectUrl', redirectUrl)
    const scope = req.query.scope;
    const callbackUrl = 'http://cm.sym.com/api/wechat/getOpenId';
    const authrizeUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.wx.appId}&redirect_uri=${callbackUrl}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
    res.redirect(authrizeUrl)
})

router.get('/getOpenId', function(req, res) {
    
})
module.exports = router