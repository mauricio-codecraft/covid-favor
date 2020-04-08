import { isDevMode } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Events, AlertController } from '@ionic/angular';
import { Auth, API } from 'aws-amplify';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  loginForm: FormGroup;
  
  constructor(private router: Router, private events: Events, private alertController: AlertController) {
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      phoneNumber: new FormControl('', Validators.compose([
        Validators.required, Validators.minLength(11), Validators.pattern("^[0-9]*$")
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  async errorSignIn(message) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: message,
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
    if (this.loginForm.valid) {
      this.events.publish('loading:start');
      let phoneNumber: string = this.loginForm.value.phoneNumber;
      let password: string = this.loginForm.value.password;
      if (!isDevMode()) {
        try {
          await Auth.signIn('+55' + phoneNumber, password);
        } catch (error) {
          this.events.publish('loading:stop');
          console.error(error);
          if (error.code == 'NotAuthorizedException') {
            this.errorSignIn('Numero de telefone ou senha incorretos. Verifique seus dados.');
          } else {
            this.errorSignIn('Erro ao entrar na conta. Favor tentar novamente mais tarde');
          }
          return;
        }
      } else {
        localStorage.setItem('signedIn', 'true'); // For local development purposes
      }
      this.events.publish('loading:stop');
      this.router.navigate(['/actions']);
    }
  }
}
