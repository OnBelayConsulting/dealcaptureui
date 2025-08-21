import {Component, computed, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-interest-rates-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './interest-rates-menu.component.html',
  styleUrl: './interest-rates-menu.component.scss'
})
export class InterestRatesMenuComponent {
  protected readonly keycloak = inject(Keycloak);
  authenticated = computed<boolean | undefined>(  ()=> (this.keycloak.authenticated));

  constructor() {
  }

}
