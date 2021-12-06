import { Injectable } from '@angular/core';
import { Cryptos } from 'src/model/crypto.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptosService {

  baseUrl: string;

  constructor(private httpClient: HttpClient) {
    //this.baseUrl ='https://jsonplaceholder.typicode.com/posts';
    this.baseUrl ='https://www.bitstamp.net/api/v2/'; 
   }

  getAll(): Promise<any[]>{
    return this.httpClient.get<any[]>(this.baseUrl+'ticker/btcusd/').toPromise();
  }
  getTicker(ticker: string){
    return this.httpClient.get<any[]>(this.baseUrl+'ticker/'+ticker).toPromise();
  }
  getOrderBook(ticker: string){
    return this.httpClient.get<any[]>(this.baseUrl+'order_book/'+ticker).toPromise();
  }
   
}
