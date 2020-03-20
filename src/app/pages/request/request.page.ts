import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Events } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  requestForm: FormGroup;
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
    this.requestForm = new FormGroup({
      description: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  onSubmit() {
    if (this.requestForm.valid) {
      let description: string = this.requestForm.value.lastName;
      console.log('description = ',  description);
      this.router.navigate(['/dashobard']);
    }
  }
}
