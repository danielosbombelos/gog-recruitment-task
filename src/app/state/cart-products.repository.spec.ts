import { CartRepository } from './cart-products.repository';
import { Product, ProductMap } from '../core/models/product.model';
import { take } from 'rxjs/operators';

describe('CartRepository', () => {
  let repo: CartRepository;

  const mockProduct: Product = {
    id: 'test123',
    title: 'Mock Product',
    image: '',
    price: 9.99,
    currency: 'USD',
    isOwned: false,
    discount: 0,
  };

  beforeEach(() => {
    localStorage.clear();
    repo = new CartRepository();
    repo.removeAllProducts();
  });

  it('should add a product to the store', (done) => {
    repo.addProduct(mockProduct);

    repo
      .getAllProducts()
      .pipe(take(1))
      .subscribe((products: ProductMap) => {
        expect(products[mockProduct.id]).toEqual(mockProduct);
        done();
      });
  });

  it('should remove a product by ID', (done) => {
    repo.addProduct(mockProduct);
    repo.removeProduct(mockProduct.id);

    repo
      .getAllProducts()
      .pipe(take(1))
      .subscribe((products: ProductMap) => {
        expect(products[mockProduct.id]).toBeUndefined();
        done();
      });
  });

  it('should clear all products', (done) => {
    repo.addProduct(mockProduct);
    repo.removeAllProducts();

    repo
      .getAllProducts()
      .pipe(take(1))
      .subscribe((products: ProductMap) => {
        expect(Object.keys(products).length).toBe(0);
        done();
      });
  });
});
