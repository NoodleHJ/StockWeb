import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './view/index/index.component'
import { ChooseComponent } from './view/choose/choose.component'
import { NewstockComponent } from './view/newstock/newstock.component'
import { RecommandComponent } from './component/recommand/recommand.component';
import { DayinfoComponent } from './component/dayinfo/dayinfo.component';


//the Router uses a first-match wins strategy when matching routes, so more specific routes should be placed above less specific routes. 
const routes: Routes = [ 
  {  
    path: "",
    component: IndexComponent,
    // The router checks URL elements from the left to see if the URL matches a given path, and stops when there is a match. 
    // For example, '/team/11/user' matches 'team/:id'. Since an empty path is a prefix of any URL, the router would apply the 
    // redirect even when navigating to the redirect destination, creating an endless loop.
    // pathMatch: "full"
    children:[
       {
         path: "recommendation",
         component: RecommandComponent,
         pathMatch: "full",
       }, {
        path: "dayinfo",
        component: DayinfoComponent,
        pathMatch: "full"
       }]
  },
  {  
    path: "screener",
    component: ChooseComponent,
   
  },
  {  
    path: "newstock",
    component: NewstockComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
