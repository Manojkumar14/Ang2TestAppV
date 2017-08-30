import { Injectable } from '@angular/core';

import { GLOBALSEARCHMENU, LOCATION, REFERENCEBOOLDATA } from '../services/mockDb';

@Injectable()
export class MockService {

  constructor() { }

  getGlobalMenu() {
    return GLOBALSEARCHMENU;
  }
  getLocation() {
    return LOCATION;
  }
  getRefBoolData() {
    return REFERENCEBOOLDATA;
  }
}
