import { CurrencyPipe, NgOptimizedImage, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Product, ProductMap } from '@app/core/models/product.model';
import { CartRepository } from '@app/state/cart-products.repository';

@Component({
  selector: 'app-product-card-featured',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe, NgOptimizedImage],
  templateUrl: './product-card-featured.component.html',
  styleUrl: './product-card-featured.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardFeaturedComponent {
  private cartRepository = inject(CartRepository);
  private cartProducts = toSignal(this.cartRepository.getAllProducts(), { initialValue: {} as ProductMap });

  public product = input.required<Product>();
  public isInCart = computed(() => !!this.cartProducts()[this.product().id]);

  public onAddToCart(product: Product): void {
    this.cartRepository.addProduct(product);
  }
}
