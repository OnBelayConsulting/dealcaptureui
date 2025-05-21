import { Component } from '@angular/core';
import {HasRolesDirective} from 'keycloak-angular';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    HasRolesDirective,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './deal-dashboard.component.html',
  styleUrl: './deal-dashboard.component.scss'
})
export class DealDashboardComponent {

}
