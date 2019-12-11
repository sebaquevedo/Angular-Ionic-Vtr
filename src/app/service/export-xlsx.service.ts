import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { BehaviorSubject } from 'rxjs';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root',
})
export class ExportXLSXService {
  limit: number = 1;
  currentLimit = new BehaviorSubject(this.limit);
  constructor() { }
  generateXSLX(data) {
    return new Promise((resolve, reject) => {
      try {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer);
        return resolve(true);
      } catch (error) {
        return reject(false);
      }
    });

  }
  saveAsExcelFile(buffer: any): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, `ReportesReset_${new  Date().getTime()}${EXCEL_EXTENSION}`);
  }
  setCurrentLimit(limit: number) {
    this.currentLimit.next(limit);
  }
}
