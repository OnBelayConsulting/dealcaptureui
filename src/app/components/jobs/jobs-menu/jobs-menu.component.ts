import {Component, computed, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-jobs-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './jobs-menu.component.html',
  styleUrl: './jobs-menu.component.scss'
})
export class JobsMenuComponent {
  protected readonly keycloak = inject(Keycloak);
  authenticated = computed<boolean | undefined>(  ()=> (this.keycloak.authenticated));

  constructor() {
  }

}
