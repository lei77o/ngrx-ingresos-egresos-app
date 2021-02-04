import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

import { IngresoEgreso } from '../../models/ingreso-egreso.model';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalEgresos: number = 0;
  totalIngresos: number = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
    .subscribe(({ items })=> this.generarEstadisticas( items ))
  }

  generarEstadisticas( items : IngresoEgreso[]){  

    this.totalEgresos  = 0;
    this.totalIngresos = 0;
    this.ingresos = 0;
    this.egresos  = 0

    
      for (const item of items) {
          if(item.tipo === 'ingreso'){
          this.totalIngresos = item.monto;
          this.ingresos ++;
        }
        else {
          this.totalEgresos += item.monto;
          this.egresos ++;
        }
      }
  }


}
