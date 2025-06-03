import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDropdownComponent } from './cart-dropdown.component';
import { CartRepository } from '@app/state/cart-products.repository';
import { Product } from '@app/core/models/product.model';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';

class MockCartRepository {
  private cart: Record<string, Product> = {
    '1': {
      id: '1',
      title: 'Test Product 1',
      image: 'featured1.jpg',
      price: 10,
      currency: 'USD',
      isOwned: false,
      discount: 0,
    },
    '2': {
      id: '2',
      title: 'Test Product 2',
      image: 'featured2.jpg',
      price: 20,
      currency: 'USD',
      isOwned: false,
      discount: 0,
    },
  };

  getAllProducts() {
    return of(this.cart);
  }

  removeProduct = jasmine.createSpy('removeProduct');
  removeAllProducts = jasmine.createSpy('removeAllProducts');
}

describe('CartDropdownComponent', () => {
  let fixture: ComponentFixture<CartDropdownComponent>;
  let component: CartDropdownComponent;
  let mockRepo: MockCartRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDropdownComponent],
      providers: [{ provide: CartRepository, useClass: MockCartRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDropdownComponent);
    component = fixture.componentInstance;
    mockRepo = TestBed.inject(CartRepository) as unknown as MockCartRepository;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the dropdown container and button with test IDs', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="cartDropdown"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="cartButton"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="cartButtonIcon"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="cartButtonCounter"]')).nativeElement.textContent.trim()).toBe('2');
  });

  it('should toggle dropdown open/close on button click', () => {
    const button = fixture.debugElement.query(By.css('[data-testid="cartButton"]')).nativeElement;
    expect(fixture.debugElement.query(By.css('[data-testid="cartMenuContainer"]'))).toBeNull();

    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="cartMenuContainer"]'))).toBeTruthy();

    button.click();
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="cartMenuContainer"]'))).toBeNull();
  });

  it('should display correct total and counter in dropdown menu', () => {
    component.dropdownOpen.set(true);
    fixture.detectChanges();

    const counter = fixture.debugElement.query(By.css('[data-testid="cartMenuCounter"]')).nativeElement;
    const total = fixture.debugElement.query(By.css('[data-testid="cartMenuTotal"]')).nativeElement;

    expect(counter.textContent).toContain('2 items');
    expect(total.textContent).toContain('$30');
  });

  it('should call removeAllFromCart on "Clear cart" click', () => {
    component.dropdownOpen.set(true);
    fixture.detectChanges();

    const clearBtn = fixture.debugElement.query(By.css('[data-testid="cartMenuClearCart"]')).nativeElement;
    clearBtn.click();

    expect(mockRepo.removeAllProducts).toHaveBeenCalled();
  });

  it('should close dropdown on outside click', () => {
    component.dropdownOpen.set(true);
    fixture.detectChanges();

    // Simulate outside click
    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.click();

    expect(component.dropdownOpen()).toBeFalse();
  });

  it('should call removeItemFromCart when event is emitted', () => {
    spyOn(component, 'removeItemFromCart');

    component.dropdownOpen.set(true);
    fixture.detectChanges();

    const cartItemDebug = fixture.debugElement.query(By.directive(CartListItemComponent));
    cartItemDebug.triggerEventHandler('removeItemChange', '1');

    expect(component.removeItemFromCart).toHaveBeenCalledWith('1');
  });
});
