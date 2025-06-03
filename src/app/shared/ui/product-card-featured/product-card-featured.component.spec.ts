import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardFeaturedComponent } from './product-card-featured.component';
import { Product } from '@app/core/models/product.model';
import { CartRepository } from '@app/state/cart-products.repository';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

// Mock CartRepository
class MockCartRepository {
  private cart: Record<string, Product> = {};

  getAllProducts() {
    return of(this.cart);
  }

  addProduct(product: Product) {
    this.cart[product.id] = product;
  }
}

describe('ProductCardFeaturedComponent', () => {
  let fixture: ComponentFixture<ProductCardFeaturedComponent>;
  let component: ProductCardFeaturedComponent;
  let mockCartRepo: MockCartRepository;

  const mockProduct: Product = {
    id: '123',
    title: 'Test Product',
    image: 'https://example.com/img.jpg',
    price: 49.99,
    currency: 'USD',
    isOwned: false,
    discount: 0.2,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardFeaturedComponent],
      providers: [{ provide: CartRepository, useClass: MockCartRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardFeaturedComponent);
    component = fixture.componentInstance;
    mockCartRepo = TestBed.inject(CartRepository) as unknown as MockCartRepository;

    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render product image with correct src and alt', () => {
    const img = fixture.debugElement.query(By.css('[data-testid="productImage"]')).nativeElement;
    expect(img.src).toContain(mockProduct.image);
    expect(img.alt).toBe(mockProduct.title);
  });

  it('should render product title', () => {
    const title = fixture.debugElement.query(By.css('[data-testid="productTitle"]')).nativeElement;
    expect(title.textContent).toContain(mockProduct.title);
  });

  it('should render discount if available and not owned/in cart', () => {
    const discount = fixture.debugElement.query(By.css('[data-testid="productDiscount"]'));
    expect(discount).toBeTruthy();
    expect(discount.nativeElement.textContent.trim()).toMatch(/-\d+%/);
  });

  it('should render add to cart button with correct price', () => {
    const button = fixture.debugElement.query(By.css('[data-testid="productPriceButton"]')).nativeElement;
    expect(button.textContent).toContain('$49.99');
  });

  it('should call addProduct when button clicked', () => {
    const spy = spyOn(mockCartRepo, 'addProduct').and.callThrough();
    const button = fixture.debugElement.query(By.css('[data-testid="productPriceButton"]')).nativeElement;
    button.click();
    expect(spy).toHaveBeenCalledWith(mockProduct);
  });

  it('should show "owned" if product is owned', () => {
    fixture.componentRef.setInput('product', { ...mockProduct, isOwned: true });
    fixture.detectChanges();

    const status = fixture.debugElement.query(By.css('[data-testid="productOwnershipStatus"]'));
    expect(status).toBeTruthy();
    expect(status.nativeElement.textContent.trim().toLowerCase()).toBe('owned');
  });

  it('should show "in cart" if product is already in cart', () => {
    mockCartRepo.addProduct(mockProduct);
    fixture.componentRef.setInput('product', { ...mockProduct, isOwned: false });
    fixture.detectChanges();

    const status = fixture.debugElement.query(By.css('[data-testid="productCartStatus"]'));
    expect(status).toBeTruthy();
    expect(status.nativeElement.textContent.trim().toLowerCase()).toBe('in cart');
  });
});
