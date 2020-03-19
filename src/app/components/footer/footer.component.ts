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

  proceedLogin() {
    if (this.continueButton.disabled === false) {
      this.router.navigate(['/login'])
    }
  }
}
