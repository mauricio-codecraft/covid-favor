import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Events } from '@ionic/angular';
import cities from '../../../assets/data/cities.json';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  userInfoForm: FormGroup;
  states: string[] = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RO", "RS", "RR", "SC", "SE", "SP", "TO"];
  citiesFromState: any[] = [];

  constructor(private router: Router, private events: Events) {
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  ngOnInit() {
    this.userInfoForm = new FormGroup({
      firstName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      neighborhood: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phoneNumber: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(11), Validators.pattern("^[0-9]*$")
      ])),
      state: new FormControl('', Validators.compose([
        Validators.required
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
    this.userInfoForm.get('state').valueChanges.subscribe(selectedState => {
      this.userInfoForm.get('city').setValue(null);
      this.citiesFromState = [];
      cities.forEach(city => {
        if (city.state == selectedState) {
          this.citiesFromState.push(city);
        }
      });
      this.citiesFromState.sort();
    });
  }

  onSubmit() {
    if (this.userInfoForm.valid) {
      localStorage.setItem('firstName', this.userInfoForm.value.firstName);
      localStorage.setItem('lastName', this.userInfoForm.value.lastName);
      localStorage.setItem('neighborhood', this.userInfoForm.value.neighborhood);
      console.log('neighborhood = ', this.userInfoForm.value.neighborhood);
      localStorage.setItem('phoneNumber', this.userInfoForm.value.phoneNumber);
      let selectedCity = this.userInfoForm.value.city;
      cities.forEach(city => {
        if (city.name == selectedCity) {
          localStorage.setItem('city', JSON.stringify(city));
        }
      });
      this.router.navigate(['/confirmation']);
    }
  }
}
