import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unSetItems } from './ingreso-egreso.action';

export interface State {
    items: IngresoEgreso[]; 
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,
    //Load items
    on( setItems, (state , { items }) => ({ ...state, items: [...items]})),
    //Reset
    on( unSetItems, state => ({ ...state, items: []})),


);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}