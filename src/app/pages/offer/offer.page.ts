import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Events } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {

  offerForm: FormGroup;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  city: string;
  neighborhood: string;

  constructor(private router: Router, private events: Events) {
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  ngOnInit() {
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.phoneNumber = localStorage.getItem('phoneNumber');
    let city: any = JSON.parse(localStorage.getItem('city')); 
    this.city = city.fullName;
    this.neighborhood = localStorage.getItem('neighborhood');    
    this.offerForm = new FormGroup({
      description: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  onSubmit() {
    if (this.offerForm.valid) {
      let description: string = this.offerForm.value.lastName;
      console.log('description = ',  description);
      this.router.navigate(['/dashobard']);
    }
  }
}
