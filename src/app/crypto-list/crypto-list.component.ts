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
    this.count = 10;
  }
  onChange($event: any){
    console.log($event.target.value);
    this.ticker = $event.target.value;
    this.cryptos = [];
    this.cryptoService.getTicker($event.target.value)
    .then(cryptos => this.cryptos.push(cryptos) )
    .catch(error => console.log(error))
    console.log(this.cryptos);
    setInterval(()=>{
      if(this.count!=0){
        console.log(this.count);
        this.count = this.count - 1;
      }else{
        this.onClick();
         }
      },
    1000)
  }
onClick(){
  this.count = 10;
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

}
