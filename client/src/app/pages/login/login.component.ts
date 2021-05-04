import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import { AppComponent } from '../../app.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    const token: string | null = localStorage.getItem('TOKEN');
    if (token) this.router.navigateByUrl('/')
   }

  ngOnInit(

  ): void {
  }

  register() {
    this.router.navigateByUrl('signin');
  }

  email: string= '';
  password: string= '';

  async login(): Promise<any> {
    swal.showLoading()
    try {

      if(!this.email || !this.password)  return swal.fire('', 'Email e senha são obrigatórios!');

      const user: any = await this.authService.login(this.email, this.password)
      localStorage.setItem('TOKEN', JSON.stringify(user.token));
      this.router.navigateByUrl('/');
      swal.close()
    } catch (error) {
      swal.fire('', 'Falha ao realizar login. Tente novamente!')
    }
    swal.hideLoading()
  }

  showPassword = true;
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    console.log(this.showPassword)
  }

}
