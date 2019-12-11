import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageUtilService {

  constructor() { }

  set(key: string, value: string) {
    console.log(`Set key ${key}`);
    localStorage.setItem(key, value);
  }
  get(key: string) {
    return localStorage.getItem(key);
  }

  async remove(key: string) {
    console.log(`Remove key ${key}`);
    await localStorage.removeItem(key);
  }
  clearProperties() {
    console.log('Clear Properties');
    localStorage.clear();
  }
}
