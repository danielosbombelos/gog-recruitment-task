import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-host',
  template: ` <app-button [type]="type" [disabled]="disabled" [ariaLabel]="ariaLabel"> Click me </app-button> `,
  standalone: true,
  imports: [ButtonComponent],
})
class TestHostComponent {
  type: 'button' | 'submit' | 'reset' = 'button';
  disabled = false;
  ariaLabel = 'Submit the form';
}

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let buttonEl: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    buttonEl = fixture.nativeElement.querySelector('button');
  });

  it('should render projected content', () => {
    expect(buttonEl.textContent?.trim()).toBe('Click me');
  });

  it('should have default type as "button"', () => {
    expect(buttonEl.getAttribute('type')).toBe('button');
  });

  it('should bind given aria-label', () => {
    expect(buttonEl.getAttribute('aria-label')).toBe('Submit the form');
  });

  it('should reflect disabled state', () => {
    hostComponent.disabled = true;
    fixture.detectChanges();
    expect(buttonEl.disabled).toBeTrue();
  });

  it('should allow changing button type', () => {
    hostComponent.type = 'submit';
    fixture.detectChanges();
    expect(buttonEl.getAttribute('type')).toBe('submit');
  });
});
