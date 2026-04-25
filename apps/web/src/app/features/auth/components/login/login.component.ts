import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      idUser: [null, Validators.required],
      user: [null, Validators.required],
      code: [null, Validators.required],
      pass: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return; 
    } else {
      this.saveForm();
    }
  }

  saveForm(): void {

    const raw = this.form.getRawValue();
    const idUser = Number(raw.idUser);
    const user = raw.user;
    const code = Number(raw.code);
    const pass = raw.pass;

    if (idUser === 26111998 && user === 'dperezr52' && code === 339911 && pass === 'dperezr3399#') {  
      console.log('sesion iniciada');
      this.sessionService.setUser(raw); // Guardar usuario globalmente
      this.router.navigate(['/home']);
    } else {
      window.location.href = 'https://canela.tv/movies';
    }
  }
}
