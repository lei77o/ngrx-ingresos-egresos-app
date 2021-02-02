import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { switchAll } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(  private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) { }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      nombre: ['', Validators.required ],
      email: ['', Validators.required, Validators.email ],
      password: ['', Validators.required ],

    })

  }


  crearUsuario() {

    if ( this.registerForm.invalid ) { return; }
    
    Swal.fire({
      title: 'Espere por favor',
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });


    const { nombre, email, password } = this.registerForm.value;

    this.authService.crearUsuario( nombre, email, password )
      .then( credenciales => {
        console.log(credenciales);

        Swal.close();

        this.router.navigate(['/']);
      })
      .catch( err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

}
