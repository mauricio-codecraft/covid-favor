import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard-footer',
  templateUrl: './dashboard-footer.component.html'
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

  @Output() actionSelected = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit() {
    /*
    this.selectedSim = new SimCard()
    var temp = JSON.parse(localStorage.getItem('selectedSim'))
    this.selectedSim.code = temp.code
    this.selectedSim.cost = temp.cost
    */
  }

  actionSelect(action: string) {
    console.log('actionSelect')
    this.actionSelected.emit(action);
  }
}
