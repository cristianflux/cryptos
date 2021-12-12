import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { CryptosService } from '../cryptos.service';

@Component({
  selector: 'app-crypto-list',
  templateUrl: './crypto-list.component.html',
  styleUrls: ['./crypto-list.component.css']
})
export class CryptoListComponent implements OnInit {

cryptos: any[];
ticker!: string;
count!: number;
orderBook: any;
interval!: any;
  constructor(
    private cryptoService: CryptosService
  ) {
    this.cryptos = [];
   }

  ngOnInit(): void {
    this.cryptoService.getAll()
    .then(cryptos => this.cryptos.push(cryptos) )
    .catch(error => console.log(error))
    console.log(this.cryptos);
    this.count = 5;
    this.startInterval();
    
  }
  onChange($event: any){
    console.log($event.target.value);
    this.ticker = $event.target.value;
    this.cryptos = [];
    this.cryptoService.getTicker($event.target.value)
    .then(cryptos => this.cryptos.push(cryptos) )
    .catch(error => console.log(error))
    console.log(this.cryptos);
    this.startInterval();
  }
onClick(){
  this.startInterval();
  console.log(this.ticker);
  this.cryptoService.getTicker(this.ticker)
    .then(cryptos => {this.cryptos=[],this.cryptos.push(cryptos)} )
    .catch(error => console.log(error))
    console.log(this.cryptos);

    this.cryptoService.getOrderBook(this.ticker)
    .then(orderBook => this.orderBook = orderBook)
    .catch(error => console.log(error))
    console.log('Order Books bids '+this.orderBook.bids);
    
}
startInterval(){
  if(this.interval!=null){
    clearInterval(this.interval);
    this.count = 5;
  }
  this.interval = setInterval(()=>{
    if(this.count!=0){
      console.log(this.count);
      this.count = this.count - 1;
    }else{
      clearInterval(this.interval);
      this.onClick();
       }
    },
  1000)
}

}
