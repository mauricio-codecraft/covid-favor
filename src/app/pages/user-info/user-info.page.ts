import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { Events, AlertController } from '@ionic/angular';
import { Auth, API } from 'aws-amplify';
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

  constructor(private router: Router, private events: Events, private alertController: AlertController) {
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
      neighbourhood: new FormControl('', Validators.compose([
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
      password: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(6)
      ]))
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

  async userAlreadyExistError() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Número de telefone já está em uso.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async errorCreatingUser() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Erro ao criar a conta. Favor tentar novamente mais tarde',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('ok');
          }
        }
      ]
    });
    await alert.present();
  }

  async onSubmit() {
    if (this.userInfoForm.valid) {
      this.events.publish('loading:start');
      let phoneNumber: string = this.userInfoForm.value.phoneNumber;
      let password: string = this.userInfoForm.value.password;
      try {
        let response = await Auth.signUp({
          username: '+55' + phoneNumber,
          password: password
        });
        console.log('response = ', response);
      } catch (err) {
        if (err.code == 'UsernameExistsException') {
          this.events.publish('loading:stop');
          this.userAlreadyExistError();
        }
      }

      try {
        let signinResp: string = await Auth.signIn('+55' + phoneNumber, password);
        console.log('signinResp = ', signinResp);
      } catch (err) {
        this.events.publish('loading:stop');
          this.userAlreadyExistError();
      }
            
      let firstName: string = this.userInfoForm.value.firstName;
      let lastName: string = this.userInfoForm.value.lastName;
      let city: string = this.userInfoForm.value.city;
      localStorage.setItem('city', city);
      let region: string = '';
      let state: string = '';
      let selectedCity = this.userInfoForm.value.city;
      cities.forEach(city => {
        if (city.name == selectedCity) {
          region = city.region;
          localStorage.setItem('region', region);
          state = city.state;
          localStorage.setItem('state', state);
        }
      });
      let neighbourhood: string = this.userInfoForm.value.neighbourhood;
      try {
        await API.post("covid-favor", "/user-account", {
          body: {
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            state: state,
            city: city,
            region: region,
            neighbourhood: neighbourhood
          }
        });
      } catch (error) {
        console.error(error);
        this.events.publish('loading:stop');
        this.errorCreatingUser();
      }
      this.events.publish('loading:stop');
      this.router.navigate(['/actions']);
    }
  }
}
