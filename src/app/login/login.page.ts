import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authenticate.service';
import { NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
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
    ]
  }
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage,
    private toastController: ToastController
    ) {
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl(
          "",
          Validators.compose(
            [
              Validators.required,
              Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]+.[a-zA-Z0-9.-]+$"),
              Validators.minLength(6),
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
        )
      }
    )
   }

  ngOnInit() {
  }


  loginUser(credentials: any){
    this.authService.loginUser(credentials).then((res: any) => {
      this.errorMessage = "";
      this.storage.set("isUserLoggedIn", true);
      this.storage.set("user_id", res.id)
      this.navCtrl.navigateForward("/menu/home");
      this.presentToast("Login exitoso!.");
    }).catch(err => {
      this.errorMessage = err;
      console.log(this.errorMessage);
      this.presentToast("Crendeciales incorrectos, intenta nuevamente.");
    })
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }

  goToRegister() {
    this.navCtrl.navigateForward("/register")
  }

}
