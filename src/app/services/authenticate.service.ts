import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  urlServer = "https://musicback.fly.dev";
  constructor(
    private storage: Storage,
    private http: HttpClient
    ) { }
  httpHeaders = { headers: new HttpHeaders({"Content-Type": "application/json"})};

  loginUser(credentials: any): Promise<string> {
    return new Promise((accept, reject) => {
      if (
        credentials.email === "eyleenpolo@pca.com" && 
        credentials.password === "1234567"
      )
      {
        accept(`Hola ${credentials.email}, bienvenido`)
      } else {
        reject("Email o contraseña incorrecta, Verifique sus credenciales")
      }
    })
  }

  registerUser(userData:any){
    userData.password = btoa(userData.password);
    return this.storage.set("user", userData);
  }
}
