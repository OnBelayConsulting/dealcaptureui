import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {JobsMenuComponent} from '../jobs-menu/jobs-menu.component';

@Component({
  selector: 'app-jobs-home',
  imports: [
    RouterOutlet,
    JobsMenuComponent
  ],
  templateUrl: './jobs-home.component.html',
  styleUrl: './jobs-home.component.scss'
})
export class JobsHomeComponent {

}
