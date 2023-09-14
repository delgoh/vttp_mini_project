import { SignupService } from '../../core/services/signup.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../core/utils/password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupService = inject(SignupService)
  fb = inject(FormBuilder)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  snackBar = inject(MatSnackBar)

  signupForm!: FormGroup
  isPasswordShown: boolean = true
  invalidLoginMessage: string = ""

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userType: ["VISITOR"],
      email:["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8), passwordValidator]],
      name: [""]
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
    } else if (fieldName === 'name') {
      if (this.signupForm.hasError('required', fieldName)) {
        return "Company/Exhibitor name is required."
      }
    }
    return "";
  }

  onUserTypeChanged() {
    const nameControl = this.signupForm.get('name')
    if (nameControl === null) {
      return
    }

    if (this.signupForm.get('userType')!.value === "VISITOR") {
      nameControl.setValidators(null)
    } else if (this.signupForm.get('userType')!.value === "EXHIBITOR") {
      nameControl.setValidators([Validators.required])
    }
    nameControl.reset()
  }

  onSignup() {
    const signupFormValue = this.signupForm.value
    this.signupService.signupUser({
      role: signupFormValue.userType,
      name: signupFormValue.name,
      email: signupFormValue.email,
      password: signupFormValue.password
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
      this.invalidLoginMessage = err.error.message
    })
  }

}
