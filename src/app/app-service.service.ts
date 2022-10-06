
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private API_URL ='./assets/data.json';
  constructor(private httpClient:HttpClient) { }
   
 
  public getCountryData(): Observable<any>{
    return this.httpClient.get(this.API_URL);
  }
  
}

