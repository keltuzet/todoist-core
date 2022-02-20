import { Component, Inject, OnInit } from '@angular/core';
import { MENU_DATA, MenuRef } from 'dist/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class TestingMenuComponent implements OnInit {
  constructor(@Inject(MENU_DATA) public data: any, private menuRef: MenuRef) {
    console.log(data);
    this.menuRef.backdropCloseValue = 'ho-ho!'
  }

  ngOnInit(): void {}
}
