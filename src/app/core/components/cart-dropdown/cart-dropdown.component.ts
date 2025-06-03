import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, HostListener, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ProductMap } from '@app/core/models/product.model';
import { CartRepository } from '@app/state/cart-products.repository';
import { CartListItemComponent } from './cart-list-item/cart-list-item.component';
import { ButtonComponent } from '@app/shared/ui/button/button.component';

@Component({
  selector: 'app-cart-dropdown',
  standalone: true,
  imports: [CommonModule, CartListItemComponent, ButtonComponent],
  templateUrl: './cart-dropdown.component.html',
  styleUrl: './cart-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDropdownComponent {
  private host = inject(ElementRef);
  private cartRepository = inject(CartRepository);

  private cartProductsMap = toSignal(this.cartRepository.getAllProducts(), { initialValue: {} as ProductMap });
  public cartData = computed(() => {
    const items = Object.values(this.cartProductsMap());
    const count = items.length;
    const totalValue = items.reduce((acc, item) => acc + item.price, 0);
    const currency = items[0]?.currency ?? null;

    return { items, count, totalValue, currency };
  });

  public dropdownOpen = signal(false);

  public toggleDropdown(): void {
    this.dropdownOpen.update((v) => !v);
  }

  public removeItemFromCart(id: string): void {
    this.cartRepository.removeProduct(id);
  }

  public removeAllFromCart(): void {
    this.cartRepository.removeAllProducts();
  }

  @HostListener('document:click', ['$event.target'])
  public onDocumentClick(target: HTMLElement) {
    const clickedInside = this.host.nativeElement.contains(target);
    if (!clickedInside) {
      this.dropdownOpen.set(false);
    }
  }
}
