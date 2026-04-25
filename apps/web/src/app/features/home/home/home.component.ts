import { Component } from '@angular/core';
import { SessionService } from '../../auth/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: any;
  menuItems = [
  { label: 'Tipo De Gasto', icon: 'assets/icons/user.png', routerLink: '/tipo-de-gasto/list'},
  ];

  constructor(
    private sessionService: SessionService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.user = this.sessionService.getUser();
    console.log(this.user)
    if(!this.user){
      this.router.navigate(['/']); 
    }
  }
}
