import { Component } from '@angular/core';
import { CryptosService } from './cryptos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cryptos';
  constructor(private cryptoService: CryptosService){

  }
  ngOnInit(){
    //this.cryptoService.getAll()
    //.then(cryptos => console.log(cryptos) )
    //.catch(error => console.log(error))
  }
}
