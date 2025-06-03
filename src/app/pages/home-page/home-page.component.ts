import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { first } from 'rxjs';

import { Product } from '@app/core/models/product.model';

import { ProductService } from '@app/core/services/product.service';

import { PageLayoutComponent } from '@app/shared/layout/page-layout/page-layout.component';
import { ProductCardHeroComponent } from '@app/shared/ui/product-card-hero/product-card-hero.component';
import { ProductCardFeaturedComponent } from '@app/shared/ui/product-card-featured/product-card-featured.component';
import { SectionProductsComponent } from '@app/shared/layout/section-products/section-products.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PageLayoutComponent, ProductCardHeroComponent, ProductCardFeaturedComponent, SectionProductsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  private productService = inject(ProductService);

  public productOfTheWeek = signal<Product | undefined>(undefined);
  public featuredProducts = signal<Product[] | undefined>(undefined);

  constructor() {
    this.productService
      .getProductOfTheWeek()
      .pipe(first())
      .subscribe({
        next: (resp) => this.productOfTheWeek.set(resp),
        error: (err) => console.warn(err),
      });
  }

  public ngOnInit(): void {
    this.productService
      .getProductOfTheWeek()
      .pipe(first())
      .subscribe({
        next: (resp) => this.productOfTheWeek.set(resp),
        error: (err) => console.warn(err),
      });

    this.productService
      .getFeaturedProducts()
      .pipe(first())
      .subscribe({
        next: (resp) => this.featuredProducts.set(resp),
        error: (err) => console.warn(err),
      });
  }
}
