import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/header/navigation/navigation.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { MaincontentComponent } from './components/maincontent/maincontent.component';
import { BreadcrumbsComponent } from './components/maincontent/breadcrumbs/breadcrumbs.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './authentication/authentication.service';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';

import { LoginauthenticationComponent } from './loginauthentication/loginauthentication.component';

// app.module.ts
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

//import { NgbdModalContent, NgbdModalLoading } from './components/maincontent/maincontent.component';

import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { DataTablesModule } from 'angular-datatables';
import { HttpServiceHelper } from './common/HttpServiceHelper';


//https://savills.onmicrosoft.com/d556084e-d976-4ec8-8831-997c4affb31c/user.read
//https://savillsuatvmsweb.azurewebsites.net
//api://259e1e45-d02d-4758-96e5-34c33b9c2712/user.read
//https://edlwebapitester.azurewebsites.net/api


export const protectedResourceMap: [string, string[]][] = [

    ['https://edlwebapitester.azurewebsites.net/api', ['api://259e1e45-d02d-4758-96e5-34c33b9c2712/user.read']],
    ['https://graph.microsoft.com/v1.0/me', ['user.read']]

];

/* UAT

export const protectedResourceMap: [string, string[]][] = [

    ['https://edlwebapitester.azurewebsites.net/api', ['https://savills.onmicrosoft.com/d556084e-d976-4ec8-8831-997c4affb31c/user.read']],
    ['https://graph.microsoft.com/v1.0/me', ['user.read']]

];

*/

// WEB SERVERS
       //     var server = 'http://localhost:4200/'; // LOCAL SERVER
        var server = 'https://edlwebapitester.azurewebsites.net/'; // IAT
        // var server = 'https://savillsuatvmsweb.azurewebsites.net/'; //UAT 
    

// var server = local;

@NgModule({
    declarations: [
        routingComponents,
        AppComponent,
        HeaderComponent,
        NavigationComponent,
        SidebarComponent,
        FooterComponent,
        LogoComponent,
        MaincontentComponent,
        BreadcrumbsComponent,
        LoginauthenticationComponent,
      //  NgbdModalContent,
      //  NgbdModalLoading
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MDBBootstrapModule.forRoot(),
        HttpClientModule,
        MsalModule.forRoot({
           //clientID: '259e1e45-d02d-4758-96e5-34c33b9c2712', // IAT
            clientID: 'd556084e-d976-4ec8-8831-997c4affb31c', // UAT
            authority: 'https://login.microsoftonline.com/organizations/',
            validateAuthority: true,
            redirectUri: server,
            //  redirectUri: 'https://edlwebapitester.azurewebsites.net/',
            cacheLocation: 'localStorage',
            postLogoutRedirectUri: server,
            //  postLogoutRedirectUri: 'https://edlwebapitester.azurewebsites.net/',
            navigateToLoginRequestUrl: true,
            popUp: false,
           //consentScopes: ['user.read', 'api://259e1e45-d02d-4758-96e5-34c33b9c2712/user.read'], // IAT
           consentScopes: ['user.read', 'https://savills.onmicrosoft.com/d556084e-d976-4ec8-8831-997c4affb31c/user.read','user_impersonation','https://savills.onmicrosoft.com/d556084e-d976-4ec8-8831-997c4affb31c/user_impersonation'],
           //consentScopes: ['user.read', 'https://savills.onmicrosoft.com/d556084e-d976-4ec8-8831-997c4affb31c/user.read'],
            unprotectedResources: ['https://www.microsoft.com/en-us/'],
            protectedResourceMap: protectedResourceMap,
            // logger: loggerCallback,
            correlationId: '1234',
            // level: LogLevel.Info,
            piiLoggingEnabled: true
        }
        ),
        DataTablesModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        NgBootstrapFormValidationModule.forRoot(),
        NgBootstrapFormValidationModule,
        NgxPageScrollCoreModule.forRoot({ duration: 2500 }),
        NgxPageScrollModule

    ],
    providers: [AuthenticationService, HttpServiceHelper, { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }],
    //entryComponents: [NgbdModalContent, NgbdModalLoading],
    bootstrap: [AppComponent]
})
export class AppModule { }
