import {Component, computed, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-fx-menu',
  imports: [
    RouterLink
  ],
  templateUrl: './fx-menu.component.html',
  styleUrl: './fx-menu.component.scss'
})
export class FxMenuComponent {
  protected readonly keycloak = inject(Keycloak);
  authenticated = computed<boolean | undefined>(  ()=> (this.keycloak.authenticated));

  constructor() {
  }

}
