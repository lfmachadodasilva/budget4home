import { ref, uploadString } from 'firebase/storage';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { expensesToJson } from '../../util/expenses';
import { firebaseStorage } from '../../util/firebase';
import { expenseRepository, groupRepository, labelRepository } from '../../util/repositories';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' || req.headers['backup'] !== '787421ff-1e47-4e61-8289-12f25acc3a55') {
    res.status(401).end();
  }

  try {
    const groups = await groupRepository.getAll(null);
    for (let i = 0; i < groups.length; i++) {
      const groupId = groups[i].id;
      const userId = groups[i].userIds.at(0);

      const expensesPromise = expenseRepository.getAll(userId, groupId);
      const labelsPromise = labelRepository.getAll(userId, groupId);

      const [expenses, labels] = await Promise.all([expensesPromise, labelsPromise]);

      const json = expensesToJson(expenses, labels);

      const fileName = `budget4home/backup/${groupId}/${groupId}_${new Date().toISOString()}.json`;

      const storageRef = ref(firebaseStorage, fileName);
      uploadString(storageRef, json).then(snapshot => {
        console.info(`uploaded a backup for ${groupId}!`);
      });
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
