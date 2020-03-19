import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Events } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  emailForm: FormGroup;

  constructor(private router: Router, private events: Events) { }

  /*
  @ViewChild('backdrop', {static: false})
  backdrop: any;
  */

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ]))
    });
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  onSubmit() {
    console.log('emailForm = ', this.emailForm.value)
    localStorage.setItem('email', JSON.stringify(this.emailForm.value));
    this.router.navigate(['/register'])
  }



}
