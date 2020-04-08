import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Events, AlertController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {

  constructor(private renderer: Renderer2, private events: Events, private alertController: AlertController) { }

  @ViewChild('firstPackContainer', {static: false})
  firstPackContainer: any;

  @ViewChild('secondPackContainer', {static: false})
  secondPackContainer: any;

  @ViewChild('thirdPackContainer', {static: false})
  thirdPackContainer: any;

  @ViewChild('footer', {static: false})
  footer: any;

  firstName: string;

  ngOnInit() {
  }

  async loadUserAccount() {
    debugger;
    try {
      let userAccount = await API.get("covid-favor", "/user-account", {});
      console.log('userAccount = ', userAccount);
      localStorage.setItem('userId', userAccount.userId);
      localStorage.setItem('region', userAccount.region);
      localStorage.setItem('state', userAccount.state);
      localStorage.setItem('firstName', userAccount.firstName);
      localStorage.setItem('lastName', userAccount.lastName);
      localStorage.setItem('neighbourhood', userAccount.neighbourhood);
      localStorage.setItem('phoneNumber', userAccount.phoneNumber);
      localStorage.setItem('city', userAccount.city);
      localStorage.setItem('cityFullName', userAccount.city + '-' + userAccount.state);
    } catch (error) {
      console.error(error);
      this.errorSignIn('Erro ao entrar na conta. Favor tentar novamente mais tarde');
      return;
    }
    this.firstName = localStorage.getItem('firstName');
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

  ionViewWillEnter() {
    debugger;
    this.loadUserAccount();
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  selectSim(selectedAction: any) {
    this.highlightAction(selectedAction)
    let nextRoute: string;
    if (selectedAction === this.firstPackContainer) {
      nextRoute = 'offer'
    } 
    if (selectedAction === this.secondPackContainer) {
      nextRoute = 'request'
    }
    if (selectedAction === this.thirdPackContainer) {
      nextRoute = 'dashboard'
    }
    console.log('nextRoute = ', nextRoute)
    localStorage.setItem('nextRoute', nextRoute);
    this.enableContinue()
  }

  highlightAction(selectedPack: any) {
    this.firstPackContainer.el.classList.remove('active')
    this.secondPackContainer.el.classList.remove('active')
    this.thirdPackContainer.el.classList.remove('active')
    selectedPack.el.classList.add('active')
  }

  enableContinue() {
    this.footer.continueButton.disabled = false
  }
}
