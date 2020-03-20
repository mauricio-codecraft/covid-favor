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

  selfPickup: boolean
  deliveryInQatar: boolean

  deliveryInQatarForm: FormGroup;

  @ViewChild('option1Container', { static: false })
  option1Container: any;

  @ViewChild('option2Container', { static: false })
  option2Container: any;

  @ViewChild('option3Container', { static: false })
  option3Container: any;

  @ViewChild('option4Container', { static: false })
  option4Container: any;

  @ViewChild('option5Container', { static: false })
  option5Container: any;

  @ViewChild('option6Container', { static: false })
  option6Container: any;

  @ViewChild('option7Container', { static: false })
  option7Container: any;

  @ViewChild('option1xContainer', { static: false })
  option1xContainer: any;

  @ViewChild('option2xContainer', { static: false })
  option2xContainer: any;

  @ViewChild('option3xContainer', { static: false })
  option3xContainer: any;

  @ViewChild('option4xContainer', { static: false })
  option4xContainer: any;

  @ViewChild('footer', { static: false })
  footer: any;

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
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  highlightSelfPickupOption(selectedPack: any) {
    this.option1xContainer.el.classList.remove('active')
    this.option2xContainer.el.classList.remove('active')
    this.option3xContainer.el.classList.remove('active')
    this.option4xContainer.el.classList.remove('active')

    this.option2Container.el.classList.remove('active')
    this.option3Container.el.classList.remove('active')
    this.option4Container.el.classList.remove('active')
    this.option5Container.el.classList.remove('active')
    this.option6Container.el.classList.remove('active')
    this.option7Container.el.classList.remove('active')

    if (selectedPack) {
      selectedPack.el.classList.add('active')
    }
  }

  selectSelfPickupOption(selectedPack: any) {
    this.highlightSelfPickupOption(selectedPack)
    localStorage.setItem('selfPickup', selectedPack.el.id)
    console.log('selectedPack = ', selectedPack)
    console.log('selfPickup = ', selectedPack.el.id)

    this.footer.continueButton.disabled = false
  }

  selectDeliveryInQatar() {
    this.selfPickup = false
    this.highlightSelfPickupOption(null)
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
