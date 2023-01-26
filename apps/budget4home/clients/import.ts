import { Label } from '@budget4home/base';
import { B4hRoutes } from '../util/routes';
import { BaseClient } from './base';

export class ImportClient extends BaseClient {
  private static url = B4hRoutes.api + B4hRoutes.import;

  static import = async (token: string, groupId: string, body: string) => {
    return await this.fetch<Label>(
      `${B4hRoutes.api}${B4hRoutes.groups}/${groupId}${B4hRoutes.import}`,
      token,
      'POST',
      body
    );
  };
}
