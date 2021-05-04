import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../providers/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.construirFormulario();
  }

  formulario!: FormGroup;
  formularioEnviado: boolean = false;

  construirFormulario() {
    this.formulario = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      homeTeam: new FormControl('', Validators.required),
      height: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
  }

  login(){
    this.router.navigateByUrl('login');
  }

  invalidField(name: string){
    return this.formularioEnviado && this.formulario.get(name)?.status == 'INVALID'
  }

  async register(): Promise<any> {
    this.formularioEnviado = true;

    swal.showLoading()
    try {

      if(this.formulario.status == 'INVALID')  return swal.fire('', 'Campos inválidos!');

      const user: any = await this.authService.register(this.formulario.value);

      localStorage.setItem('TOKEN', JSON.stringify(user.token));
      this.router.navigateByUrl('/');
      swal.close()
    } catch (error) {
      swal.fire('', 'Falha ao realizar login. Tente novamente!')
    }
    swal.hideLoading()
  }
}
