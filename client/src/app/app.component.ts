import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(
    private router: Router,
  ) {
    const token: string | null = localStorage.getItem('TOKEN');
    if (!token) this.router.navigateByUrl('login');
  }
}