import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { CartDropdownComponent } from '../cart-dropdown/cart-dropdown.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the nav with data-testid "mainNavBar"', () => {
    const nav = fixture.debugElement.query(By.css('[data-testid="mainNavBar"]'));
    expect(nav).toBeTruthy();
  });

  it('should render logo link with correct attributes', () => {
    const link = fixture.debugElement.query(By.css('[data-testid="appLogoLink"]'));
    const img = link.nativeElement.querySelector('img');

    expect(link.attributes['aria-label']).toBe('Homepage');
    expect(img).toBeTruthy();
    expect(img.getAttribute('alt')).toBe('GOG');
    expect(img.getAttribute('src')).toContain('assets/logo-gog.png');
  });

  it('should include <app-cart-dropdown> component', () => {
    const dropdown = fixture.debugElement.query(By.directive(CartDropdownComponent));
    expect(dropdown).toBeTruthy();
  });
});
