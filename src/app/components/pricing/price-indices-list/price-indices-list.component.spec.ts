
import { PriceIndicesListComponent } from './price-indices-list.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {PriceIndexSnapshotCollection} from '../model/price.model';
import {Observable} from 'rxjs';
import {HttpResponse, provideHttpClient} from '@angular/common/http';
import {PriceIndexService} from '../../../services/price-index.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';

describe('PriceIndicesListComponent', () => {
  let component: PriceIndicesListComponent;
  let fixture: ComponentFixture<PriceIndicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceIndicesListComponent],
      providers : [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PriceIndicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Should populate table", () => {
    let collection : PriceIndexSnapshotCollection = {
      errorCode : '0',
      errorMessage : '',
      totalItems : 1,
      count : 1,
      limit : 100,
      start : 0,
      name : 'priceIndices',
      snapshots : [
        {
          entityState : 'UNMODIFIED',
          entityId : {
            id : 1,
            code : 'index'
          },
          pricingLocationId : {
            id : 2,
            code : 'West'
          },
          detail : {
            name : 'AWED',
            indexTypeValue : 'Hub',
            frequencyCodeValue : 'D',
            currencyCodeValue : 'CAD',
            unitOfMeasureCodeValue : 'GJ',
            benchSettlementRuleCodeValue : 'NEVER'

          }
        }
      ]
    }
    fixture.detectChanges();

    let response = new HttpResponse({ body: collection});

    let priceIndexService = fixture.debugElement.injector.get(PriceIndexService);
    let spy = spyOn(priceIndexService, "findPriceIndices")
                                                .withArgs("WHERE ", 0, 100)
                                                .and.returnValue(new Observable( (subscriber) => {
                                                  subscriber.next(collection)
      } ));
    expect(component.priceIndexCollection).toBeTruthy();
  })
});
