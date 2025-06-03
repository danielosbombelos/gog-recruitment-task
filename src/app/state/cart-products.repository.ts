import { Injectable } from '@angular/core';
import { createStore, select, withProps } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';
import { identity, Observable } from 'rxjs';

import { Product, ProductMap } from '../core/models/product.model';

type ProductState = ProductMap;

const store = createStore({ name: 'cartProducts' }, withProps<ProductState>({}));
persistState(store, {
  key: 'cartProducts',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class CartRepository {
  public addProduct(product: Product): void {
    store.update((state) => ({
      ...state,
      [product.id]: product,
    }));
  }

  public removeProduct(id: string) {
    const { [id]: _, ...rest } = store.getValue();
    store.update(() => rest);
  }

  public removeAllProducts() {
    store.update(() => ({}));
  }

  public getAllProducts(): Observable<ProductMap> {
    return store.pipe(select(identity));
  }
}
