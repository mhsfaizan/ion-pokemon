import { Component, OnInit } from '@angular/core';
import { MyService } from './service';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  constructor(private _myser: MyService, private modalCtrl: ModalController) { }
  url = "https://pokeapi.co/api/v2/pokemon?limit=20";
  isLoad = false;
  pokemons: any;
  isMessage: string;
  ngOnInit() {
    this.getPockemons(this.url);
  }
  getPockemons(url: string) {
    this.pokemons = undefined;
    this.isLoad = false;
    if (url) {
      this._myser.getPockemons(url).subscribe(async (res: any) => {
        for (let result of res.results) {
          result.data = await this._myser.getPockemons(result.url).toPromise();
          result.data.name = result.name.charAt(0).toUpperCase() + result.name.slice(1);
        }
        this.pokemons = res;
        this.isLoad = true;
        console.log(this.pokemons);
      }, (err) => {
        this.pokemons = undefined;
        this.isLoad = true;
        console.log(err);
        this.isMessage = "You Are Offline!";
      })
    }
  }
  



  async openModal(pokemon:any) {
    const modal: HTMLIonModalElement =
      await this.modalCtrl.create({
        component: ModalPage,
        componentProps: pokemon.data
      });
    await modal.present();
  }
}


