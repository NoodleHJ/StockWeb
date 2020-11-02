import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news.service'

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.less']
})
export class ChooseComponent implements OnInit {
  industrieList = []
  areaList = []
  areas = {}
  tools = {}
  tabList = []
  tabObj = {} 
  currentTab = '基本指标'
  open = [true, true, true, true]
  openText = ["收起", "收起", "收起", "收起"]
  filterList = []
  exchange = "sh_sz"
  areacode = ""
  indcode = ""
  filterStockList = []
  

  constructor(public newSer: NewsService) { }

  async ngOnInit() {
    this.getIndustries()
    this.getAreas()
    this.getTools()
    this.getStock
  }

  async getIndustries() {
    let result = await this.newSer.getIndustries()
    this.industrieList = result.data.industries
  }

  async getAreas() {
    let result = await this.newSer.getAreas()
    this.areas = result.data.areas
    console.log(Object.keys(this.areas))
    this.areaList = Object.keys(this.areas)
  }

  async getTools() {
    let resultTools = await this.newSer.getTools()
    this.tabObj = resultTools
    console.log(resultTools)
    this.tabList =  Object.keys(resultTools)
    this.currentTab = this.tabList[0]
  }

  async getStock() {
    let resultStock = await this.newSer.getCStock({
      order_by: 'follow',
      page: 1, 
      order: 'desc',
    })
    console.log(resultStock)
  }

  toggleTabs(key) {
    this.currentTab = key 
  }
  togglePanel(i: number) {
    this.open[i] = !this.open[i]
    this.switchText(i)
  }

  switchText(i: number) {
    this.openText[i] = this.open[i] ? "收起" : "展开"
  }

  async checkEvent(item) {
    console.log("field")
    console.log(item)
    let isChecked = true;
    this.filterList.forEach((filterObj, index)=>{
      if(filterObj.field == item.field) {
        this.filterList.slice(index, 1);
        isChecked = false
      }
    })
    if (!isChecked) {
      return
    }
    item.field = item.field + ((item.adj == 0)? "" : ".20200630")
    console.log(item.field )
    let result = await this.newSer.getRange(item.field)
    console.log(result)
    item.min = result.data.min
    item.max = result.data.max
    item.cmin = item.min
    item.cmax = item.max
    console.log("item")
    console.log(item)
    this.filterList.push(item)
  }


  async getSelectStock() {
    let options = {
      category: "CN",
      exchange: this.exchange,
      areacode: this.areacode,
      indcode: this.indcode,
      order_by: "symbol",
      order: "desc",
      page: 1,
      size: 30,
      only_count: 0,
      current: "",
      pct: "",
      // csps: -1.16_73.57
      // npana.20200630: -31790000000_148164000000
      _: new Date().getTime()
    }

    this.filterList.forEach(item => {
      let value = ""
      if(parseFloat(item.cmax) > parseFloat(item.cmin)) {
        value = item.cmin + "_" + item.cmax
      } else {
        value = item.cmin + "_" + item.cmax
      }
      options[item.field] = value
    })


    console.log("options:" )
    console.log(options)

    let result = await this.newSer.getFilterStock(options)
    this.filterStockList = result.data.list
    console.log(this.filterStockList)
  }

}
 