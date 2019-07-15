const express = require('express');
const router = express.Router();

router.get('/test', function(req, res){
    res.json({
        code: 200,
        data: {
            test: "Nyan Test"
        },
        message: ''
    })
})
module.exports = router