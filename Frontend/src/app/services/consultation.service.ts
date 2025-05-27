import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from '../models/consultation.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private apiUrl = '/api'; // Game service API

  constructor(private http: HttpClient) { }

  // Record a new game consultation
  recordConsultation(gameName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/games/consultations?gameName=${gameName}`, {});
  }

}