import { Component } from '@angular/core';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent {
  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textoIncorreccto: string;

  constructor(private _PresupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textoIncorreccto = '';
  }

  agregarGasto() {
    if (this.cantidad > this._PresupuestoService.restante) {
      this.textoIncorreccto = 'Cantidad ingresada es mayor al restante';
      this.formularioIncorrecto = true;
      return;
    }

    if (this.nombreGasto === '' || this.cantidad <= 0) {
      this.textoIncorreccto = 'Nombre gasto o cantidad incorrecta';
      this.formularioIncorrecto = true;
    } else {
      //Creamos el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }
      //Enviamos el objeto a los suscriptores via sibject
      this._PresupuestoService.agregarGasto(GASTO);

      //Reseteamos formulario
      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
      this.textoIncorreccto = 'Nombre gasto o cantidad incorrecta';
    }
  }
}
