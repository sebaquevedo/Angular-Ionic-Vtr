import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ResponseResetDto } from '../../../api/model/responseResetDto';
import { ResetDto } from '../../../api/model/resetDto';
import { ResetService } from '../../../api/api/reset.service';
import { ExportXLSXService } from '../../service/export-xlsx.service';
import { UiService } from '../../service/ui.service';
import { MatTableDataSource } from '@angular/material/table';
import { ResetRequestDto } from '../../../api/model/resetRequestDto';
@Component({
  selector: 'ngx-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  formFilter: FormGroup;
  optionsTypes = [
    'TODOS',
    'PREM',
    '2WAY',
  ];
  optionsEstados = [
    'Todos',
    'Proceso',
    'Exitoso',
    'Error',
    'Sin información',
  ];
  pageEvent: PageEvent;
  limitSuscribe: Subscription;
  username: string;
  tipo: string;
  fecha: any;
  idVivienda: number;
  responseReset: ResponseResetDto;
  dataReset: Array<ResetDto>;
  totalRegistry: number;
  currentLimit: number;
  limit = 5;
  requestReset: ResetRequestDto = {
    limit: 5,
    page: 1,
    from: 0,
    to: 0,
    user: '',
    tipo: undefined,
    estado: undefined,
  };
  columns = {
    rutTecnico: {
      title: 'Rut Tecnico',
      type: 'string',
      filter: false,
    },
    rutCliente: {
      title: 'Rut Cliente',
      type: 'string',
      filter: false,
    },
    username: {
      title: 'Username',
      type: 'string',
      filter: false,
    },
    idVivienda: {
      title: 'Id Vivienda',
      type: 'number',
      filter: false,
    },
    idDispositivo: {
      title: 'Id Dispositivo',
      type: 'number',
      filter: false,
    },
    tipo: {
      title: 'Tipo',
      type: 'string',
      filter: false,
    },
    inicio: {
      title: 'Inicio',
      type: 'string',
      filter: false,
    },
    fin: {
      title: 'Fin',
      type: 'string',
      filter: false,
    },
    respuesta: {
      title: 'Respuesta',
      type: 'object',
      filter: false,
    },
  };
  columnsTable = [
    {
      title: 'Rut Tecnico',
      key: 'rutTecnico',
    },
    {
      title: 'Rut Cliente',
      key: 'rutCliente',
    },
    {
      title: 'Username',
      key: 'username',
    },
    {
      title: 'Id Vivienda',
      key: 'idVivienda',
    },
    {
      title: 'Id Dispositivo',
      key: 'idDispositivo',
    },
    {
      title: 'Tipo',
      key: 'tipo',
    },
    {
      title: 'Inicio',
      key: 'inicio',
    },
    {
      title: 'Fin',
      key: 'fin',
    },
    {
      title: 'Código Respuesta',
      key: 'codigo',
    },
    {
      title: 'Mensaje Respuesta',
      key: 'mensaje',
    },
  ];
  settings = {
    actions: false,
    columns: this.columns,
    pager: {
      page: 5,
      perPage: 5,
      display: true,
    },
  };
  displayedColumns = this.columnsTable.map(column => column.key);
  dataSource = new MatTableDataSource<ResetDto>(this.dataReset);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(
    public resetService: ResetService,
    public formBuilder: FormBuilder,
    public exportXLSXService: ExportXLSXService,
    public uiService: UiService,
  ) { }

  async ngOnInit() {
    try {
      this.formFilter = this.formBuilder.group({
        fecha: [''],
        username: [''],
        tipo: [''],
        estado: [''],
      });
      this.responseReset = await this.resetService.resetPost(this.requestReset).toPromise();
      this.dataReset = this.responseReset.reset;
      this.totalRegistry = this.responseReset.total;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.dataReset;
      this.limitSuscribe = this.exportXLSXService.currentLimit.subscribe(limit => this.currentLimit = limit);
    } catch (error) {
      console.log(error);
    }
  }

  async filter(event?: PageEvent, form?: FormGroup, service?: ResetService) {
    let page = 1;
    let from = 0;
    let to = 0;
    let estado: string;
    let tipo: string;
    // condicion que evalua si ha hecho cambio de pagina. De existir el PageEvent 'event' es por que cambio de pagina.
    if (event) {
      page += event.pageIndex;
      this.currentLimit = event.pageSize;
      this.exportXLSXService.setCurrentLimit(event.pageSize);
      if (form.value.fecha && form.value.fecha !== '') {
        from = new Date(form.value.fecha.start).getTime();
        to = new Date(form.value.fecha.end).getTime();
      }
      estado = form.value.estado === 'Todos' ? undefined : form.value.estado;
      tipo = form.value.tipo === 'TODOS' ? undefined : form.value.tipo;
    } else {
      from = this.formFilter.value.fecha ? new Date(this.formFilter.value.fecha.start).getTime() : 0;
      to = this.formFilter.value.fecha ? new Date(this.formFilter.value.fecha.end).getTime() : 0;
      estado = this.formFilter.value.estado === 'Todos' ? undefined : this.formFilter.value.estado;
      tipo = this.formFilter.value.tipo === 'TODOS' ? undefined : this.formFilter.value.tipo;
    }
    this.requestReset = {
      limit: this.currentLimit,
      page,
      from: from ? from : 0,
      to: to ? to : 0,
      user: this.formFilter.value.username,
      tipo,
      estado,
    };
    console.log('this.requestReset', this.requestReset);
    try {
      if (!service) {
        this.responseReset = await this.resetService.resetPost(this.requestReset).toPromise();
      } else {
        this.responseReset = await service.resetPost(this.requestReset).toPromise();
      }
      this.dataReset = this.responseReset.reset;
      this.dataSource.data = this.dataReset;
      this.totalRegistry = this.responseReset.total;
    } catch (error) {
      console.log('error: ', error);
    }
  }
  async exportXSLX() {
    try {
      this.requestReset.limit = this.totalRegistry;
      this.requestReset.page = 1;
      const data = await this.resetService.resetPost(this.requestReset).toPromise();
      if (data.total > 0) {
        await this.exportXLSXService.generateXSLX(this.mapToExcel(data.reset));
      }
    } catch (error) {
      console.log(error);
      this.uiService.presentAlert({
        title: 'Error',
        text: 'No ha sido posible generar excel.',
        buttonText: 'Cerrar',
      });
    }
  }

  mapToExcel(data) {
    try {
      data = data.map(reset => {
        return {
          'Rut Cliente': reset.rutCliente,
          'Rut Tecnico': reset.rutTecnico,
          'Username': reset.username,
          'Id Vivienda': reset.idVivienda,
          'Id Dispositivo': reset.idDispositivo,
          'Inicio Proceso': reset.inicio,
          'Fin Proceso': reset.fin,
          'Mensaje Respuesta': reset.respuesta.mensaje,
          'Mensaje Codigo': reset.respuesta.codigo,
        };
      });
    } catch (error) {
      console.log(error);
    }
    return data;
  }

}
