import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  
validation_messages = {
  email: [
    { type: "required", message: "El email es obligatorio" },
    { type: "pattern", message: "Debe poner un email valido" },
    { type: "minlength", message: "El minimo de carecteres es de 6" },
    { type: "maxlength", message: "El minimo de carecteres es de 40" }
  ],
  password: [
    { type: "required", message: "La contraseña es obligatorio" },
    { type: "minlength", message: "El minimo de carecteres es de 6" },
    { type: "maxlength", message: "El minimo de carecteres es de 40" }
  ],
  name: [
    { type: "required", message: "El nombre es obligatorio" },
    { type: "minlength", message: "El minimo de carecteres es de 6" },
    { type: "maxlength", message: "El minimo de carecteres es de 40" }
  ],
  last_name: [
    { type: "required", message: "el apellido es obligatorio" },
    { type: "minlength", message: "El minimo de carecteres es de 6" },
    { type: "maxlength", message: "El minimo de carecteres es de 40" }
  ]
}

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private toastController: ToastController

  ) {
    this.registerForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9.-]+$"),
              Validators.maxLength(40)
          ]
          )
        ),
        password: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(40)
            ]
          )
        ),
        name: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(40)
            ]
          )
        ),
        last_name: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(40)
            ]
          )
        )
      }
    )
   }

  ngOnInit() {
  }

  goToLogin(){
    this.navCtrl.navigateBack('/login')
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

  registerUser(userData:any){
    this.authService.registerUser(userData).then(() => {
      this.navCtrl.navigateBack("/login");
      this.presentToast('Registro exitoso')

    })
  }
}
