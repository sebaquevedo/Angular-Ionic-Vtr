import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginDto, ResponsePerfilDto } from '../../../api';
import { StorageUtilService } from '../../service/storage.service';
import { AuthenticateService } from '../../service/authenticate.service';
import { Router } from '@angular/router';
import { UiService } from '../../service/ui.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  formLogin: FormGroup;
  errorText: string;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public storageUtilService: StorageUtilService,
    public authenticateService: AuthenticateService,
    public uiService: UiService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      username: [
        '',
        Validators.compose([Validators.required]),
      ],
      password: [
        '',
        Validators.compose([Validators.required]),
      ],
      remember: [
        '',
      ],
    });

  }

  async login() {
    try {
      const request: LoginDto = {
        username: this.formLogin.value.username,
        password: this.formLogin.value.password,
      };
      const response = await this.authService.authLoginPost(request).toPromise();
      this.authenticateService.login(response.token, this.formLogin.value);
      const responseProfile: ResponsePerfilDto  = await this.authService.authProfileGet().toPromise();
      this.authenticateService.setProfile(responseProfile);
      await this.router.navigate(['/pages/home']);
    } catch (error) {

      if (error instanceof HttpErrorResponse) {

        if (error.status === 401 ) {
          this.errorText = error.error.message;
          this.uiService.presentAlert({
            title: 'login Incorrecto',
            text: error.error.message,
            buttonText: 'Volver a intentar',
            isError: true });
        }

        if (error.status === 500) {
          this.uiService.presentAlert({
            title: 'Intermitencia en los servicios',
            text: 'No se ha podido realizar el login correctamente' + '.' +
             ' Por favor, inténtalo en unos minutos más' + '.',
            buttonText: 'Volver a intentar',
            isError: true });
        }


      }
    }
  }
}
