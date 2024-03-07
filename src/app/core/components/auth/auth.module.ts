import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AuthRoutingModule } from './auth-routing.module';
import { SignComponent } from './pages/sign/sign.component';

@NgModule({
  declarations: [SignComponent],
  exports: [SignComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, HttpClientModule],
})
export class AuthModule {}
