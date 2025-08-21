import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {OrganizationsMenuComponent} from '../organizations-menu/organizations-menu.component';

@Component({
  selector: 'app-organizations-home',
  imports: [
    RouterOutlet,
    OrganizationsMenuComponent
  ],
  templateUrl: './organizations-home.component.html',
  styleUrl: './organizations-home.component.scss'
})
export class OrganizationsHomeComponent {

}
