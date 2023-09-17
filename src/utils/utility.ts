import { v4 as uuid } from 'uuid';

export class Utility {
  generateUUID(): string {
    return uuid().replaceAll('-', '');
  }
}
