import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardHeroComponent } from './product-card-hero.component';
import { By } from '@angular/platform-browser';
import { Product } from '@app/core/models/product.model';

describe('ProductCardHeroComponent', () => {
  let fixture: ComponentFixture<ProductCardHeroComponent>;
  let component: ProductCardHeroComponent;

  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    image: 'https://example.com/image.jpg',
    price: 9.99,
    currency: 'USD',
    discount: 0,
    isOwned: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardHeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardHeroComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render product image with correct src and alt', () => {
    const img: HTMLImageElement = fixture.debugElement.query(By.css('.product-image')).nativeElement;
    expect(img.src).toContain(mockProduct.image);
    expect(img.alt).toBe(mockProduct.title);
  });

  it('should have a data-testid attribute on the root element', () => {
    const card = fixture.debugElement.query(By.css('.product-card'));
    expect(card.attributes['data-testid']).toBeDefined();
  });
});
