import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from './password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  fb: FormBuilder = inject(FormBuilder)

  isPasswordShown: boolean = true

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email:["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), passwordValidator]]
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

}
