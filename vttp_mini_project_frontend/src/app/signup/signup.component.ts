import { SignupService } from './signup.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupService = inject(SignupService)
  fb = inject(FormBuilder)
  router = inject(Router)
  snackBar = inject(MatSnackBar)

  signupForm!: FormGroup
  isPasswordShown: boolean = true

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email:["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), passwordValidator]],
      userType: ["VISITOR"]
    })
  }

  togglePasswordShown() {
    this.isPasswordShown = !this.isPasswordShown;
  }

  isPasswordConditionMet(condition: string) {
    if (this.signupForm.get('password')?.hasError('required')) {
      return false
    }
    return !this.signupForm.get('password')!.hasError(condition)
  }

  getValidationError(fieldName: string) {
    if (fieldName === 'email') {
      if (this.signupForm.hasError('required', fieldName)) {
        return "Email is required."
      } else if (this.signupForm.hasError('email', fieldName)) {
        return "Please enter a valid email."
      }
    }
    return "";
  }

  onSignup() {
    const signupFormValue = this.signupForm.value
    this.signupService.signupUser({
      username: signupFormValue.email,
      email: signupFormValue.email,
      password: signupFormValue.password,
      role: signupFormValue.userType
    }).then(res => {
      if (res['isAdded']) {
        this.snackBar.open("Successfully registered! You may now log in.", "Dismiss", {
          duration: 20000
        })
        this.router.navigate(['/'])
      } else {
        this.snackBar.open("Something went wrong. Please try again in a few seconds.", "Dismiss", {
          duration: 20000
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

}
