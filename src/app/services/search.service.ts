// search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchSource = new BehaviorSubject<string>('');
  currentSearch = this.searchSource.asObservable();

  updateSearch(query: string) {
    console.log('Servicio recibió:', query); // Debug 2
    this.searchSource.next(query.trim().toLowerCase());
  }
}