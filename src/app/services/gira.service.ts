import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { Gira, GirasResponse } from '../models/gira.model';

@Injectable({ providedIn: 'root' })
export class GiraService {
  private readonly baseUrl = environment.apiBase;

  constructor(private readonly http: HttpClient) {}

  /** Giras públicas do mês corrente, segundo a própria API. */
  getMesAtual(): Observable<Gira[]> {
    return this.http
      .get<GirasResponse>(`${this.baseUrl}/mes-atual`)
      .pipe(map((res) => res.data ?? []));
  }

  /** Giras públicas de um mês específico (1 a 12). */
  getPorMes(mes: number): Observable<Gira[]> {
    return this.http
      .get<GirasResponse>(`${this.baseUrl}/mes/${mes}`)
      .pipe(map((res) => res.data ?? []));
  }
}
