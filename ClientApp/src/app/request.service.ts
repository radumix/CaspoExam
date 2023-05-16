import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private emitList = new Subject<any>();
  url = "";
  constructor(public http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.url = baseUrl;
  }

  addBudget(model: any): Observable<boolean> {
    return this.http.post<boolean>(this.url + 'api/Budget/AddBudget', model);
  }

  listBudget(): Observable<any> {
    return this.http.get<any>(this.url + 'api/Budget/GetBudget');
  }

  getBudgetByCQ(country: string, quarter: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('country', country);
    params = params.append('quarter', quarter);
    return this.http.get<any>(this.url + 'api/Budget/GetBudgetByCQ', { params: params });
  }

  setListData(data: any){
    this.emitList.next(data);
  }

  getListDate(): Observable<any> {
    return this.emitList.asObservable();
  }

  
}
