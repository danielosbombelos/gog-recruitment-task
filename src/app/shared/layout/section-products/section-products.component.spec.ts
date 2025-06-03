import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionProductsComponent } from './section-products.component';
import { Component } from '@angular/core';

@Component({
  template: `<app-section-products><p class="test-content">Projected</p></app-section-products>`,
  standalone: true,
  imports: [SectionProductsComponent],
})
class TestHostComponent {}

describe('SectionProductsComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should project content inside the component', () => {
    const projected = fixture.nativeElement.querySelector('.test-content');
    expect(projected).toBeTruthy();
    expect(projected.textContent.trim()).toBe('Projected');
  });
});
