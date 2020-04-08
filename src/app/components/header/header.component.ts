import { isDevMode } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input()
  progressRate: number;
  signedIn: boolean;

  constructor(private amplifyService: AmplifyService, private router: Router) {
    console.log('contructor');
    if (!isDevMode()) {
      this.amplifyService.authStateChange$
        .subscribe(function (authState) {
          if (authState.state === 'signedIn') {
            this.signedIn = true;
            localStorage.setItem('signedIn', 'true');
          }
          if (authState.state === 'signedOut') {
            this.signedIn = false;
            localStorage.removeItem('signedIn');
          }
        }.bind(this));
    }
  }

  ngOnInit() {
    if (localStorage.getItem('signedIn')) {
      this.signedIn = true;
    } else {
      this.signedIn = false;
    }
  }

  async logout() {
    if (isDevMode()) {
      localStorage.removeItem('signedIn');
    } else {
      await Auth.signOut();
    }
    this.router.navigate(['/landing']);
  }
}
