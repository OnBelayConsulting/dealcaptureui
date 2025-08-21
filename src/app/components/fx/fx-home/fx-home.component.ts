import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {FxMenuComponent} from '../fx-menu/fx-menu.component';

@Component({
  selector: 'app-fx-home',
  imports: [
    RouterOutlet,
    FxMenuComponent
  ],
  templateUrl: './fx-home.component.html',
  styleUrl: './fx-home.component.scss'
})
export class FxHomeComponent {

}
