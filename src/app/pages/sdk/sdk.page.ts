import { Component, OnInit } from '@angular/core';
import { OnfidoAngularService } from 'src/app/service/onfido.angular.service';
import { Router } from "@angular/router";

declare var require: any


@Component({
  selector: 'app-sdk',
  templateUrl: './sdk.page.html',
  styleUrls: ['./sdk.page.scss'],
})
export class SdkPage implements OnInit {

  constructor(private onfidoService: OnfidoAngularService, private router: Router) {
    var sandboxMode: boolean = (/true/i).test(localStorage.getItem('sandboxMode'))
    onfidoService.setSandboxMode(sandboxMode)
   }

  ngOnInit() {
    var Onfido = require('onfido-sdk-ui')
    var selfieMode: boolean = (/true/i).test(localStorage.getItem('selfieMode'))
    var variant: string = selfieMode ? "standard" : "video"
    var params = {
      // the JWT token that you generated earlier on
      token: localStorage.getItem('sdkToken'),
      // id of the element you want to mount the component on
      containerId: 'onfido-mount',
      onComplete: function (data) {
        console.log('onComplete data = ', data)
        var variantReturned: string = data.face.variant
        localStorage.setItem('variantReturned', variantReturned)
        this.router.navigate(['/user-info'])
      }.bind(this),
      steps: [
        {
          type: 'welcome',
          options: {
            title: 'Verify your identity',
            descriptions: ['To complete your SIM card purchase, we will need to verify your identity', 'It will only take a couple of minutes']
          }
        },
        'document',
        {
          type: 'face',
          options: {
            requestedVariant: variant
          }
        },
      ]
    }
    console.log('sdk init params = ', params)
    Onfido.init(params)
  }

}
