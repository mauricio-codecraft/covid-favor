import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  @ViewChild('continueButton', { static: false })
  continueButton: any;

  ngOnInit() { }

  onContinue() {
    let nextRoute: string = localStorage.getItem('nextRoute');
    console.log('next route = ' + nextRoute);
    if (this.continueButton.disabled === false) {
      if (nextRoute == 'dashboard') {
        this.router.navigate(['/dashboard'], { queryParams: { showOffers: true } });
      } else {
        this.router.navigate(['/' + nextRoute]);
      }
    }
  }
}
