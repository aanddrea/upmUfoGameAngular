import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PrefComponent } from './pref/pref.component';
import { RecordsComponent } from './records/records.component';
import { RegisterComponent } from './register/register.component';
import { PlayComponent } from './play/play.component';

const routes: Routes = [
  {path: 'home-page', component: HomePageComponent},
  {path: 'pref', component: PrefComponent},
  {path: 'play', component: PlayComponent},
  {path: 'records', component: RecordsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path:'', redirectTo:'/home-page', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
