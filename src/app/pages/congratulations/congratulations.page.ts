import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';
import { SimCard } from 'src/app/domain/sim.card';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.page.html',
  styleUrls: ['./congratulations.page.scss'],
})
export class CongratulationsPage implements OnInit {

  constructor(private events: Events, private router:Router) { }

  orderNumber: number
  selectedSim: SimCard

  ngOnInit() {
    this.loadSimCardDetails()
    this.orderNumber = Math.floor(Math.random() * 10000000)
  }

  loadSimCardDetails() {
    this.selectedSim = new SimCard()
    var temp = JSON.parse(localStorage.getItem('selectedSim'))
    this.selectedSim.code = temp.code
    this.selectedSim.cost = temp.cost
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }

  onSubmit() {
    this.router.navigate(['/'])
  }

}
