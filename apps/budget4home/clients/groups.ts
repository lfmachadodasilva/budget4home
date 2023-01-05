import { Group } from '@budget4home/base';
import { B4hRoutes } from '../util/routes';
import { BaseClient } from './base';

export class GroupClient extends BaseClient {
  private static url = B4hRoutes.api + B4hRoutes.groups;

  static add = async (token: string, group: Partial<Group>) => {
    return await this.fetch<Group>(this.url, token, 'POST', group);
  };

  static edit = async (token: string, group: Partial<Group>) => {
    return await this.fetch<Group>(this.url, token, 'PUT', group);
  };

  static delete = async (token: string, group: Partial<Group>) => {
    return await this.fetch<void>(this.url, token, 'DELETE', group);
  };
}
