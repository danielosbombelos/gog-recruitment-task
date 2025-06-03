import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-section-products',
  standalone: true,
  imports: [],
  template: `<ng-content />`,
  styleUrl: './section-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionProductsComponent {}
