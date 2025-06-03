import { Injectable, PLATFORM_ID, TransferState, inject, makeStateKey } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../core/models/product.model';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { isPlatformServer } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);

  private getWithTransferState<T>(key: string, fetch: () => Observable<T>): Observable<T> {
    const stateKey = makeStateKey<T>(key);
    const cached = this.transferState.get<T | null>(stateKey, null);

    if (cached) {
      this.transferState.remove(stateKey);
      return of(cached);
    }

    return fetch().pipe(
      tap((data) => {
        if (isPlatformServer(this.platformId)) this.transferState.set(stateKey, data);
      }),
    );
  }

  public getProductOfTheWeek(): Observable<Product> {
    return this.getWithTransferState<Product>('weekProduct', () => this.http.get<Product>('/assets/mocks/product-of-the-week.json'));
  }

  public getFeaturedProducts(): Observable<Product[]> {
    return this.getWithTransferState<Product[]>('featuredProducts', () => this.http.get<Product[]>('/assets/mocks/featured-products.json'));
  }
}
