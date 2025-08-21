import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {PricingMenuComponent} from '../pricing-menu/pricing-menu.component';

@Component({
  selector: 'app-pricing-home',
  imports: [
    RouterOutlet,
    PricingMenuComponent
  ],
  templateUrl: './pricing-home.component.html',
  styleUrl: './pricing-home.component.scss'
})
export class PricingHomeComponent {

}
