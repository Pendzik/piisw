import { Component, OnInit, Input } from '@angular/core';
import { Definicja } from '../shared/definicja.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { DefinicjeService } from '../shared/definicje.service';

@Component({
  selector: 'app-definicja',
  templateUrl: './definicja.component.html',
  styleUrls: ['./definicja.component.css']
})

export class DefinicjaComponent implements OnInit {
  lajkii : number;
  strona: string = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  
  dislajkii: number;
  public suma: number;
  @Input('autor') autor: string;
  @Input('definicja') definicja: Definicja;
  constructor(private db: AngularFirestore, public definicjaServe: DefinicjeService) { }

  ngOnInit() {
    this.lajki()
  }
  
  lajki(){
    this.lajkii =this.definicja.likes.length;
    this.dislajkii=this.definicja.dislikes.length;
    this.suma=this.lajkii-this.dislajkii
    
  }  
  dajLajka() {
    
    if (this.definicja.likes.indexOf(this.autor) == -1) {
      this.definicja.likes.push(this.autor);
    }
    else {
      let index = this.definicja.likes.indexOf(this.autor);
      this.definicja.likes.splice(index, 1);
    }
    this.definicjaServe.updateDefinicja(this.definicja, this.definicja.id,this.strona);
  }
  
  dajDisLajka() {
    if (this.definicja.dislikes.indexOf(this.autor) == -1) {
      this.definicja.dislikes.push(this.autor);
    }
    else {
      let index = this.definicja.dislikes.indexOf(this.autor);
      this.definicja.dislikes.splice(index, 1);
    }
    this.definicjaServe.updateDefinicja(this.definicja, this.definicja.id,this.strona);
  }
}