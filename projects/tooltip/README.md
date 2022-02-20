# Tooltip

A menu displays a list of choices or any view. They appear when users interact with a button, action, or other control.

## Installation
```
npm install todoist-tooltip
```
## Basic Usage

### Menu from template
#### Component HTML
```
<button [tMenuTrigger]="menu">Open menu</button>
<ng-template #menu><p>Any tempate</p></ng-template>
```

### Menu from component
#### Component HTML
```
<button [tMenuTrigger]="menu">Open menu</button>
```
#### Component
```
@Component({
  selector: 't-header-extra-toolbar',
  templateUrl: './header-extra-toolbar.component.html',
  styleUrls: ['./header-extra-toolbar.component.scss'],
})
export class HeaderExtraToolbarComponent {
  productivityMenu = MenuComponent;
}
```
