import * as fromActions from '../actions/pizzas.actions';

import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromActions.PizzaAction): PizzaState {

  switch (action.type) {
    case fromActions.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromActions.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;

      const entities = pizzas.reduce(
        (pizzaEntities: { [id: number]: Pizza }, pizza: Pizza) => {
          return {
            ...pizzaEntities,
            [pizza.id]: pizza
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        entities,
        loading: false,
        loaded: true
      };
    }
    case fromActions.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
