import { Component, inject, Signal, signal } from '@angular/core'
import { Product } from '../../models/product'
import { CurrencyPipe, SlicePipe, UpperCasePipe } from '@angular/common'
import { ProductDetails } from "../product-details/product-details"
import { ProductService } from '../product-service'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-product-list',
  imports: [UpperCasePipe, CurrencyPipe, ProductDetails, SlicePipe, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  private productService = inject(ProductService)

  title = signal('Products')
  isLoading = this.productService.isLoading
  error = this.productService.errorMessage

  // Pagination
  pageSize = signal(5)
  start = signal(0)
  end = signal(this.pageSize())
  pageNumber = signal(1)

  changePage(increment: number) {
    this.selectedProduct.set(undefined)
    this.pageNumber.update(n => n + increment)
    this.start.update(n => n + increment * this.pageSize())
    this.end.set(this.start() + this.pageSize())
  }


  products: Signal<Product[]> = this.productService.getProducts();
  selectedProduct = signal<Product | undefined>(undefined)

  selectProduct(product: Product) {
    this.selectedProduct.set(product)
  }

}
