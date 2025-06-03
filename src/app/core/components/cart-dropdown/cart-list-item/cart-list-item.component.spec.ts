import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartListItemComponent } from './cart-list-item.component';
import { Product } from '@app/core/models/product.model';
import { By } from '@angular/platform-browser';

describe('CartListItemComponent', () => {
  let fixture: ComponentFixture<CartListItemComponent>;
  let component: CartListItemComponent;

  const mockProduct: Product = {
    id: 'p1',
    title: 'Test Game',
    image: 'test.jpg',
    price: 49.99,
    currency: 'USD',
    isOwned: false,
    discount: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartListItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render product image, title and price', () => {
    const img = fixture.debugElement.query(By.css('[data-testid="cartProductImage"]')).nativeElement;
    const title = fixture.debugElement.query(By.css('[data-testid="cartProductTitle"]')).nativeElement;
    const price = fixture.debugElement.query(By.css('[data-testid="cartProductPrice"]')).nativeElement;

    expect(img.getAttribute('src')).toContain(mockProduct.image);
    expect(img.getAttribute('alt')).toBe(mockProduct.title);
    expect(title.textContent.trim()).toBe(mockProduct.title);
    expect(price.textContent).toContain('$49.99');
  });

  it('should show remove button on hover/focus', () => {
    const li = fixture.debugElement.query(By.css('li')).nativeElement;

    // Simulate hover
    li.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    let removeButton = fixture.debugElement.query(By.css('[data-testid="cartProductRemove"]'));
    expect(removeButton).toBeTruthy();

    // Simulate unhover
    li.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();

    removeButton = fixture.debugElement.query(By.css('[data-testid="cartProductRemove"]'));
    expect(removeButton).toBeNull();
  });

  it('should emit removeItemChange with product ID on button click', () => {
    const spy = spyOn(component.removeItemChange, 'emit');
    component.setHoveredItemId(mockProduct.id);
    fixture.detectChanges();

    const removeBtn = fixture.debugElement.query(By.css('[data-testid="cartProductRemove"]')).nativeElement;
    removeBtn.click();

    expect(spy).toHaveBeenCalledWith(mockProduct.id);
  });
});
