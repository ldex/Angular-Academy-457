import { Component, inject, Signal, signal } from '@angular/core'
import { Product } from '../../models/product'
import { CurrencyPipe, UpperCasePipe } from '@angular/common'
import { ProductDetails } from "../product-details/product-details"
import { ProductService } from '../product-service'

@Component({
  selector: 'app-product-list',
  imports: [UpperCasePipe, CurrencyPipe, ProductDetails],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  private productService = inject(ProductService)

  title = signal('Products')

  products: Signal<Product[]> = this.productService.getProducts();
  selectedProduct = signal<Product | undefined>(undefined)

  selectProduct(product: Product) {
    this.selectedProduct.set(product)
  }

}
