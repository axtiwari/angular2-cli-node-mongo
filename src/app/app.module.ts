import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthenticationModule } from './authentication/authentication.module';
import { CommonPagesModule } from './common-pages/common-pages.module';
import { AuthGuard } from './authentication/auth-guard.service';
import { AuthService } from './authentication/auth.service';
import { ApiHttpService } from './services/api-http.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AuthenticationModule,
        CommonPagesModule,
        //O módulo AppRoutingModule precisa ser o último devido à rota '**' definida nele.
        AppRoutingModule,
        SimpleNotificationsModule.forRoot()
    ],
    providers: [
        ApiHttpService,
        AuthService,
        AuthGuard,
        { provide: LOCALE_ID, useValue:'pt-BR' }],
    bootstrap: [AppComponent]
})
export class AppModule { }
