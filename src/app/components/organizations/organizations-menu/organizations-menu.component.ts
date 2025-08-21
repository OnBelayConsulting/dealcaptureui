import {Component, computed, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-organizations-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './organizations-menu.component.html',
  styleUrl: './organizations-menu.component.scss'
})
export class OrganizationsMenuComponent {
  protected readonly keycloak = inject(Keycloak);
  authenticated = computed<boolean | undefined>(  ()=> (this.keycloak.authenticated));

  constructor() {
  }

}
