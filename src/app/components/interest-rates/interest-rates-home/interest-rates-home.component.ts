import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {InterestRatesMenuComponent} from '../interest-rates-menu/interest-rates-menu.component';

@Component({
  selector: 'app-interest-rates-home',
  imports: [
    RouterOutlet,
    InterestRatesMenuComponent
  ],
  templateUrl: './interest-rates-home.component.html',
  styleUrl: './interest-rates-home.component.scss'
})
export class InterestRatesHomeComponent {

}
