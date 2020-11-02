import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router'
import axios from 'axios';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  quoteList = [];
  indexListPosition = {transform: 'translate(0px)'};
  activatePage=0;

  // ActivatedRoute: Set the value of the attribute to the component to show when a user clicks on each link. 
  constructor(public router: Router, public route: ActivatedRoute) { 
    this.getData()
  }

  ngOnInit(): void {
  }

  async getData() {
    let httpUrl = 'http://localhost:8080/api/index/quote';
    let result = await axios.get(httpUrl);
    // Here we have 2 data 
    this.quoteList = result.data.data.items;
    console.log(this.quoteList );
  }

  toggleIndex(index) {
    console.log(index)
    this.indexListPosition = {transform:`translate(-${index*640}px)`}
  }

  tableEvent(index) {
    let pathList = ['recommendation', 'dayinfo']
    this.activatePage = index;
    this.router.navigate(['', pathList[index]], {
      queryParams: {
        key: pathList[index]
      }
    })
  }
}
