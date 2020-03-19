import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from "@angular/router";
import { Events } from '@ionic/angular';
import { OnfidoAngularService } from 'src/app/service/onfido.angular.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  passwordForm: FormGroup
  
  constructor(private router: Router, private events: Events, private onfidoService: OnfidoAngularService) {
    var sandboxMode: boolean = (/true/i).test(localStorage.getItem('sandboxMode'))
    onfidoService.setSandboxMode(sandboxMode)
  }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        this.passwordCustomValidator()
      ])),
      confirmPassword: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
    this.passwordForm.setValidators(this.validateConfirmPassword())
    this.generateOnfidoTokens()
  }

  generateOnfidoTokens() {
    console.log('before createApplicant')
    this.onfidoService.createApplicant().subscribe(result => {
      console.log('createApplicant call result = ', result)
      var applicantId: string = result.id
      console.log('applicantId = ', applicantId)
      localStorage.setItem('applicantId', applicantId)
      var referrerUrl: string = window.location.href.split('/register')[0]
      console.log('referrerUrl = ', referrerUrl)
      this.onfidoService.generateSDKToken(applicantId, referrerUrl).subscribe(result => {
        console.log('generateSDKToken call result = ', result)
        localStorage.setItem('sdkToken', result.token)
      }, error => {
        alert(error)
      })
    }, error => {
      alert(error)
    })
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop')
  }

  ionViewWillLeave() {
    //this.events.publish('loading:start')
  }

  passwordCustomValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let password = control.value
      let errors: { [k: string]: any } = {}
      let isPasswordCaseValid: boolean = this.isPasswordCaseValid(password)
      errors.upperAndLowerCase = !isPasswordCaseValid
      let isPasswordNumericValid: boolean = this.isPasswordNumericValid(password)
      errors.numeric = !isPasswordNumericValid
      let isPasswordSymbolicValid: boolean = this.isPasswordSymbolicValid(password)
      errors.symbolic = !isPasswordSymbolicValid
      return isPasswordCaseValid && isPasswordNumericValid && isPasswordSymbolicValid
        ? null
        : errors
    };
  }

  validateConfirmPassword() {
    return (group: FormGroup): ValidationErrors => {
      const password = group.controls['password'];
      const confirmPassword = group.controls['confirmPassword'];
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ notEquivalent: true });
      } else {
        confirmPassword.setErrors(null);
      }
      return;
    }
  }

  isPasswordCaseValid(password: string): boolean {
    let lowerCasePattern = new RegExp('.*[a-z]')
    let upperCasePattern = new RegExp('.*[A-Z]')
    return lowerCasePattern.test(password) && upperCasePattern.test(password)
  }

  isPasswordNumericValid(password: string): boolean {
    let numericPattern = new RegExp('.*[0-9]')
    return numericPattern.test(password)
  }

  isPasswordSymbolicValid(password: string): boolean {
    let symbolicPattern = new RegExp(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/@#]/, 'i')
    return symbolicPattern.test(password)
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      localStorage.setItem('password', JSON.stringify(this.passwordForm.value.password));
      this.router.navigate(['/sdk'])
    }
  }

}
