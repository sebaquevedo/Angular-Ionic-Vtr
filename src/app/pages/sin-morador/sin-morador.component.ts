import { Component, OnInit, ViewChild } from '@angular/core';
import { SinMoradorService, ResponseSinMoradorDto, SinMoradorDto, RequestSinMoradorDto } from '../../../api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExportXLSXService } from '../../service/export-xlsx.service';
import { UiService } from '../../service/ui.service';
import { PageEvent, MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-sin-morador',
  templateUrl: './sin-morador.component.html',
  styleUrls: ['./sin-morador.component.scss'],
})
export class SinMoradorComponent implements OnInit {

  constructor(
    public sinMoradorService: SinMoradorService,
    public formBuilder: FormBuilder,
    public exportXLSXService: ExportXLSXService,
    public uiService: UiService,
  ) { }
  pageEvent: PageEvent;
  limitSuscribe: Subscription;
  username: string;
  eps: string;
  fecha: any;
  formFilter: FormGroup;
  responseSinMorador: ResponseSinMoradorDto;
  dataSinMorador: Array<SinMoradorDto>;
  totalRegistry: number;
  currentLimit = 5;
  requestSinMorador: RequestSinMoradorDto = {
    limit: 5,
    page: 1,
    from: 0,
    to: 0,
    user: '',
    eps: '',
  };
  columns = {
    empresa: {
      title: 'Empresa',
      type: 'string',
      filter: false,
    },
    nombreTecnico: {
      title: 'Nombre Tecnico',
      type: 'string',
      filter: false,
    },
    fecha: {
      title: 'Fecha',
      type: 'string',
      filter: false,
    },
    geoTecnicoLat: {
      title: 'Geo Tecnico Latitud',
      type: 'string',
      filter: false,
    },
    geoTecnicoLng: {
      title: 'Geo Tecnico Longitud',
      type: 'string',
      filter: false,
    },
    geoOtLat: {
      title: 'Geo Ot Latitud',
      type: 'string',
      filter: false,
    },
    geoOtLng: {
      title: 'Geo Tecnico Longitud',
      type: 'string',
      filter: false,
    },
    imagen: {
      title: 'Imagen',
      type: 'string',
      filter: false,
    },
    rutTecnico: {
      title: 'Rut Tecnico',
      type: 'string',
      filter: false,
    },
    numeroOrden: {
      title: 'Numero Orden',
      type: 'string',
      filter: false,
    },
  };

  columnsTable = [
    {
      title: 'Nombre Tecnico',
      key: 'nombreTecnico',
    },
    {
      title: 'Rut Tecnico',
      key: 'rutTecnico',
    },
    {
      title: 'N° OT',
      key: 'numeroOrden',
    },
    {
      title: 'Empresa',
      key: 'empresa',
    },
    {
      title: 'Fecha',
      key: 'fecha',
    },
    {
      title: 'Latitud Orden',
      key: 'geoOtLat',
    },
    {
      title: 'Longitud Orden',
      key: 'geoOtLng',
    },
    {
      title: 'Latitud Tecnico',
      key: 'geoTecnicoLat',
    },
    {
      title: 'Longitud Tecnico',
      key: 'geoTecnicoLng',
    },
    {
      title: 'Foto',
      key: 'imagen',
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
  dataSource = new MatTableDataSource<SinMoradorDto>(this.dataSinMorador);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  async ngOnInit() {
    try {
      this.formFilter = this.formBuilder.group({
        fecha: [''],
        user: [''],
        eps: [''],
      });
      this.responseSinMorador = await this.sinMoradorService.sinMoradorPost(this.requestSinMorador).toPromise();
      this.dataSinMorador = this.responseSinMorador.sinMorador;
      this.totalRegistry = this.responseSinMorador.total;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = this.dataSinMorador;
      this.limitSuscribe = this.exportXLSXService.currentLimit.subscribe(limit => this.currentLimit = limit);

    } catch (error) {
      console.log('Error: ', error);
    }
  }

  async filter(event?: PageEvent, form?: FormGroup, service?: SinMoradorService) {
    let page = 1;
    let from = 0;
    let to = 0;
    let eps: string;

    if (event) {
      page += event.pageIndex;
      this.currentLimit = event.pageSize;
      this.exportXLSXService.setCurrentLimit(event.pageSize);
      if (form.value.fecha && form.value.fecha !== '') {
        from = new Date(form.value.fecha.start).getTime();
        to = new Date(form.value.fecha.end).getTime();
      }
      eps = form.value.eps === 'Todos' ? undefined : form.value.eps;
    } else {
      from = this.formFilter.value.fecha ? new Date(this.formFilter.value.fecha.start).getTime() : 0;
      to = this.formFilter.value.fecha ? new Date(this.formFilter.value.fecha.end).getTime() : 0;
      eps = this.formFilter.value.eps === 'Todos' ? undefined : this.formFilter.value.eps;
    }
    this.requestSinMorador = {

      limit: this.currentLimit,
      page,
      from: from ? from : 0,
      to: to ? to : 0,
      user: this.formFilter.value.user,
      eps,
    };

    try {
      if (!service) {
        this.responseSinMorador = await this.sinMoradorService.sinMoradorPost(this.requestSinMorador).toPromise();
      } else {
        this.responseSinMorador = await service.sinMoradorPost(this.requestSinMorador).toPromise();
      }
      this.dataSinMorador = this.responseSinMorador.sinMorador;
      this.dataSource.data = this.dataSinMorador;
      this.totalRegistry = this.responseSinMorador.total;
    } catch (error) {
      console.log('Error : ', error);
    }
  }

  async exportXSLX() {
    try {
      this.requestSinMorador.limit = this.totalRegistry;
      this.requestSinMorador.page = 1;
      const data = await this.sinMoradorService.sinMoradorPost(this.requestSinMorador).toPromise();
      if (data.total > 0) {
        data.sinMorador = data.sinMorador.map(sinMorador => {
          delete sinMorador.imagen;
          return sinMorador;
        });
        await this.exportXLSXService.generateXSLX(this.mapToExcel(data.sinMorador));
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
      data = data.map(sinMorador => {
        return {
        'Nombre Tecnico' : sinMorador.nombreTecnico,
        'Rut Tecnico' : sinMorador.rutTecnico,
        'N° OT':  sinMorador.numeroOrden,
        'Empresa' : sinMorador.empresa,
        'Fecha' : sinMorador.fecha,
        'Latitud Orden': sinMorador.geoOtLat,
        'Longitud Orden': sinMorador.geoOtLng,
        'Latitud Tecnico': sinMorador.geoTecnicoLat,
        'Longitud Tecnico' : sinMorador.geoTecnicoLng,
         };
      });
    } catch (error) {
      console.log(error);
    }
    return data;
  }
}
