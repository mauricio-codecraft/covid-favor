import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(private events: Events) {
  }

  myOffers: any[] = [{ id: '1010', user: 'Mauricio Lopes Bonetti', city: 'Curitiba-PR', neighbourhood: 'Vila Izabel', description: 'Desc1', phoneNumber: '41991696644', isOwner: true },
  { id: '1011', user: 'Mauricio Lopes Bonetti1', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true }
  ]

  otherOffers: any[] = [{ id: '1012', user: 'João', city: 'Curitiba-PR', neighbourhood: 'Vila Izabel', description: 'Desc1', phoneNumber: '41991696644', isOwner: true },
  { id: '1013', user: 'João', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true }
  ]

  selfPickup: boolean
  deliveryInQatar: boolean

  deliveryInQatarForm: FormGroup;

  @ViewChild('footer', { static: false })
  footer: any;

  infiniteScroll: any;

  ngOnInit() {
    this.selfPickup = true
    this.deliveryInQatarForm = new FormGroup({
      fullAddress: new FormControl('', Validators.compose([
        Validators.required
      ])),
      city: new FormControl('', Validators.compose([
        Validators.required
      ])),
      deliveryInstructions: new FormControl('')
    });
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
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true });

      await this.wait(500);
      if (this.otherOffers.length > 50) {
        this.infiniteScroll.disabled = true;
      }
      this.infiniteScroll.complete();
      console.log('complete')
    }.bind(this));
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
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  selectItem(event) {
    // Disable all and activate one    
    let selectedOffer = event.currentTarget;
    console.log('selectedOffer = ', selectedOffer);
    let allOffers = document.querySelectorAll('.delivery-cart');
    allOffers.forEach(offer => {
      offer.classList.remove('active');
    });
    selectedOffer.classList.add('active');

    // Select the specific offer
    let offerIdElement = selectedOffer.querySelector('.offerId');
    let offerId = offerIdElement.value;
    console.log('offerId = ', offerId);
    let isOwnerElement = selectedOffer.querySelector('.isOwner');
    let isOwner = isOwnerElement.value;
    console.log('isOwner = ', isOwner);
  }

  selectDeliveryInQatar() {
    this.selfPickup = false
    this.footer.continueButton.disabled = true
  }

  enableContinueButton() {
    console.log('deliveryInQatarForm = ', this.deliveryInQatarForm)
    if (this.deliveryInQatarForm.valid) {
      this.footer.continueButton.disabled = false
    }
  }

  onSubmit() {
    if (this.deliveryInQatarForm.valid) {
      this.footer.continueButton.disabled = false
      localStorage.setItem('fullAddress', this.deliveryInQatarForm.value.fullAddress)
      localStorage.setItem('city', this.deliveryInQatarForm.value.city)
      localStorage.setItem('deliveryInstructions', this.deliveryInQatarForm.value.deliveryInstructions)
      this.footer.continueButton.disabled = false
    }
  }
}
