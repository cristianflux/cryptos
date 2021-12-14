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
askStyle!: any;
bidStyle!: any;
bid!:number;
ask!:number;

  constructor(
    private cryptoService: CryptosService
  ) {
    this.cryptos = [];
    this.askStyle ={
      color: 'black',
      backgroundColor:'white',
      fontWeight: 'normal'
    }
    this.bidStyle ={
      color: 'black',
      backgroundColor:'white',
      fontWeight: 'normal'
    }
   
   }

  ngOnInit(): void {
    this.bid=0;
    this.ask=0;
    this.ticker='btcusd';
    this.cryptoService.getAll()
    .then(cryptos => {this.cryptos.push(cryptos), 
      this.bid=this.cryptos[0].bid,
      this.ask=this.cryptos[0].ask
      } )
    .catch(error => console.log(error))
    
    this.count = 5;
    this.startInterval();
    
  }
  onChange($event: any){
    console.log('bid '+this.bid);
    this.ticker = $event.target.value;
    this.cryptos = [];
    this.cryptoService.getTicker($event.target.value)
    .then(cryptos => {this.cryptos.push(cryptos),
    this.bid=this.cryptos[0].bid,
    this.ask=this.cryptos[0].ask
    } )
    .catch(error => console.log(error))
    console.log(this.cryptos);
    this.startInterval();
  }
onClick(){
  
  this.startInterval();
  console.log(this.ticker);
  this.cryptoService.getTicker(this.ticker)
    .then(cryptos => {this.cryptos=[],this.cryptos.push(cryptos),
    this.updateStyles();
    this.bid=this.cryptos[0].bid,
    this.ask=this.cryptos[0].ask} )
    .catch(error => console.log(error))
    console.log(this.cryptos);

    this.cryptoService.getOrderBook(this.ticker)
    .then(orderBook => this.orderBook = orderBook)
    .catch(error => console.log(error))
    
}
private async updateStyles  (){
  let color: string;
    this.ask<this.cryptos[0].ask?color='green':color='red';
    this.bid<this.cryptos[0].bid?color='green':color='red';
    this.askStyle.color=color;
    this.bidStyle.color=color;
    this.bidStyle.fontWeight='bolder';
    this.askStyle.fontWeight='bolder';
    await this.delay(1000);
    color = 'black';
    this.bidStyle.color=color;
    this.askStyle.color=color;
    this.bidStyle.fontWeight='normal';
    this.askStyle.fontWeight='normal';
    
}
private delay(ms: number)
{
  return new Promise(resolve => setTimeout(resolve, ms));
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
