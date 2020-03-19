import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { SimCard } from 'src/app/domain/sim.card';
import { OnfidoAngularService } from 'src/app/service/onfido.angular.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(private router: Router, private events: Events, private onfidoAngularService: OnfidoAngularService) {
    var sandboxMode: boolean = (/true/i).test(localStorage.getItem('sandboxMode'))
    onfidoAngularService.setSandboxMode(sandboxMode)
  }

  debitCardForm: FormGroup;

  approved: boolean
  checkCompleted: boolean
  selectedSim: SimCard

  ngOnInit() {
    this.loadDebitCardForm()
    this.loadSimCardDetails()
    this.getOnfidoCheck()
  }

  loadDebitCardForm() {
    this.debitCardForm = new FormGroup({
      nameOnCard: new FormControl('', Validators.compose([
        Validators.required
      ])),
      cardNumber: new FormControl('', Validators.compose([
        Validators.required
      ])),
      expiryDate: new FormControl('', Validators.compose([
        Validators.required
      ])),
      securityCode: new FormControl('', Validators.compose([
        Validators.required
      ])),
      zipCode: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  loadSimCardDetails() {
    console.log('loadSimCardDetails')
    this.selectedSim = new SimCard()
    var temp = JSON.parse(localStorage.getItem('selectedSim'))
    console.log('SIM CARD = ', temp)
    this.selectedSim.code = temp.code
    this.selectedSim.cost = temp.cost
  }

  getOnfidoCheck() {    
    console.log('getOnfidoCheck')
    var applicantId: string = localStorage.getItem('applicantId')
    var timer = setInterval(polling.bind(this), 30000);
    function polling() {
      var checkId: string = localStorage.getItem('checkId')
      this.onfidoAngularService.getCheckResult(checkId, applicantId).subscribe(result => {
        console.log('getOnfidoCheck - return = ', result)
        if (!result.includes('progress')) {
          this.checkCompleted = true
          // break polling
          clearInterval(timer);
          localStorage.setItem('checkResult', result)
          this.approved = !(result.includes('consider'))
        }
      }, error => {
        console.log('result not completed or in error. Return = ', error)
      })
    }
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  onSubmit() {
    if (this.debitCardForm.valid) {
      // add to localStorage and navigete to congratz page!!!
      this.router.navigate(['/congratulations'])
    }
  }

}
