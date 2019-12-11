import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { ExportXLSXService } from '../../../service/export-xlsx.service';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() title: string;
  @Input() columns: object;
  @Input() dataSource: MatTableDataSource<any>;
  @Input() columnsTable: object[];
  @Input() displayedColumns: string[];
  @Input() formFilter: FormGroup;
  @Input() filter: Function;
  @Input() service: any;
  @Input() totalRegistry: number;
  constructor(
    public exportXLSXService: ExportXLSXService,
  ) {
  }
  ngOnInit() {
  }
}
