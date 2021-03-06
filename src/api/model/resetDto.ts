/**
 * Service Auth
 * API dashboard
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { StatusResetDto } from './statusResetDto';


export interface ResetDto {
    rutTecnico: string;
    rutCliente: string;
    username: string;
    idVivienda: number;
    idDispositivo: string;
    tipo: string;
    respuesta: StatusResetDto;
    inicio: string;
    fin: string;
    fechaTimeStamp: number;
}
