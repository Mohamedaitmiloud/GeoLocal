import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgmMapComponent } from './agm-map/agm-map.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  {path:'agm-map', component:AgmMapComponent},
  {path:'login', component:LoginComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'navigation',component:NavigationComponent},
  {path:'home',component:HomeComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
