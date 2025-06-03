import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { TransferState, makeStateKey, PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { Product } from '../../core/models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let transferStateMock: TransferState;

  const mockProduct: Product = {
    id: 'week-1',
    title: 'Game of the Week',
    image: 'image.jpg',
    price: 19.99,
    currency: 'USD',
    isOwned: false,
    discount: 0,
  };

  const mockFeatured: Product[] = [mockProduct];

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    transferStateMock = new TransferState();
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: HttpClient, useValue: httpSpy },
        { provide: TransferState, useValue: transferStateMock },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    service = TestBed.inject(ProductService);
  });

  it('should fetch product of the week from HTTP when no cache exists', (done) => {
    httpSpy.get.and.returnValue(of(mockProduct));

    service.getProductOfTheWeek().subscribe((res) => {
      expect(res).toEqual(mockProduct);
      expect(httpSpy.get).toHaveBeenCalledWith('/assets/mocks/product-of-the-week.json');
      done();
    });
  });

  it('should use cached value and not call HTTP', (done) => {
    const key = makeStateKey<Product>('weekProduct');
    transferStateMock.set(key, mockProduct);

    service.getProductOfTheWeek().subscribe((res) => {
      expect(res).toEqual(mockProduct);
      expect(httpSpy.get).not.toHaveBeenCalled();
      done();
    });
  });

  it('should cache the result on server platform', (done) => {
    TestBed.resetTestingModule();
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    const transferStateSetSpy = jasmine.createSpyObj('TransferState', ['get', 'set', 'remove']);
    transferStateSetSpy.get.and.returnValue(null);
    transferStateSetSpy.set.and.stub();

    TestBed.configureTestingModule({
      providers: [
        ProductService,
        { provide: HttpClient, useValue: httpSpy },
        { provide: TransferState, useValue: transferStateSetSpy },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    const srvService = TestBed.inject(ProductService);
    httpSpy.get.and.returnValue(of(mockProduct));

    srvService.getProductOfTheWeek().subscribe((res) => {
      expect(res).toEqual(mockProduct);
      expect(transferStateSetSpy.set).toHaveBeenCalled();
      done();
    });
  });

  it('should fetch featured products list', (done) => {
    httpSpy.get.and.returnValue(of(mockFeatured));

    service.getFeaturedProducts().subscribe((res) => {
      expect(res).toEqual(mockFeatured);
      expect(httpSpy.get).toHaveBeenCalledWith('/assets/mocks/featured-products.json');
      done();
    });
  });
});
