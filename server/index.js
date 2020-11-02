let express = require('express');
let axios = require('axios');
let qs = require('qs');

let app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', "*")
    res.append('Access-Control-Allow-Content-Type', "*")
    next()
})

let options2 = {
    headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
              'Host': "xueqiu.com",
            //   'Origin': "https://xueqiu.com",
              'Referer': "https://xueqiu.com/?category=snb_article",
              'Sec-Fetch-Dest': "empty",
              'Sec-Fetch-Mode': "cors",
              'Sec-Fetch-Site': "same-origin",
              'Cookie': 'xq_a_token=3242a6863ac15761c18a8469b89065b03bd5e164; xqat=3242a6863ac15761c18a8469b89065b03bd5e164; xq_r_token=729679220e12a2fbd19b15c94e6b7624c5ea8702; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYwNDgwMzAzMSwiY3RtIjoxNjAyNTAwODE0MjkwLCJjaWQiOiJkOWQwbjRBWnVwIn0.Q5zWfyQdYL9C7Xw0j-eQ28zeV6vjqjyKwFYQy6edn2gaGhK3OY0YwHENxA3DX5B6QMaZRYd7FRfVWKB0Ce3xkeCt3bL2kJHnieRWt5Ec6WA3dTEKFOspL3uDg2vggrRdIP9UzNiUs00IZH-MCgEIqi_TP0JOeEQoH_Frrs6giU4i8FQ5CSIKGd1VLClS-kB9m13HF7Mxrrd9UxNeEjz891_wwI1yLFjLl5VBCT-_W7bN46YASA095wAfmvTUqLAaAaFmY4Jg8K0dfEMj-z0N6MRbETdKkQ7lzYIZq9tavyHojr3wjtQ4SDY2__KZUynSb6I7p_8ldiRnSkfTWNQNwg; u=861602500831441; device_id=24700f9f1986800ab4fcc880530dd0ed; Hm_lvt_1db88642e346389874251b5a1eded6e3=1602534380,1602536318,1602536743,1602539342; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1602706922'          
            }
}

let options = {
    headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
              'Host': "stock.xueqiu.com",
              'Origin': "https://xueqiu.com",
              'Referer': "https://xueqiu.com/",
              'Sec-Fetch-Dest': "empty",
              'Sec-Fetch-Mode': "cors",
              'Sec-Fetch-Site': "same-site",
              'Cookie': 'xq_a_token=3242a6863ac15761c18a8469b89065b03bd5e164; xqat=3242a6863ac15761c18a8469b89065b03bd5e164; xq_r_token=729679220e12a2fbd19b15c94e6b7624c5ea8702; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOi0xLCJpc3MiOiJ1YyIsImV4cCI6MTYwNDgwMzAzMSwiY3RtIjoxNjAyNTAwODE0MjkwLCJjaWQiOiJkOWQwbjRBWnVwIn0.Q5zWfyQdYL9C7Xw0j-eQ28zeV6vjqjyKwFYQy6edn2gaGhK3OY0YwHENxA3DX5B6QMaZRYd7FRfVWKB0Ce3xkeCt3bL2kJHnieRWt5Ec6WA3dTEKFOspL3uDg2vggrRdIP9UzNiUs00IZH-MCgEIqi_TP0JOeEQoH_Frrs6giU4i8FQ5CSIKGd1VLClS-kB9m13HF7Mxrrd9UxNeEjz891_wwI1yLFjLl5VBCT-_W7bN46YASA095wAfmvTUqLAaAaFmY4Jg8K0dfEMj-z0N6MRbETdKkQ7lzYIZq9tavyHojr3wjtQ4SDY2__KZUynSb6I7p_8ldiRnSkfTWNQNwg; u=861602500831441; device_id=24700f9f1986800ab4fcc880530dd0ed; Hm_lvt_1db88642e346389874251b5a1eded6e3=1602534380,1602536318,1602536743,1602539342; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1602784614'}
}

app.get('/', (req, res) => {
    res.send('apiServer')
})

app.get('/api/index/quote', async (req, res) => {
    console.log("test quote")
    let httpUrl = 'https://stock.xueqiu.com/v5/stock/batch/quote.json?symbol=SH000001,SZ399001,SZ399006,SH000688,HKHSI,HKHSCEI,HKHSCCI,.DJI,.IXIC,.INX'
    let result  =  await axios.get(httpUrl, options)
    res.json(result.data);
})

