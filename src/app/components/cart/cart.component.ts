import { Component, OnInit, ViewChild } from '@angular/core';
import { SimCard } from 'src/app/domain/sim.card';
import { Router } from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  selectedSim: SimCard

  @ViewChild('continueButton', { static: false })
  continueButton: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.selectedSim = new SimCard()
    var temp = JSON.parse(localStorage.getItem('selectedSim'))
    this.selectedSim.code = temp.code
    this.selectedSim.cost = temp.cost
  }

  proceedToNextStep() {
    if (this.continueButton.disabled === false) {
      this.router.navigate(['/payment'])
    }
  }
}
