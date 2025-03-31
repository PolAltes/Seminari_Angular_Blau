import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent{

  formularioRegister: FormGroup;
  authService = inject(AuthService);

  @Output() exportRegistered = new EventEmitter<boolean>();

  constructor(private form: FormBuilder){
    this.formularioRegister = this.form.group({
      name: ['', [Validators.required], Validators.minLength(3)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      age: ['',[Validators.required, Validators.min]] 
    });
  }
  hasError(controlName:string, errorType:string){
    return this.formularioRegister.get(controlName)?.hasError(errorType) && this.formularioRegister.get(controlName)?.touched;  
  }

  register(){
    if (this.formularioRegister.invalid) {
      this.formularioRegister.markAllAsTouched();
      return;
    }

    const registerData = this.formularioRegister.value;

    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.exportRegistered.emit(true);
        alert('Registro exitoso, ahora puedes iniciar sesión');
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Error en el registro, verifica tus datos');
      }
    })
  }

}
