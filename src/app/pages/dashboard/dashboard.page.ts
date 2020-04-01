import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Events, AlertController } from '@ionic/angular';
import { API } from 'aws-amplify';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private events: Events, private alertController: AlertController) {
  }
  
  myOffers: any[] = [];  
  otherOffers: any[] = [];  
  myRequests: any[] = [];  
  otherRequests: any[] = [];

  showOffers: boolean;
  selectedHelpId: string;
  selectedHelpRegion: string;
  selectedHelpUserId: string;
  selectedHelpCreatedAt: string;

  @ViewChild('footer', { static: false })
  footer: any;

  infiniteScroll: any;

  async ngOnInit() {
    this.showOffers = true
    let grid = document.getElementById('grid');
    grid.addEventListener("scroll", () => {
      console.log('scroll event')
    });
    this.infiniteScroll = document.getElementById('infinite-scroll');
    this.infiniteScroll.addEventListener('ionInfinite', async function () {
      console.log('ionInfinite event!!!')
      /*
      if (length < users.length) {
        console.log('Loading data...');
        await wait(500);
        infiniteScroll.complete();
        appendItems(10);
        console.log('Done');
      } else {
        console.log('No More Data');
        infiniteScroll.disabled = true;
      }
      */
      /*
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      */

      await this.wait(500);
      if (this.otherOffers.length > 50) {
        this.infiniteScroll.disabled = true;
      }
      this.infiniteScroll.complete();
      console.log('complete')
    }.bind(this));

    this.getMyOffersAndRequests();
    this.getOthersOffersAndRequests();
  }

  getOthersOffersAndRequests() {
    // Retrieve other customer offers
    API.get("covid-favor", "/help", {
      queryStringParameters: {
        onlyMyItems: false,
        region: localStorage.getItem('region'),
        state: localStorage.getItem('state'),
        isOffer: true
      }
    }).then(helpItems => {
      console.log('helpItems = ', helpItems);
      if (Array.isArray(helpItems) && helpItems.length) {
        helpItems.forEach(item => {
          this.otherOffers.push(item);
        });
      }
    }).catch(error => {
      console.log(error.response)
      this.showErrorMessage();
    });

    // Retrieve other customer requests
    API.get("covid-favor", "/help", {
      queryStringParameters: {
        onlyMyItems: false,
        region: localStorage.getItem('region'),
        state: localStorage.getItem('state'),
        isOffer: false
      }
    }).then(helpItems => {
      console.log('helpItems = ', helpItems);
      if (Array.isArray(helpItems) && helpItems.length) {
        helpItems.forEach(item => {
          this.otherRequests.push(item);
        });
      }
    }).catch(error => {
      console.log(error.response)
      this.showErrorMessage();
    });
  }

  getMyOffersAndRequests() {
    // Retrieve customer offers and requests
    API.get("covid-favor", "/help", {
      queryStringParameters: {
        onlyMyItems: true,
        region: localStorage.getItem('region')
      }
    }).then(helpItems => {
      console.log('helpItems = ', helpItems);
      if (Array.isArray(helpItems) && helpItems.length) {
        helpItems.forEach(item => {
          if (item.isOffer == true) {
            this.myOffers.push(item);
          } else {
            this.myRequests.push(item);
          }
        })
      }
    }).catch(error => {
      console.log(error.response)
      this.showErrorMessage();
    });
  }

  // TODO: remove!
  wait(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  ionViewDidEnter() {
    this.hideButtons();
    this.footer.showNewActionButton = true;
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  selectItem(event) {
    this.hideButtons()
    // Disable all and activate one
    let selectedItem = event.currentTarget;
    console.log('selectedItem = ', selectedItem);
    let allItems = document.querySelectorAll('.delivery-cart');
    allItems.forEach(item => {
      item.classList.remove('active');
    });
    selectedItem.classList.add('active');

    // Select the specific item
    this.selectedHelpId = selectedItem.querySelector('.helpId').value;
    console.log('selectedHelpId = ', this.selectedHelpId);
    this.selectedHelpUserId = selectedItem.querySelector('.userId').value;
    console.log('selectedHelpUserId = ', this.selectedHelpUserId);
    this.selectedHelpCreatedAt = selectedItem.querySelector('.createdAt').value;
    let helpType = selectedItem.querySelector('.helpType').value;
    console.log('helpType = ', helpType);

    console.log('userId = ', localStorage.getItem('userId'));
    
    // Display actions
    if (this.selectedHelpUserId == localStorage.getItem('userId')) {
      this.footer.showDeleteButton = true;
    } else {
      this.footer.showDeleteButton = false;
      if (helpType == 'request') {
        let helpStatus = selectedItem.querySelector('.helpStatus').value;
        this.selectedHelpRegion = selectedItem.querySelector('.region').value;
        console.log('helpStatus = ', helpStatus);
        if (helpStatus == 'unassigned') {
          this.footer.showAcceptButton = true;
        }
      }
    }
  }

  hideButtons() {
    this.footer.showDeleteButton = false;
    this.footer.showAcceptButton = false;
  }

  switchType() {
    console.log('switchType')
    this.hideButtons()
    this.showOffers = !this.showOffers;
  }

  onActionSelect(action: string) {
    if (action === 'delete') {
      this.showDeleteConfirmation();
    } else if (action === 'accept') {
      this.showAcceptConfirmation();
    }
    console.log('onActionSelect = ', action);
  }

  async showAcceptConfirmation() {
    const alert = await this.alertController.create({
      header: 'Aceitar',
      message: 'Confirma a <strong>aceitação</strong> do item? Você deve entrar em contato com o solicitante. O seu número também vai ficar visível para o solicitante.',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Não aceita');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.acceptHelpItem();
          }
        }
      ]
    });
    await alert.present();
  }

  async showDeleteConfirmation() {
    const alert = await this.alertController.create({
      header: 'Excluir',
      message: 'Confirma a <strong>exclusão</strong> do item?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Não exclui');
          }
        }, {
          text: 'Sim',
          handler: () => {
            this.deleteHelpItem();
          }
        }
      ]
    });
    await alert.present();
  }

  async showErrorMessage() {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: 'Erro ao realizar a ação. Tente novamente mais tarde.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            
          }
        }
      ]
    });
    await alert.present();
  }

  acceptHelpItem() {
    console.log('acceptHelpItem');
    // accept customer request
    API.post('covid-favor', '/help/accept', {
      body: {
        region: this.selectedHelpRegion,
        selectedHelpUserId: this.selectedHelpUserId,
        createdAt: this.selectedHelpCreatedAt,
        asigneeFullName: localStorage.getItem('firstName') + localStorage.getItem('lastName'),
        asigneePhoneNumber: localStorage.getItem('phoneNumber')
      }
    }).then(result => {
      // change request
      let request = this.otherRequests.filter(h => (h.helpId == this.selectedHelpId))[0];
      console.log('request before = ', request);
      request.asigneeFullName = localStorage.getItem('firstName') + localStorage.getItem('lastName');
      request.asigneePhoneNumber = localStorage.getItem('phoneNumber');
      request.status = 'assigned';
      console.log('request after = ', request);
      // Remove selected request from list
      this.otherRequests = this.otherRequests.filter(h => (h.helpId != this.selectedHelpId));
      // Add selected request from list in the first position
      this.otherRequests.splice(0, 0, request);
      this.hideButtons();
    }).catch(error => {
      console.error(error);
      this.showErrorMessage();
    });
  }

  deleteHelpItem() {
    console.log('deleteHelpItem');
    // delete customer offers and requests
    API.del('covid-favor', '/help/', {
      queryStringParameters: {
        region: localStorage.getItem('region'),
        selectedHelpUserId: this.selectedHelpUserId,
        createdAt: this.selectedHelpCreatedAt
      }
    }).then(result => {
      // Remove deleted item from list
      this.myRequests = this.myRequests.filter(h => (h.helpId != this.selectedHelpId));
      this.myOffers = this.myOffers.filter(h => (h.helpId != this.selectedHelpId));
      this.hideButtons();
    }).catch(error => {
      console.error(error);
      this.showErrorMessage();
    });
  }
}
