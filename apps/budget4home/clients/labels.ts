import { Label } from '@budget4home/base';
import { B4hRoutes } from '../util/routes';
import { BaseClient } from './base';

export class LabelClient extends BaseClient {
  private static url = B4hRoutes.api + B4hRoutes.labels;

  static add = async (token: string, label: Partial<Label>) => {
    return await this.fetch<Label>(this.url, token, 'POST', label);
  };

  static edit = async (token: string, label: Partial<Label>) => {
    return this.fetch<Label>(this.url, token, 'PUT', label);
  };

  static delete = async (token: string, label: Partial<Label>) => {
    return await this.fetch<void>(this.url, token, 'DELETE', label);
  };
}
