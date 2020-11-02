import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsService } from '../../service/news.service';
import axios from 'axios';

@Component({
  selector: 'app-dayinfo',
  templateUrl: './dayinfo.component.html',
  styleUrls: ['./dayinfo.component.less']
})
export class DayinfoComponent implements OnInit {
  newsList=[]
  currentTime = new Date()
  currentStock = 10
  rankList= this.getRankList(this.currentStock);
  timeObj = {
    '01': '一月',
    '02': '二月',
    '03': '三月',
    '04': '四月',
    '05': '五月',
    '06': '六月',
    '07': '七月',
    '08': '八月',
    '09': '九月',
    '10': '十月',
    '11': '十一月',
    '12': '十二月'
  }
  constructor(public newsServer: NewsService) { }

  ngOnInit(): void {
    this.newsServer.getNews().then(res =>{
      this.newsList = res.items
      console.log(this.newsList)
    })
  }

//   app.get('/api/index/hotStock', async(req, res) => {
//     //10 全球， 12 沪深， 13港股
//     let index = req.query.index? req.query.index : 12
//     console.log(index)
//     let httpUrl = `https://stock.xueqiu.com/v5/stock/hot_stock/list.json?size=8&_type=${index}&type=${index}`
//     let result =  await axios.get(httpUrl, options)
//     res.json(result.data)
// })


  async getRankList(index) {
     //10 全球， 12 沪深， 13港股
    let httpUrl = `http://localhost:8080/api/index/hotStock?index=${index}`;
    
    let result = await axios.get(httpUrl);
    // console.log("result");
    // console.log(result.data) ;
    this.rankList = result.data.data.items;
    console.log(this.rankList) ;
  }

  getMonth(month) {
    return this.timeObj[month]
  }

  getRank(index) {
    this.currentStock = index;
    this.getRankList(index);
  }

}
