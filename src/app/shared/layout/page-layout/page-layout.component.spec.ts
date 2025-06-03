import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageLayoutComponent } from './page-layout.component';
import { Component } from '@angular/core';

@Component({
  template: `<app-page-layout><p class="projected-content">Test content</p></app-page-layout>`,
  standalone: true,
  imports: [PageLayoutComponent],
})
class TestHostComponent {}

describe('PageLayoutComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should render projected content inside .page-container', () => {
    const container = fixture.nativeElement.querySelector('.page-container');
    const projected = container.querySelector('.projected-content');

    expect(container).toBeTruthy();
    expect(projected).toBeTruthy();
    expect(projected.textContent.trim()).toBe('Test content');
  });
});
