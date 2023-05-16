import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RequestService } from '../request.service';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-add-budget',
  templateUrl: './dialog-add-budget.component.html',
  styleUrls: ['./dialog-add-budget.component.css']
})
export class DialogAddBudgetComponent implements OnInit {

  disableSelect = new FormControl(false);

  country = "";
  month = "";
  city="";
  budget="";

  constructor(
    public dialogRef: MatDialogRef<DialogAddBudgetComponent>,
    private reqService: RequestService
  ) { }

  ngOnInit(): void {
  }

  submit(){

    let data = {
      country: this.country,
      city: this.city,
      month: this.month,
      budget: this.budget
    }
    console.log(data);
    this.reqService.addBudget(data).subscribe(res=>{
      console.log(res);
      this.getList();
      this.dialogRef.close();
    }, err=> { this.dialogRef.close()});

  }

  getList(){
    this.reqService.listBudget().subscribe(res=>{
      this.reqService.setListData(res);
    })
  }

  selectCountry($event: any){
    console.log($event.value);
    this.country = $event.value;
  }

  selectMonth($event: any){
    console.log($event.value);
    this.month = $event.value;
  }

  close(){
    this.dialogRef.close();
  }

}
