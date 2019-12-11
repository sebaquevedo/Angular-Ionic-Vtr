import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginDto, ResponsePerfilDto } from '../../../api';
import { StorageUtilService } from '../../service/storage.service';
import { AuthenticateService } from '../../service/authenticate.service';
import { Router } from '@angular/router';
import { UiService } from '../../service/ui.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string;
  formLogin: FormGroup;
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
      this.uiService.presentAlert({
        title: 'Login Incorrecto',
        text: error.error.message,
        buttonText: 'Volver a intentar'});
    }
  }
}
