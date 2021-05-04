import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  tokenId: string | null = null;

  constructor(
    private router: Router,
  ) {
    const token: string | null = localStorage.getItem('TOKEN');
    if (token) this.tokenId = JSON.parse(token);
    else this.router.navigateByUrl('login');
  }
}