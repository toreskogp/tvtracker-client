import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {ValidationService} from '../form/form-validation.service';
import {Router} from '@angular/router';
import {SharedValidators} from '../shared/sharedValidators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.maxLength(255),
        SharedValidators.email
      ]],
      'password': ['', Validators.required]
    })
  }

  login() {
    if(!this.loginForm.valid) return;

    this.userService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
      .subscribe(success => {
        if(success) {
          this.router.navigateByUrl('/')
        }
      })
  }

  showError(control: FormControl) {
    return this.validationService.showError(control)
  }
  
  

}
