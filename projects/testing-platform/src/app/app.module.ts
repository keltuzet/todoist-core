import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenuModule } from 'dist/menu';

import { AppComponent } from './app.component';
import { TestingMenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [AppComponent, TestingMenuComponent],
  imports: [BrowserModule, CommonModule, MenuModule, OverlayModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
