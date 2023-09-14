import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fb: FormBuilder = inject(FormBuilder)
  http: HttpClient = inject(HttpClient)
  loginService: LoginService = inject(LoginService)
  router: Router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  loginForm!: FormGroup
  isPasswordShown: boolean = true
  invalidLoginMessage: string = ""

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userType: ["VISITOR"],
      email: ["", [Validators.required, Validators.email]],
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

  onLogin() {
    const loginFormValue = this.loginForm.value

    this.loginService.loginUser({
      role: loginFormValue.userType,
      email: loginFormValue.email,
      password: loginFormValue.password

    }).then(res => {
      localStorage.setItem("access_token", res['token'])
      if (res['role'] === "EXHIBITOR") {
        this.router.navigate(['/exhibitor'])
      } else if (res['role'] === "VISITOR") {
        this.router.navigate(['/visitor'])
      }

    }).catch(err => {
      this.invalidLoginMessage = err.error.message
    })
  }

}
