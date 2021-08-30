import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import{GoogleMapsModule} from '@angular/google-maps'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmMapComponent } from './agm-map/agm-map.component';
import { AgmCoreModule} from '@agm/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './sevices/client.service';
import { LoginComponent } from './login/login.component';
//import {AngularFireModule} from '@angular/fire';
//import {LayoutModule} from '@angular/cdk/layout';
import { RegistrationComponent } from './registration/registration.component';
import * as firebase from 'firebase/app';
import { environment } from "src/environments/environment";
import { NavigationComponent } from './navigation/navigation.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

//import { AngularFireModule } from "@angular/fire";
//import { AngularFirestoreModule } from "@angular/fire/firestore";
//import { provideFirebaseApp, getApp, initializeApp} from '@angular/fire/app';
//import { getFirestore, provideFirestore } from '@angular/fire/firestore';
//import { AngularFireModule } from '@angular/fire';
//import { AngularFireDatabaseModule } from '@angular/fire/database';






@NgModule({
  declarations: [
    AppComponent,
    AgmMapComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    HomeComponent,

   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //LayoutModule,
   
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAI3vjvnWKk0ip1XkYLi0HoQzHu5t4NIYA',
      libraries: ['places','geometry','drawing'] 
    }),
    //provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
   /// provideFirestore(() => getFirestore()),
   // AngularFireModule.initializeApp(),
   
   // AngularFireModule.initializeApp(environment.firebaseConfig),
    //AngularFirestoreModule
  ],
  providers:  [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
