import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { ProductService } from '@app/core/services/product.service';
import { EMPTY, of, throwError } from 'rxjs';
import { Product } from '@app/core/models/product.model';
import { By } from '@angular/platform-browser';

describe('HomePageComponent', () => {
  let fixture: ComponentFixture<HomePageComponent>;
  let component: HomePageComponent;

  const mockProductOfTheWeek: Product = {
    id: 'week-1',
    title: 'Game of the Week',
    image: 'week.jpg',
    price: 29.99,
    currency: 'USD',
    isOwned: false,
    discount: 0.1,
  };

  const mockFeaturedProducts: Product[] = [
    {
      id: 'featured-1',
      title: 'Featured Game 1',
      image: 'featured1.jpg',
      price: 19.99,
      currency: 'USD',
      isOwned: false,
      discount: 0,
    },
    {
      id: 'featured-2',
      title: 'Featured Game 2',
      image: 'featured2.jpg',
      price: 39.99,
      currency: 'USD',
      isOwned: false,
      discount: 0.2,
    },
  ];

  const productServiceMock = {
    getProductOfTheWeek: () => of(mockProductOfTheWeek),
    getFeaturedProducts: () => of(mockFeaturedProducts),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [{ provide: ProductService, useValue: productServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the section header', () => {
    const header = fixture.debugElement.query(By.css('[data-testid="sectionHeader"]'));
    expect(header).toBeTruthy();
    expect(header.nativeElement.textContent.trim()).toBe('Game of the weak');
  });

  it('should render the product of the week card', () => {
    const hero = fixture.debugElement.query(By.css('[data-testid="productCardHero"]'));
    expect(hero).toBeTruthy();
  });

  it('should render all featured product cards', () => {
    const featuredCards = fixture.debugElement.queryAll(By.css('[data-testid="productCardFeatured"]'));
    expect(featuredCards.length).toBe(mockFeaturedProducts.length);
  });

  it('should handle missing product of the week gracefully', () => {
    const service = TestBed.inject(ProductService);
    spyOn(service, 'getProductOfTheWeek').and.returnValue(EMPTY);

    fixture = TestBed.createComponent(HomePageComponent);
    fixture.detectChanges();

    const hero = fixture.debugElement.query(By.css('[data-testid="productCardHero"]'));
    expect(hero).toBeNull();
  });

  it('should handle service errors without throwing', () => {
    const errorService = {
      getProductOfTheWeek: () => throwError(() => new Error('fail')),
      getFeaturedProducts: () => throwError(() => new Error('fail')),
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [HomePageComponent],
      providers: [{ provide: ProductService, useValue: errorService }],
    });

    expect(() => {
      const errorFixture = TestBed.createComponent(HomePageComponent);
      errorFixture.detectChanges();
    }).not.toThrow();
  });
});
