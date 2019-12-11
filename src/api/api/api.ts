export * from './auth.service';
import { AuthService } from './auth.service';
export * from './reset.service';
import { ResetService } from './reset.service';
export * from './sinMorador.service';
import { SinMoradorService } from './sinMorador.service';
export const APIS = [AuthService, ResetService, SinMoradorService];
