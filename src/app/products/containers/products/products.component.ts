import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';

import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a class="btn btn__ok" routerLink="./new"> New Pizza</a>
      </div>
      <div class="products__list">
        <ng-container *ngIf="pizzas$ | async as pizzas else noPizzas">
          <pizza-item *ngFor="let pizza of (pizzas)" [pizza]="pizza">
        </pizza-item>
      </ng-container>
      <ng-template #noPizzas>
        <div>No pizzas, add one to get started.</div>
      </ng-template>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) { }

  ngOnInit() {
    this.pizzas$ = this.store.pipe(select(fromStore.getAllPizzas));
    this.store.dispatch(new fromStore.LoadPizzas());
  }
}
