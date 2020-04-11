import { Component, OnInit, ViewChild, ElementRef, Renderer2, isDevMode } from '@angular/core';
import { Events, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { API } from 'aws-amplify';

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
  cityFullName: string;
  neighbourhood: string;

  constructor(private router: Router, private events: Events, private alertController: AlertController) {
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
    this.cityFullName = localStorage.getItem('cityFullName');
    this.neighbourhood = localStorage.getItem('neighbourhood');
    this.requestForm = new FormGroup({
      description: new FormControl('', Validators.compose([
        Validators.required
      ])),
      range: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  async showMessage(message) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }

  async onSubmit() {
    if (this.requestForm.valid) {
      this.events.publish('loading:start');
      let description: string = this.requestForm.value.description;
      let range: string = this.requestForm.value.range;
      try {
        let params = {
          body: {
            isOffer: false,
            city: localStorage.getItem('city'),
            region: localStorage.getItem('region'),
            state: localStorage.getItem('state'),
            description: description,
            firstName: this.firstName,
            lastName: this.lastName,
            neighbourhood: this.neighbourhood,
            phoneNumber: this.phoneNumber,
            createdAt: Date.now(),
            range: range
          }
        };
        if (isDevMode()) {
          params['headers'] = {
            'cognito-identity-id': 'id' + localStorage.getItem('phoneNumber')
          }
        }
        await API.post("covid-favor", "/help", params);
        this.showMessage('Solicitação de ajuda criada com sucesso!');
        this.router.navigate(['/dashboard'], { queryParams: { showOffers: false } });
      } catch (error) {
        console.log(error)
        this.showMessage('Erro ao criar Solicitação de ajuda. Tente novamente mais tarde.');
      }
      this.events.publish('loading:stop');
    }
  }
}
