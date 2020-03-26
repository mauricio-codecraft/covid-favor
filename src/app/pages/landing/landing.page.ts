import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private events: Events, private router:Router) { }

  ngOnInit() {
    if (localStorage.getItem('signedIn')) {
      this.router.navigate(['/actions']);
    }
  }

  ionViewDidEnter() {
    this.events.publish('loading:stop');
  }

  ionViewWillLeave() {
    this.events.publish('loading:start');
  }
}
