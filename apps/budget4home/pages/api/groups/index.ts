import { ExpenseType, Group, Label } from '@budget4home/base';
import { addDays, startOfMonth } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next/types';

import { firebaseAdminAuth } from '../../../util/firebaseAdmin';
import { expenseRepository, groupRepository, labelRepository } from '../../../util/repositories';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const group = req.body as Group;
  const seed = req.body.seed;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  let response: Group = null;

  try {
    if (req.method === 'POST') {
      response = await groupRepository.add(uid, group);
      if (seed) {
        const groupId = response.id;
        const pubLabel = await labelRepository.add(uid, groupId, { name: 'pub', icon: '🍺' });
        const entertainmentLabel = await labelRepository.add(uid, groupId, {
          name: 'entertainment',
          icon: '🙂'
        });
        await labelRepository.add(uid, groupId, { name: 'investment', icon: '📈' });
        await labelRepository.add(uid, groupId, { name: 'trip', icon: '✈️' });
        await labelRepository.add(uid, groupId, { name: 'health', icon: '💊' });
        await labelRepository.add(uid, groupId, { name: 'education', icon: '🎒' });
        await labelRepository.add(uid, groupId, { name: 'games', icon: '🎮' });
        const homeLabel = await labelRepository.add(uid, groupId, { name: 'home', icon: '🏠' });
        await labelRepository.add(uid, groupId, { name: 'clothes', icon: '👕' });
        await labelRepository.add(uid, groupId, { name: 'apps and gadgets', icon: '🤳' });
        await labelRepository.add(uid, groupId, { name: 'general', icon: '🤷' });
        const eatingOutLabel = await labelRepository.add(uid, groupId, {
          name: 'eating out',
          icon: '🍽️'
        });
        await labelRepository.add(uid, groupId, { name: 'transportation', icon: '🚃' });
        await labelRepository.add(uid, groupId, { name: 'car', icon: '🚗' });
        const salaryLabel = await labelRepository.add(uid, groupId, { name: 'salary', icon: '💰' });
        const marketLabel = await labelRepository.add(uid, groupId, { name: 'market', icon: '🛒' });

        await expenseRepository.add(uid, groupId, {
          name: 'salary',
          date: startOfMonth(new Date()).toISOString(),
          type: ExpenseType.incoming,
          value: 100005,
          label: { id: salaryLabel.id } as Label
        });
        await expenseRepository.add(uid, groupId, {
          name: 'rent',
          date: startOfMonth(new Date()).toISOString(),
          type: ExpenseType.outcoming,
          value: 20000,
          label: { id: homeLabel.id } as Label
        });
        await expenseRepository.add(uid, groupId, {
          name: 'supermarket X',
          date: new Date().toISOString(),
          type: ExpenseType.outcoming,
          value: 2077,
          label: { id: marketLabel.id } as Label
        });
        await expenseRepository.add(uid, groupId, {
          name: 'restaurant Y',
          date: new Date().toISOString(),
          type: ExpenseType.outcoming,
          value: 1545,
          label: { id: eatingOutLabel.id } as Label
        });
        await expenseRepository.add(uid, groupId, {
          name: 'pub Z',
          date: addDays(new Date(), -1).toISOString(),
          type: ExpenseType.outcoming,
          value: 500,
          label: { id: pubLabel.id } as Label
        });
        await expenseRepository.add(uid, groupId, {
          name: 'cinema H',
          date: addDays(new Date(), -1).toISOString(),
          type: ExpenseType.outcoming,
          value: 2599,
          label: { id: entertainmentLabel.id } as Label
        });
      }
    } else if (req.method === 'PUT') {
      response = await groupRepository.edit(uid, group);
    } else if (req.method === 'DELETE') {
      await groupRepository.delete(uid, group.id);
    } else {
      return res.status(404).end();
    }

    response && res.send(response);
    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
