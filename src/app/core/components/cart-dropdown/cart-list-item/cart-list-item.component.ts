import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '@app/core/models/product.model';

@Component({
  selector: 'app-cart-list-item',
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListItemComponent {
  public product = input.required<Product>();
  public removeItemChange = output<string>();

  public hoveredItemId = signal<string | null>(null);

  public setHoveredItemId(id: string | null): void {
    this.hoveredItemId.set(id);
  }

  public removeItemFromCart(id: string): void {
    this.removeItemChange.emit(id);
  }
}
