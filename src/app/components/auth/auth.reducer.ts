import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';

import * as actions from './auth.actions';

export interface State {
       user: Usuario;  
};

const initialState: State = {
        user: null,
};


const _authReducer = createReducer(
    initialState,
    on( actions.setUser,
        (state, { user }) => ({...state, user: {...user}}),
    ),
    //Estado reset
    on( actions.unsetUser, 
        state => ({...state, user: null}))
);

export function authReducer(state, action){
    return _authReducer(state, action)
}