// 热股榜
app.get('/api/index/hotStock', async(req, res) => {
    //10 全球， 12 沪深， 13港股
    let index = req.query.index? req.query.index : 12
    console.log(index)
    let httpUrl = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=8&_type=${index}&type=${index}`
    let result =  await axios.get(httpUrl, options)
    res.json(result.data)
})

// news
app.get('/api/index/news', async(req, res) => {
    // let data = '{"metadata":{"service":{"name":"snb-web","agent":{"name":"js-base","version":"4.8.1"},"language":{"name":"javascript"}}}}\n{"transaction":{"id":"720e098a0273ee72","trace_id":"16cad582f39453e20aa2316a47156355","name":"Unknown","type":"route-change","duration":1195.0999999971827,"context":{"page":{"referer":"https://www.google.com/","url":"https://xueqiu.com/?category=snb_article"}},"span_count":{"started":1},"sampled":true}}\n{"span":{"id":"77bd379ecb7cdcb1","transaction_id":"720e098a0273ee72","parent_id":"720e098a0273ee72","trace_id":"16cad582f39453e20aa2316a47156355","name":"GET /statuses/hot/listV2.json","type":"external","subType":"http","sync":false,"start":29.60999999777414,"duration":1164.9500000057742,"context":{"http":{"method":"GET","url":"https://xueqiu.com/statuses/hot/listV2.json?since_id=-1&max_id=-1&size=15","status_code":200},"destination":{"service":{"name":"https://xueqiu.com","resource":"xueqiu.com:443","type":"external"},"address":"xueqiu.com","port":443}}}}'
    // let category = req.query.category?req.query.category:-1;
    let httpUrl = "https://xueqiu.com/statuses/livenews/list.json?since_id=-1&max_id=-1&count=15"
    let result = await axios.get(httpUrl, options2)
    res.json(result.data)
})

app.get('/api/index/hot', async(req, res) => {
    let httpUrl = "https://xueqiu.com/statuses/hot/listV2.json?since_id=-1&max_id=-1&size=15"
    let result = await axios.get(httpUrl, options2)
    res.json(result.data)
})


//股票筛选的工具
app.get('/api/choose/tools', async(req, res) => {
    //获取首页
    let httpUrl = "https://xueqiu.com/hq/screener"
    let result = await axios.get(httpUrl)

    //设置正则 
    let reg = /SNB.data.condition = (.*?);/igs;
    let content = reg.exec(result.data)[1];
    res.send(content)    
})

//获取股票
//获取关注人数 follow7d(本周新增关注人数) follow（最热门）
//讨论条数 tweed7d 
//分享交易 deal7d
app.get('/api/choose/stocks', async(req, res) => {
    let order_by = req.query.order_by?req.query.order_by:'follow7d';
    let page = req.query.page?req.query.page:1;
    let time = new Date().getTime();
    let order = req.query.order?req.query.order:'desc';
    let httpUrl = `https://xueqiu.com/service/screener/screen?category=CN&size=10&order=${order}&order_by=${order_by}&only_count=0&page=${page}&_=${time}`
    let result = await axios.get(httpUrl)
    res.json(result.data)    
})

//获取行业
app.get('/api/choose/industries', async(req, res) => {
    let time = new Date().getTime();
    let httpUrl = `https://xueqiu.com/service/screener/industries?category=CN&_=${time}`
    let result = await axios.get(httpUrl)
    res.json(result.data)    
})

//获取地区
app.get('/api/choose/areas', async(req, res) => {
    let time = new Date().getTime();
    let httpUrl = `https://xueqiu.com/service/screener/areas?category=CN&_=${time}`
    let result = await axios.get(httpUrl)
    res.json(result.data)    
})

//字段的最大最小值
app.get('/api/choose/range', async(req, res) => {
    let time = new Date().getTime();
    let field = req.query.field ? req.query.field : "incf.20200630"
    let httpUrl = `https://xueqiu.com/service/screener/values?category=CN&field=${field}&_=${time}`
    console.log(httpUrl)
    let result = await axios.get(httpUrl)
    res.json(result.data)    
})


app.get('/api/choose/filterStock', async(req, res) => {
    let httpUrl = `https://xueqiu.com/service/screener/screen`
    let result = await axios.get(httpUrl, {params: req.query})
    res.json(result.data)    
})

app.listen(8080, ()=>{
    console.log('server start', 'http://localhost:8080')
})   