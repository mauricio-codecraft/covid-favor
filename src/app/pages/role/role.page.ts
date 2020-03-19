import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-role',
  templateUrl: './role.page.html',
  styleUrls: ['./role.page.scss'],
})
export class RolePage implements OnInit {

  constructor(private renderer: Renderer2, private events: Events) { }

  @ViewChild('firstPackContainer', {static: false})
  firstPackContainer: any;

  @ViewChild('secondPackContainer', {static: false})
  secondPackContainer: any;

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

  selectSim(selectedPack: any) {
    this.highlightSim(selectedPack)
    if (selectedPack === this.firstPackContainer) {
      console.log('ajudar')
    } 
    if (selectedPack === this.secondPackContainer) {
      console.log('ser ajudado')
    }
    // console.log('this.selectedSim = ', this.selectedSim)
    // localStorage.setItem('selectedSim', JSON.stringify(this.selectedSim));
    this.enableContinue()
  }

  highlightSim(selectedPack: any) {
    this.firstPackContainer.el.classList.remove('active')
    this.secondPackContainer.el.classList.remove('active')
    selectedPack.el.classList.add('active')
  }

  enableContinue() {
    // console.log('localStorage = ', localStorage.getItem('selectedSim'))
    this.footer.continueButton.disabled = false
  }
}
