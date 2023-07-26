import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slides = [
    {
      title: "Bienvenidos a Powermusic",
      img: "assets/images/MUSICA1.jpg",
      icon: "beer-outline",
      description: "¡Gracias por unirte a nosotros y esperamos que disfrutes cada momento musical en nuestra plataforma" 
    },
    {
      title: "Musica POP",
      img: "assets/images/MUSICA2.jpg",
      icon: "barbell-outline",
      description: "Musica POP" 
    },
    {
      title: "Musica 3",
      img: "assets/images/MUSICA3.jpg",
      icon: "beer-outline",
      description: "Musica banda" 
    },
    {
      title: "Musica 4",
      img: "assets/images/MUSICA5.jpg",
      icon: "beer-outline",
      description: "Musica Electronica" 
    },
    {
      title: "Musica 5",
      img: "assets/images/MUSICA4.jpg",
      icon: "beer-outline",
      description: "Musica Vallenato" 
    }
  ]

  constructor(private router: Router, private storage: Storage) { }

  ngOnInit() {
  }

  close() {
    console.log("estoy tratando de cerrar");
    this.storage.set("introShow", true);
    this.router.navigateByUrl("/menu/home");
  }

}
