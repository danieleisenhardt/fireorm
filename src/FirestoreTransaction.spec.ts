import { expect } from 'chai';
const MockFirebase = require('mock-cloud-firestore');
import { Transaction } from '@google-cloud/firestore';

import { FirestoreTransaction } from './FirestoreTransaction';
import { BaseRepository } from './BaseRepository';
import { initialize } from '.';
import { Collection } from './Decorators';

describe('FirestoreTransaction', () => {
  beforeEach(() => {
    const firebase = new MockFirebase();
    const firestore = firebase.firestore();
    initialize(firestore);
  });

  describe('getRepository', () => {
    it('should return a valid repository<T>', async () => {
      @Collection()
      class Entity {
        id: string;
      }

      const innerTran = {} as Transaction;
      const tran = new FirestoreTransaction(innerTran);

      const bandRepository = tran.getRepository(Entity);
      expect(bandRepository).to.be.instanceOf(BaseRepository);
    });
  });
});
