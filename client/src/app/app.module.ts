import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthService } from './providers/auth.service';
import { NbThemeModule, NbLayoutModule, NbInputModule, NbCardModule, NbFormFieldModule, NbIconModule, NbButtonModule, NbDatepickerModule, NbDialogModule, NbActionsModule, NbMenuModule, NbContextMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    DashboardComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NgbModule,
    NbCardModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    CommonModule,
    NbActionsModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbDatepickerModule.forRoot(),
    NbThemeModule.forRoot({ name: 'default' }),
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
