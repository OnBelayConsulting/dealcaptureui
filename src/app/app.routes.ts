import {Routes} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {DealsListComponent} from './components/deals/deals-list/deals-list.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {PermissionDeniedComponent} from './components/permission-denied/permission-denied.component';
import {canActivateAuthRole} from './guards/auth-role.guard';
import {OrganizationsListComponent} from './components/organizations/organizations-list/organizations-list.component';
import {CompanyRoleEditComponent} from './components/organizations/companyrole-edit/companyrole-edit.component';
import {
  CounterpartyRoleEditComponent
} from './components/organizations/counterpartyrole-edit/counterpartyrole-edit.component';
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
import {DealJobCreateComponent} from './components/jobs/jobs-create/deal-job-create.component';
import {
  PriceRiskFactorListComponent
} from './components/riskfactors/price-riskfactor-list/price-riskfactor-list.component';
import {PowerProfileListComponent} from './components/powerprofile/power-profile-list/power-profile-list.component';
import {PowerProfileEditComponent} from './components/powerprofile/power-profile-edit/power-profile-edit.component';
import {
  ProfilePositionsListComponent
} from './components/powerprofile/profile-positions-list/profile-positions-list.component';
import {FxIndicesListComponent} from './components/fx/fx-indices-list/fx-indices-list.component';
import {FxIndexEditComponent} from './components/fx/fx-index-edit/fx-index-edit.component';
import {FxCurvesListComponent} from './components/fx/fx-curves-list/fx-curves-list.component';
import {FxCurveEditComponent} from './components/fx/fx-curve-edit/fx-curve-edit.component';
import {MarkToMarketRequestComponent} from './components/deals/mark-to-market-request/mark-to-market-request.component';
import {FinancialSwapDealEditComponent} from './components/deals/swap-deal-edit/financial-swap-deal-edit.component';
import {
  InterestRateIndexEditComponent
} from './components/interest-rates/interest-rate-index-edit/interest-rate-index-edit.component';
import {
  InterestRateIndicesListComponent
} from './components/interest-rates/interest-rate-indices-list/interest-rate-indices-list.component';
import {
  InterestCurvesListComponent
} from './components/interest-rates/interest-curves-list/interest-curves-list.component';
import {
  InterestCurveEditComponent
} from './components/interest-rates/interest-curve-edit/interest-curve-edit.component';
import {DealOverridesListComponent} from './components/deals/deal-overrides-list/deal-overrides-list.component';
import {DealOverridesEditComponent} from './components/deals/deal-overrides-edit/deal-overrides-edit.component';
import {VanillaOptionEditComponent} from './components/deals/vanilla-option-edit/vanilla-option-edit.component';
import {
  DealHourlyOverridesEditComponent
} from './components/deals/deal-hourly-overrides-edit/deal-hourly-overrides-edit.component';
import {DealHomeComponent} from './components/deals/deal-home/deal-home.component';
import {PricingHomeComponent} from './components/pricing/pricing-home/pricing-home.component';
import {OrganizationsHomeComponent} from './components/organizations/organizations-home/organizations-home.component';
import {JobsHomeComponent} from './components/jobs/jobs-home/jobs-home.component';
import {FxHomeComponent} from './components/fx/fx-home/fx-home.component';
import {
  InterestRatesHomeComponent
} from './components/interest-rates/interest-rates-home/interest-rates-home.component';
import {FxRiskFactorListComponent} from './components/riskfactors/fx-risk-factor-list/fx-risk-factor-list.component';
import {
  BusinessContactsListComponent
} from './components/businesscontacts/business-contacts-list/business-contacts-list.component';
import {
  PowerProfileJobCreateComponent
} from './components/jobs/power-profile-job-create/power-profile-job-create.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'deals',
    component: DealHomeComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-deals'},
    children : [
      {
        path: 'list',
        component: DealsListComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-deals' }
      },
      {
        path: 'PhysicalDeal/edit',
        component: PhysicalDealEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'save-deals'}
      },
      {
        path: 'VanillaOption/edit',
        component: VanillaOptionEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'save-deals' }
      },
      {
        path: 'FinancialSwap/edit',
        component: FinancialSwapDealEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'save-deals' }
      },
      {
        path: 'mtm',
        component: MarkToMarketRequestComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'run-deals' }
      },
      {
        path: ':dealId/dealCosts/list',
        component: DealCostListComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-deals' }
      },
      {
        path: ':dealId/overrides/list',
        component: DealOverridesListComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-deals' }
      },
      {
        path: ':dealId/overrides/edit',
        component: DealOverridesEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'save-deals' }
      },
      {
        path: ':dealId/hourlyoverrides/edit',
        component: DealHourlyOverridesEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'save-deals' }
      },
      {
        path: ':dealId/dealCosts/edit',
        component: DealCostEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'save-deals' }
      },
      {
        path: 'positions/list',
        component: PositionsListComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'view-deals' }
      },
      {
        path: 'powerProfiles/list',
        component: PowerProfileListComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'view-deals' }
      },
      {
        path: 'powerProfiles/positions/list',
        component: ProfilePositionsListComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'view-deals' }
      },
      {
        path: 'powerProfiles/edit',
        component: PowerProfileEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'save-deals' }
      },

    ]
  },
  {
    path: 'interestrates',
    component: InterestRatesHomeComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-pricing' },
    children : [
      {
        path: 'indices/list',
        component: InterestRateIndicesListComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-pricing' }
      },
      {
        path: 'indices/edit',
        component: InterestRateIndexEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-pricing' }
      },
      {
        path: 'curves/list',
        component: InterestCurvesListComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'view-pricing' }
      },
      {
        path: 'curves/edit',
        component: InterestCurveEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-pricing' }
      },

    ]
  },

  {
    path: 'pricing',
    component: PricingHomeComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-pricing' },
    children : [
      {
        path: 'priceIndices/list',
        component: PriceIndicesListComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-pricing' }
      },
      {
        path: 'priceIndices/edit',
        component: PriceIndexEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'edit-pricing' }
      },
      {
        path: 'priceCurves/list',
        component: PriceCurvesListComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-pricing' }
      },
      {
        path: 'priceCurves/edit',
        component: PriceCurveEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'edit-pricing' }
      },
      {
        path: 'pricingLocations/list',
        component: PricingLocationsListComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'view-pricing'}
      },
      {
        path: 'pricingLocations/edit',
        component: PricingLocationsEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'edit-pricing'}
      },
      {
        path: 'riskfactors/list',
        component: PriceRiskFactorListComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'view-pricing' }
      },

    ]
  },
  {
    path: 'fx',
    component: FxHomeComponent,
    canActivate: [canActivateAuthRole],
    data: {role: 'view-pricing'},
    children: [
      {
        path: 'indices/list',
        component: FxIndicesListComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-pricing' }
      },
      {
        path: 'indices/edit',
        component: FxIndexEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'save-pricing' }
      },
      {
        path: 'curves/list',
        component: FxCurvesListComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-pricing'}
      },
      {
        path: 'curves/edit',
        component: FxCurveEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'edit-pricing' }
      },
      {
        path: 'riskfactors/list',
        component: FxRiskFactorListComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'view-pricing' }
      },

    ]
  },
  {
    path: 'jobs',
    component: JobsHomeComponent,
    canActivate: [canActivateAuthRole],
    data: { role:'view-jobs' },
    children : [
      {
        path: 'list',
        component: JobsListComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'view-jobs' }
      },
      {
        path: 'powerProfile/create',
        component: PowerProfileJobCreateComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'edit-jobs' }
      },
      {
        path: 'deal/create',
        component: DealJobCreateComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'edit-jobs' }
      },

    ]
  },
  {
    path: 'organizations',
    component: OrganizationsHomeComponent,
    canActivate: [canActivateAuthRole],
    data: { role: 'view-organizations' },
    children : [
      {
        path: 'list',
        component: OrganizationsListComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-organizations' }
      },
      {
        path: 'businessContacts/list',
        component: BusinessContactsListComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'view-organizations' }
      },
      {
        path: 'companyRole/:organizationId',
        component: CompanyRoleEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role:'edit-organizations' }

      },
      {
        path: 'counterpartyRole/:organizationId',
        component: CounterpartyRoleEditComponent,
        canActivate: [canActivateAuthRole],
        data: { role: 'edit-organizations' }

      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
    ]
  },
  { path: 'forbidden', component: PermissionDeniedComponent },
  { path: '**', component: NotFoundComponent }
];
