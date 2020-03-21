import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './dashboard-footer.component.html',
  styleUrls: ['./dashboard-footer.component.scss'],
})
export class DashboardFooterComponent implements OnInit {

  // selectedSim: SimCard
  showDeleteButton: boolean;
  showAcceptButton: boolean;
  showNewActionButton: boolean;

  @ViewChild('acceptButton', { static: false })
  acceptButton: any;

  @ViewChild('newActionButton', { static: false })
  newActionButton: any;

  @ViewChild('deleteButton', { static: false })
  deleteButton: any;

  constructor(private router: Router) { }

  ngOnInit() {
    /*
    this.selectedSim = new SimCard()
    var temp = JSON.parse(localStorage.getItem('selectedSim'))
    this.selectedSim.code = temp.code
    this.selectedSim.cost = temp.cost
    */
  }

  proceedToNextStep() {
  }
}
