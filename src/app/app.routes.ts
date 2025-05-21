import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ListDealsComponent } from './components/deals/list-deals/list-deals.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PermissionDeniedComponent } from './components/permission-denied/permission-denied.component';
import { canActivateAuthRole } from './guards/auth-role.guard';
import {DealDashboardComponent} from './components/deals/deal-dashboard/deal-dashboard.component';
import {DealViewComponent} from './components/deals/deal-view/deal-view.component';
import {DealEditComponent} from './components/deals/deal-edit/deal-edit.component';
import {OrgDashboardComponent} from './components/organizations/org-dashboard/org-dashboard.component';
import {ListOrganizationsComponent} from './components/organizations/list-organizations/list-organizations.component';
import {OrganizationEditComponent} from './components/organizations/organization-edit/organization-edit.component';
import {CompanyRoleEditComponent} from './components/organizations/companyrole-edit/companyrole-edit.component';
import {CounterpartyRoleEditComponent} from './components/organizations/counterpartyrole-edit/counterpartyrole-edit.component';
import {PhysicalDealEditComponent} from './components/deals/physical-deal-edit/physical-deal-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'deals',
    component: DealDashboardComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' },
    children: [
      {
        path: 'list',
        component: ListDealsComponent
      },
      {
        path: 'view/:dealId',
        component: DealViewComponent
      },
      {
        path: 'edit',
        component: PhysicalDealEditComponent
      }
    ]

  },
  {
    path: 'organizations',
    component: OrgDashboardComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' },
    children: [
      {
        path: 'list',
        component: ListOrganizationsComponent,
      },
      {
        path: 'edit',
        component: OrganizationEditComponent
      },
      {
        path: 'companyRole/:organizationId',
        component: CompanyRoleEditComponent
      },
      {
        path: 'counterpartyRole/:organizationId',
        component: CounterpartyRoleEditComponent
      }
    ]

  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'see-profile' }
  },
  { path: 'forbidden', component: PermissionDeniedComponent },
  { path: '**', component: NotFoundComponent }
];
