import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as actions from '../actions/pizzas.actions';
import { PizzasService } from '../../services';

@Injectable()
export class PizzaEffects {
  constructor(
    private service: PizzasService,
    private actions$: Actions) { }

  @Effect()
  loadPizzas$: Observable<Action> = this.actions$.pipe(
    ofType(actions.LOAD_PIZZAS),
    switchMap(() =>
      this.service.getPizzas().pipe(
        map(pizaas => new actions.LoadPizzasSuccess(pizaas)),
        catchError(err => of(new actions.LoadPizzasFail(err)))
      ))
  );
}
