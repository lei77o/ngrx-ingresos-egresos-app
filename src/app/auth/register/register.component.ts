import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { switchAll } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

import * as ui from '../../shared/ui.actions'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  cargando: boolean = false;
  uiSubscription: Subscription;

  constructor(  private fb: FormBuilder,
                private authService: AuthService,
                private store: Store<AppState>,
                private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required ],
      email: ['', Validators.required, Validators.email ],
      password: ['', Validators.required ],

    })

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);

  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();    
  }


  crearUsuario() {

    if ( this.registerForm.invalid ) { return; }
    
    /*Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });*/
    
    this.store.dispatch(ui.isLoading());

    const { nombre, email, password } = this.registerForm.value;

    this.authService.crearUsuario( nombre, email, password )
      .then( credenciales => {
        console.log(credenciales);
        this.store.dispatch(ui.stopLoading());

        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}
