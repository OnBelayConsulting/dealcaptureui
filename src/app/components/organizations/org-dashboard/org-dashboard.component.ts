import { Component } from '@angular/core';
import {HasRolesDirective} from "keycloak-angular";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-org-dashboard',
    imports: [
        HasRolesDirective,
        RouterLink,
        RouterOutlet
    ],
  templateUrl: './org-dashboard.component.html',
  styleUrl: './org-dashboard.component.scss'
})
export class OrgDashboardComponent {

}
