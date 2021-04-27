import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Crisis } from '../models/crisis';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisCenterService {

  private crisisUrl = 'api/crisis';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getAllCrisis(): Observable<Crisis[]> {
    return this.http.get<Crisis[]>(this.crisisUrl)
      .pipe(
        tap(_ => this.log('fetched Crisis')),
        catchError(this.handleError<Crisis[]>('getAllCrisis', []))
      );
  }

  getCrisis(id: number): Observable<Crisis> {
    const url = `${this.crisisUrl}/${id}`;
    return this.http.get<Crisis>(url)
      .pipe(
        tap(_ => this.log(`fetched Crisis id=${id}`)),
        catchError(this.handleError<Crisis>(`getCrisis id=${id}`))
      );
  }

  updateCrisis(Crisis: Crisis): Observable<any> {
    return this.http.put(this.crisisUrl, Crisis, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated Crisis id=${Crisis.id}`)),
        catchError(this.handleError<any>('updateCrisis'))
      );
  }

  addCrisis(Crisis: Crisis): Observable<Crisis> {
    return this.http.post<Crisis>(this.crisisUrl, Crisis, this.httpOptions)
      .pipe(
        tap((newCrisis: Crisis) => this.log(`added Crisis id=${newCrisis.id}`)),
        catchError(this.handleError<Crisis>('addCrisis'))
      );
  }

  deleteCrisis(id: number): Observable<Crisis> {
    const url = `${this.crisisUrl}/${id}`;
    return this.http.delete<Crisis>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Crisis id=${id}`)),
      catchError(this.handleError<Crisis>('deleteCrisis'))
    )
  }


  private log(message: string) {
    this.messageService.add(CrisisCenterService.name + ` - ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
