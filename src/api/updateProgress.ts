// pages/api/updateProgress.ts

import type { NextApiRequest, NextApiResponse } from 'next';

interface UpdateProgressRequest {
  newProgress: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { newProgress } = req.body as UpdateProgressRequest;

  try {
    // 여기서는 실제로는 데이터베이스나 다른 저장소에 진행도를 업데이트하는 로직을 구현합니다.
    // 여기서는 단순히 새로운 진행도 값을 반환하지만, 실제로는 데이터를 저장하고 적절한 응답을 보내야 합니다.
    res.status(200).json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ message: 'Failed to update progress' });
  }
}
