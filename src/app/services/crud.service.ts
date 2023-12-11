// src/app/services/crud.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges();
  }

  getItems(): Observable<Item[]> {
    return this.items;
  }

  addItem(item: Item): void {
    this.itemsCollection.add(item);
  }

  updateItem(id: string, item: Item): void {
    this.itemsCollection.doc(id).update(item);
  }

  deleteItem(id: string): void {
    this.itemsCollection.doc(id).delete();
  }
}

// crud.service.ts
export interface Item {
  id?: string; // Ajoutez cette ligne
  name: string;
  description: string;
  // Ajoutez d'autres propriétés selon vos besoins
}

