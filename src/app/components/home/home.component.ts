import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from '../menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, MenuComponent]
})
export class HomeComponent {
}
