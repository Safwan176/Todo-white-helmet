import { NgModule } from '@angular/core';

// Shared Module

import { LoginRoutingModule } from './login-routing-module';
import { LoginScreen } from './login-screen/login-screen';
import { SharedModule } from '../../shared';

@NgModule({
  declarations: [
    LoginScreen
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
