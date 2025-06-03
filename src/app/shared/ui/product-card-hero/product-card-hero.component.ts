import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Product } from '@app/core/models/product.model';

@Component({
  selector: 'app-product-card-hero',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './product-card-hero.component.html',
  styleUrl: './product-card-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardHeroComponent {
  public product = input.required<Product>();
}
