import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PlayersInfoComponent } from './players-info/players-info.component';
import { HandleCardsComponent } from './handle-cards/handle-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PlayersInfoComponent,
    HandleCardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
