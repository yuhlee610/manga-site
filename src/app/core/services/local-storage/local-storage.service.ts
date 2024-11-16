import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: unknown) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    const data = localStorage.getItem(key);
    if (data == null) return null;

    return JSON.parse(data);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
