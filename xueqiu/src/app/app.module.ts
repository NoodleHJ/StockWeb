import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './view/index/index.component';
import { ChooseComponent } from './view/choose/choose.component';
import { NewstockComponent } from './view/newstock/newstock.component';
import { RecommandComponent } from './component/recommand/recommand.component';
import { DayinfoComponent } from './component/dayinfo/dayinfo.component';
import { ToTimePipe } from './pipe/to-time.pipe';
import { JsonToArrayPipe } from './pipe/json-to-array.pipe';
import { DicKeyPipe } from './pipe/dic-key.pipe';
import { DicValuePipe } from './pipe/dic-value.pipe';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ChooseComponent,
    NewstockComponent,
    RecommandComponent,
    DayinfoComponent,
    ToTimePipe,
    JsonToArrayPipe,
    DicKeyPipe,
    DicValuePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
