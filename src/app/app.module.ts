import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from "./home-page/home-page.component";
import { RecordsComponent } from './records/records.component';
import { PrefComponent } from "./pref/pref.component";
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from './login/login.component';
import { UserService } from './shared/user.service';
import { TokenmgrService } from './shared/tokenmgr.service';
import { ScoresService } from './shared/scores.service';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        provideClientHydration(),
        UserService,
        ScoresService,
        TokenmgrService,
    ],
    bootstrap: [AppComponent],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        HomePageComponent,
        LoginComponent,
        PrefComponent,
        RecordsComponent,
        RegisterComponent,
    ]
})
export class AppModule { }
