import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  fb: FormBuilder = inject(FormBuilder)

  isPasswordShown: boolean = true

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  isPasswordConditionMet(condition: string) {
    if (this.loginForm.get('password')?.hasError('required')) {
      return false
    }
    return !this.loginForm.get('password')!.hasError(condition)
  }

  getValidationError(fieldName: string) {
    if (fieldName === 'email') {
      if (this.loginForm.hasError('required', fieldName)) {
        return "Email is required."
      } else if (this.loginForm.hasError('email', fieldName)) {
        return "Please enter a valid email."
      }
    } else if (fieldName === 'password') {
        if (this.loginForm.hasError('required', fieldName)) {
          return "Password is required."
        } else if (this.loginForm.hasError('minlength', fieldName)) {
          return "Password must be at least 8 characters long."
        }
    }
    return "";
  }

}
