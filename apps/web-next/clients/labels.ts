import { Label } from '@budget4home/base';
import { B4hRoutes } from '../util/routes';
import { BaseClient } from './base';

export class LabelClient extends BaseClient {
  static add = async (token: string, groupId: string, label: Partial<Label>) => {
    return await this.fetch<Label>(
      `${B4hRoutes.api}${B4hRoutes.groups}/${groupId}${B4hRoutes.labels}`,
      token,
      'POST',
      label
    );
  };

  static edit = async (token: string, groupId: string, label: Partial<Label>) => {
    return await this.fetch<Label>(
      `${B4hRoutes.api}${B4hRoutes.groups}/${groupId}${B4hRoutes.labels}`,
      token,
      'PUT',
      label
    );
  };

  static delete = async (token: string, groupId: string, label: Partial<Label>) => {
    return await this.fetch<void>(
      `${B4hRoutes.api}${B4hRoutes.groups}/${groupId}${B4hRoutes.labels}`,
      token,
      'DELETE',
      label
    );
  };
}
