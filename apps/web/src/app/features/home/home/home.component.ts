import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  menuItems = [
    { label: 'Tipo De Gasto', icon: 'assets/icons/user.png', routerLink: '/tipo-de-gasto/list'},
  ];
}
