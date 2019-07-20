const express = require('express')
const request = require('request')
const memoryCache = require('memory-cache')
const config = require('./config')
const util = require('./../../util/index')
const common = require('./../common/index')
const router = express.Router()

router.get('/redirect', function (req, res) {
    const scope = req.query.scope;
    const redirect_url = req.query.url;
    memoryCache.put('redirect_url', redirect_url)
    const callback_url = 'http://cm.sym.com/api/wechat/getOpenId';
    const authrize_url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.wx.appId}&redirect_uri=${callback_url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`;
    res.redirect(authrize_url)
})

router.get('/getOpenId', async function (req, res) {
    //http://cm.sym.com/api/wechat/getOpenId?code=CODE&state=STATE
    const code = req.query.code;
    if (!code) {
        res.json(util.handleFail('当前未获取到授权码'))
    } else {
        const result = await common.getAccessToken(code);
        if (result.code == 0) {
            const data = result.data;
            const expire_time = 1000 * 60 * 1
            res.cookie('openId', data.openId, { maxAge: expire_time })
            res.redirect(memoryCache.get('redirect_url'))
        }else {
            res.json(result)
        }
    }
})
module.exports = router