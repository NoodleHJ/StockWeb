import { JsonPipe } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../service/news.service';

@Component({
  selector: 'app-recommand',
  templateUrl: './recommand.component.html',
  styleUrls: ['./recommand.component.less']
})
export class RecommandComponent implements OnInit {

  newsList=[]

  constructor(public route: ActivatedRoute, public newService: NewsService) { }

  ngOnInit(): void {
    // rxjs/promise->async_await
    this.route.queryParams.subscribe( (params) => {
      console.log(params)
      switch(params.key) {
        case 'hushen':
          break;
        default:
          this.newService.getCommandNews().then((res) => {
            console.log(res)
            // res.items.forEach(element => {
            //   console.log("test")
            //   console.log(element)
            //   element.original_status = JSON.parse(element.original_status) 
            // });
            this.newsList=res.items
            console.log(this.newsList)
          }) 
      }
    })
  }

} 
