import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydashboardComponent } from './components/maincontent/mydashboard/mydashboard.component';
import { MydashboardDetailsComponent } from './components/maincontent/mydashboard/mydashboard-details/mydashboard-details.component';

import { NewIndicationComponent } from './components/maincontent/new/new-indication/new-indication.component';
import { NewValuationComponent } from './components/maincontent/new/new-valuation/new-valuation.component';
import { NewPortfolioComponent } from './components/maincontent/new/new-portfolio/new-portfolio.component';
import { NewOthersComponent } from './components/maincontent/new/new-others/new-others.component';

import { AvmComponent } from './components/maincontent/avm/avm.component';
import { HdbComponent } from './components/maincontent/hdb/hdb.component';
import { InvoicesComponent } from './components/maincontent/invoices/invoices.component';
import { JobreportsComponent } from './components/maincontent/jobreports/jobreports.component';
import { DatabaseClientComponent } from './components/maincontent/database/database-client/database-client.component';
import { DatabaseValuationComponent } from './components/maincontent/database/database-valuation/database-valuation.component';
import { DatabaseIndicationComponent } from './components/maincontent/database/database-indication/database-indication.component';
import { DatabasePropertyComponent } from './components/maincontent/database/database-property/database-property.component';
import { DatabaseOthersComponent } from './components/maincontent/database/database-others/database-others.component';
import { SystemsettingsComponent } from './components/maincontent/settings/systemsettings/systemsettings.component';

import { MyaccountComponent } from './components/maincontent/myaccount/myaccount.component';
import { MyaccounteditComponent } from './components/maincontent/myaccountedit/myaccountedit.component';

import { PagenotfoundComponent } from './components/maincontent/pagenotfound/pagenotfound.component';

import { LoginauthenticationComponent } from './loginauthentication/loginauthentication.component';
import { MaincontentComponent } from './components/maincontent/maincontent.component';

import { UsermanagementComponent } from './components/maincontent/settings/usermanagement/usermanagement.component';
import { DropdownlistComponent } from './components/maincontent/settings/dropdownlist/dropdownlist.component';
import { UseraccessroleComponent } from './components/maincontent/settings/useraccessrole/useraccessrole.component';

import { SearchComponent } from './components/maincontent/search/search.component';
import { SearchresultsComponent } from './components/maincontent/search/searchresults/searchresults.component';
import { CaveatsComponent } from './components/maincontent/search/caveats/caveats.component';
import { SamplepageComponent } from './components/maincontent/pagenotfound/samplepage/samplepage.component';

import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
    { path: '',
        redirectTo: '/authentication',  pathMatch: 'full'
    },
    { path: 'authentication',  component: LoginauthenticationComponent},
    { path: 'dashboard',  component: MaincontentComponent,
        children: [
            { path: '',  component: MydashboardComponent,
            canActivate : [MsalGuard]
            },
            // { path: 'myaccount/:id',  component: MydashboardDetailsComponent },
            { path: 'newindication', component: NewIndicationComponent },
            { path: 'newvaluation', component: NewValuationComponent },
            { path: 'newportfolio', component: NewPortfolioComponent },
            { path: 'newothers', component: NewOthersComponent },
            { path: 'avm', component: AvmComponent },
            { path: 'hdb', component: HdbComponent },
            { path: 'invoices', component: InvoicesComponent },
            { path: 'jobreports', component: JobreportsComponent },
            { path: 'databaseclient', component: DatabaseClientComponent },
            { path: 'databasevaluation', component: DatabaseValuationComponent },
            { path: 'databaseindication', component: DatabaseIndicationComponent },
            { path: 'database/property', component: DatabasePropertyComponent },
            { path: 'databaseothers', component: DatabaseOthersComponent },
            { path: 'myaccount', component: MyaccountComponent },
            // { path: 'myaccount', component: MyaccountComponent },
            { path: 'myaccountedit', component: MyaccounteditComponent },
            { path: 'settings/systemsettings', component: SystemsettingsComponent },

            { path: 'settings/usermanagement', component: UsermanagementComponent },
            { path: 'settings/dropdownlist', component: DropdownlistComponent },
            { path: 'settings/useraccessrole', component: UseraccessroleComponent },

            { path: 'search', component: SearchComponent },
            { path: 'searchresults', component: SearchresultsComponent },
            { path: 'caveats', component: CaveatsComponent },
            { path: 'samplepage', component: SamplepageComponent },
        ]
    },
    { path: '**', component: PagenotfoundComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}
export const routingComponents = [
    MydashboardComponent,
    MydashboardDetailsComponent,
    NewIndicationComponent,
    NewValuationComponent,
    NewPortfolioComponent,
    NewOthersComponent,
    AvmComponent,
    HdbComponent,
    InvoicesComponent,
    JobreportsComponent,
    DatabaseClientComponent,
    DatabaseValuationComponent,
    DatabaseIndicationComponent,
    DatabasePropertyComponent,
    DatabaseOthersComponent,
    MyaccountComponent,
    MyaccounteditComponent,
    UsermanagementComponent,
    DropdownlistComponent,
    UseraccessroleComponent,
    PagenotfoundComponent,
    SearchComponent,
    SearchresultsComponent,
    CaveatsComponent,
    SamplepageComponent,
    SystemsettingsComponent
];
