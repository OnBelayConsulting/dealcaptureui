import {Component, computed, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-menu',
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  protected readonly keycloak = inject(Keycloak);
  authenticated = computed<boolean | undefined>(  ()=> (this.keycloak.authenticated));

  constructor() {
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }
}
