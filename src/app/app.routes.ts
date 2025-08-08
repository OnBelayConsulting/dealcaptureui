import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { DealsListComponent } from './components/deals/deals-list/deals-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PermissionDeniedComponent } from './components/permission-denied/permission-denied.component';
import { canActivateAuthRole } from './guards/auth-role.guard';
import {OrganizationsListComponent} from './components/organizations/organizations-list/organizations-list.component';
import {CompanyRoleEditComponent} from './components/organizations/companyrole-edit/companyrole-edit.component';
import {CounterpartyRoleEditComponent} from './components/organizations/counterpartyrole-edit/counterpartyrole-edit.component';
import {PhysicalDealEditComponent} from './components/deals/physical-deal-edit/physical-deal-edit.component';
import {PriceIndicesListComponent} from './components/pricing/price-indices-list/price-indices-list.component';
import {PriceIndexEditComponent} from './components/pricing/price-index-edit/price-index-edit.component';
import {
  PricingLocationsListComponent
} from './components/pricing-locations/pricing-locations-list/pricing-locations-list.component';
import {
  PricingLocationsEditComponent
} from './components/pricing-locations/pricing-locations-edit/pricing-locations-edit.component';
import {DealCostListComponent} from './components/deals/deal-cost-list/deal-cost-list.component';
import {DealCostEditComponent} from './components/deals/deal-cost-edit/deal-cost-edit.component';
import {PriceCurvesListComponent} from './components/pricing/price-curves-list/price-curves-list.component';
import {PriceCurveEditComponent} from './components/pricing/price-curve-edit/price-curve-edit.component';
import {PositionsListComponent} from './components/positions/positions-list/positions-list.component';
import {JobsListComponent} from './components/jobs/jobs-list/jobs-list.component';
import {JobsCreateComponent} from './components/jobs/jobs-create/jobs-create.component';
import {
  PriceRiskFactorListComponent
} from './components/riskfactors/price-riskfactor-list/price-riskfactor-list.component';
import {PowerProfileListComponent} from './components/powerprofile/power-profile-list/power-profile-list.component';
import {PowerProfileEditComponent} from './components/powerprofile/power-profile-edit/power-profile-edit.component';
import {
  ProfilePositionsListComponent
} from './components/powerprofile/profile-positions-list/profile-positions-list.component';
import {FxIndicesListComponent} from './components/pricing/fx-indices-list/fx-indices-list.component';
import {FxIndexEditComponent} from './components/pricing/fx-index-edit/fx-index-edit.component';
import {FxCurvesListComponent} from './components/pricing/fx-curves-list/fx-curves-list.component';
import {FxCurveEditComponent} from './components/pricing/fx-curve-edit/fx-curve-edit.component';
import {MarkToMarketRequestComponent} from './components/deals/mark-to-market-request/mark-to-market-request.component';
import {FinancialSwapDealEditComponent} from './components/deals/swap-deal-edit/financial-swap-deal-edit.component';
import {
  InterestRateIndexEditComponent
} from './components/pricing/interest-rate-index-edit/interest-rate-index-edit.component';
import {
  InterestRateIndicesListComponent
} from './components/pricing/interest-rate-indices-list/interest-rate-indices-list.component';
import {InterestCurvesListComponent} from './components/pricing/interest-curves-list/interest-curves-list.component';
import {InterestCurveEditComponent} from './components/pricing/interest-curve-edit/interest-curve-edit.component';
import {DealOverridesListComponent} from './components/deals/deal-overrides-list/deal-overrides-list.component';
import {DealOverridesEditComponent} from './components/deals/deal-overrides-edit/deal-overrides-edit.component';
import {VanillaOptionEditComponent} from './components/deals/vanilla-option-edit/vanilla-option-edit.component';
import {
  DealHourlyOverridesEditComponent
} from './components/deals/deal-hourly-overrides-edit/deal-hourly-overrides-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'deals/list',
    component: DealsListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'deals/PhysicalDeal/edit',
    component: PhysicalDealEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'deals/VanillaOption/edit',
    component: VanillaOptionEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'deals/FinancialSwap/edit',
    component: FinancialSwapDealEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'deals/mtm',
    component: MarkToMarketRequestComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'deals/:dealId/dealCosts/list',
    component: DealCostListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'deals/:dealId/overrides/list',
    component: DealOverridesListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'deals/:dealId/overrides/edit',
    component: DealOverridesEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'deals/:dealId/hourlyoverrides/edit',
    component: DealHourlyOverridesEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'deals/:dealId/dealCosts/edit',
    component: DealCostEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'priceIndices/list',
    component: PriceIndicesListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'priceIndices/edit',
    component: PriceIndexEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'interestIndices/list',
    component: InterestRateIndicesListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'interestIndices/edit',
    component: InterestRateIndexEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'priceCurves/list',
    component: PriceCurvesListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'priceCurves/edit',
    component: PriceCurveEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'fxIndices/list',
    component: FxIndicesListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'fxIndices/edit',
    component: FxIndexEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'fxCurves/list',
    component: FxCurvesListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'fxCurves/edit',
    component: FxCurveEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'interestCurves/list',
    component: InterestCurvesListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'interestCurves/edit',
    component: InterestCurveEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'pricingLocations/list',
    component: PricingLocationsListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'pricingLocations/edit',
    component: PricingLocationsEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'positions/list',
    component: PositionsListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'powerProfiles/list',
    component: PowerProfileListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'powerProfiles/positions/list',
    component: ProfilePositionsListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'powerProfiles/edit',
    component: PowerProfileEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'priceriskfactors/list',
    component: PriceRiskFactorListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'jobs/list',
    component: JobsListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'jobs/edit',
    component: JobsCreateComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'organizations/list',
    component: OrganizationsListComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }
  },
  {
    path: 'organizations/companyRole/:organizationId',
    component: CompanyRoleEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }

  },
  {
    path: 'organizations/counterpartyRole/:organizationId',
    component: CounterpartyRoleEditComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals' }

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
