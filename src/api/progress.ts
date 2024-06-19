// pages/api/progress.ts

import type { NextApiRequest, NextApiResponse } from 'next';

interface ProgressResponse {
  progress: number;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProgressResponse>
) {
  // 실제 데이터는 DB에서 가져오거나 다른 방법으로 구현
  const progress = 50; // 예시로 50% 진행도를 반환합니다.
  res.status(200).json({ progress });
}
