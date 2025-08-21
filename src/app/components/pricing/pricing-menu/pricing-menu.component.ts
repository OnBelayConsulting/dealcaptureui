import {Component, computed, inject} from '@angular/core';
import {HasRolesDirective} from "keycloak-angular";
import {RouterLink} from "@angular/router";
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-pricing-menu',
    imports: [
        RouterLink
    ],
  templateUrl: './pricing-menu.component.html',
  styleUrl: './pricing-menu.component.scss'
})
export class PricingMenuComponent {
  protected readonly keycloak = inject(Keycloak);
  authenticated = computed<boolean | undefined>(  ()=> (this.keycloak.authenticated));

  constructor() {
  }

}
