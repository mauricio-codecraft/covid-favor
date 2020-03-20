import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {
  confirmationForm: FormGroup;
  
  constructor(private router: Router, private events: Events) {
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  ngOnInit() {
    this.confirmationForm = new FormGroup({
      confirmationCode: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(3), Validators.maxLength(3) 
      ]))
    });
  }

  onSubmit() {
    if (this.confirmationForm.valid) {
      localStorage.setItem('confirmationCode', this.confirmationForm.value.confirmationCode);
      console.log('this.confirmationForm.value.confirmationCode = ', this.confirmationForm.value.confirmationCode);
      this.router.navigate(['/actions'])
    }
  }
}
