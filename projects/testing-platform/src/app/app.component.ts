import { Component } from '@angular/core';
import { delay, of } from 'rxjs';
import { TestingMenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testing-platform';
  menu = TestingMenuComponent;
  data$ = of('ha-ha!').pipe(delay(300));

  closed(e: any) {
    console.log(e)
  }
}
