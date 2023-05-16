import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogSpinnerComponent } from '../dialog-spinner/dialog-spinner.component';
import { RequestService } from '../request.service';
import { DialogAddBudgetComponent } from '../dialog-add-budget/dialog-add-budget.component';

export interface PeriodicElement {
  country: string;
  city: string;
  budget: string;
}


const ELEMENT_DATA: PeriodicElement[] = [];



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  country="";
  quarter="";
  displayedColumns: string[] = ['country', 'city', 'budget'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, private reqService: RequestService) {
    this.listBudget();
    reqService.getListDate().subscribe(res=>{
      console.log(res.results, '  home');
      this.dataSource=res.results;
    })
  }

  searchBudget(){
    this.reqService.getBudgetByCQ(this.country, this.quarter).subscribe(res=>{
      this.dataSource = res.results;
    })
  }

  selectCountry($event: any){
    console.log($event.value);
    this.country = $event.value;
  }

  selectQuarter($event: any){
    console.log($event.value);
    this.quarter = $event.value;
  }

 listBudget(){
  this.reqService.listBudget().subscribe(res=>{
    this.dataSource = res.results;
  })
 }

  addBudget(){
    this.dialog.open(DialogAddBudgetComponent, {
      disableClose: true,
      height: '300px',
      width: '600px',
    });
  }

 

  removeData() {
   
  }

}
