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

  otherOffers: any[] = [{ id: '1012', user: 'João', city: 'Curitiba-PR', neighbourhood: 'Vila Izabel', description: 'Desc1', phoneNumber: '41991696644', isOwner: false },
  { id: '1013', user: 'João', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false }
  ]

  myRequests: any[] = [{ id: '1010', user: 'Mauricio Lopes Bonetti', city: 'Curitiba-PR', neighbourhood: 'Vila Izabel', description: 'Ajuda1', phoneNumber: '41991696644', isOwner: true, status: 'assigned' },
  { id: '1011', user: 'Mauricio Lopes Bonetti1', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: true, status: 'unassigned' }
  ]

  otherRequests: any[] = [{ id: '1012', user: 'João', city: 'Curitiba-PR', neighbourhood: 'Vila Izabel', description: 'ajuda2', phoneNumber: '41991696644', isOwner: false, status: 'assigned'  },
  { id: '1013', user: 'João', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false, status: 'unassigned' }
  ]

  showOffers: boolean

  @ViewChild('footer', { static: false })
  footer: any;

  infiniteScroll: any;

  ngOnInit() {
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
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });
      this.otherOffers.push({ id: '1014', user: 'João3', city: 'Curitiba-PR1', neighbourhood: 'Vila Izabel1', description: 'Desc2', phoneNumber: '41991696644', isOwner: false });

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
    let itemIdElement = selectedItem.querySelector('.itemId');
    let itemId = itemIdElement.value;
    console.log('itemId = ', itemId);
    let isOwnerElement = selectedItem.querySelector('.isOwner');
    let isOwner = isOwnerElement.value;
    console.log('isOwner = ', isOwner);
    let itemTypeElement = selectedItem.querySelector('.itemType');
    let itemType = itemTypeElement.value;
    console.log('itemType = ', itemType);

    if (isOwner == 'true') {
      this.footer.showDeleteButton = true;
    } else {
      this.footer.showDeleteButton = false;
      if (itemType == 'request') {
        let itemStatusElement = selectedItem.querySelector('.itemStatus');
        let itemStatus = itemStatusElement.value;
        console.log('itemStatus = ', itemStatus);
        if (itemStatus == 'unassigned') {
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

  enableContinueButton() {
    /*
    console.log('deliveryInQatarForm = ', this.deliveryInQatarForm)
    if (this.deliveryInQatarForm.valid) {
      this.footer.continueButton.disabled = false
    }
    */
  }

  onSubmit() {
    /*
    if (this.deliveryInQatarForm.valid) {
      this.footer.continueButton.disabled = false
      localStorage.setItem('fullAddress', this.deliveryInQatarForm.value.fullAddress)
      localStorage.setItem('city', this.deliveryInQatarForm.value.city)
      localStorage.setItem('deliveryInstructions', this.deliveryInQatarForm.value.deliveryInstructions)
      this.footer.continueButton.disabled = false
    }
    */
  }
}
