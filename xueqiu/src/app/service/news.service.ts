import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  host = 'http://localhost:8080'
  constructor() { }

  async getCommandNews() {
    let httpUrl = this.host + '/api/index/hot'
    let result = await axios.get(httpUrl);
    console.log(result.data)
    return result.data
  }

  async getNews() {
    let httpUrl = this.host + '/api/index/news'
    let result = await axios.get(httpUrl);
    console.log(result.data)
    return result.data
  }

  async getIndustries() {
    let httpUrl = this.host + '/api/choose/industries'
    let result = await axios.get(httpUrl);
    console.log(result.data)
    return result.data 
  }

  async getAreas() {
    let httpUrl = this.host + '/api/choose/areas'
    let result = await axios.get(httpUrl);
    console.log(result.data)
    return result.data 
  }

  async getCStock(options) {
    let httpUrl = this.host + '/api/choose/stocks'
    let result = await axios.get(httpUrl,
      {
        params: options
      });
    console.log(result.data)
    return result.data 
  }

  // 获取筛选工具
  async getTools(){
    let httpUrl = this.host + '/api/choose/tools'
    let result = await axios.get(httpUrl);
    console.log(result.data)
    return result.data 
  }

   // 字段范围
   async getRange(field){
    console.log("service")
    let httpUrl = this.host + `/api/choose/range?field=${field}`
    console.log(httpUrl)
    let result = await axios.get(httpUrl);
    console.log(result.data)
    
    return result.data 
  }


  async getFilterStock(options){
    console.log("service")
    let httpUrl = this.host + `/api/choose/filterStock`
    console.log(httpUrl)
    let result = await axios.get(httpUrl, {params: options});
    console.log(result.data)
    
    return result.data 
  }
}