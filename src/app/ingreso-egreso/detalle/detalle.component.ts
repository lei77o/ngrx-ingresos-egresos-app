import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { switchAll } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubs: Subscription;

  constructor( private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    //Visualizar los items
    this.store.select('ingresosEgresos').subscribe( ({items}) => {
      
      this.ingresosEgresos = items;

    })
  }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
  }
  borrar( uid : string){
    this.ingresoEgresoService.borrarIngresoEgreso( uid )
    .then ( () => Swal.fire('Borrado', 'Item Borrado' , 'success'))
    .catch( err => Swal.fire('Error', err.message, 'error'));
  }

}
