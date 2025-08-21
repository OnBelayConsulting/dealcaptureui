import {Component, computed, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-deal-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './deal-menu.component.html',
  styleUrl: './deal-menu.component.scss'
})
export class DealMenuComponent {
  protected readonly keycloak = inject(Keycloak);
  authenticated = computed<boolean | undefined>(  ()=> (this.keycloak.authenticated));

  constructor() {
  }

}
