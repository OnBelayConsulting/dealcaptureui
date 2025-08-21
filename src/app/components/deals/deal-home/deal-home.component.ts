import {Component} from '@angular/core';
import {DealMenuComponent} from '../deal-menu/deal-menu.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-deal-home',
  imports: [
    DealMenuComponent,
    RouterOutlet
  ],
  templateUrl: './deal-home.component.html',
  styleUrl: './deal-home.component.scss'
})
export class DealHomeComponent {

}
