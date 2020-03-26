import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {

  constructor(private renderer: Renderer2, private events: Events) { }

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
    this.firstName = localStorage.getItem('firstName')
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
