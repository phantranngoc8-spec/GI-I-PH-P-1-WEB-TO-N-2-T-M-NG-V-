import { StageInfo } from '../types/math';

export const ALL_STAGES: StageInfo[] = [
  {
    id: 1,
    name: 'Chặng 1: Khởi động',
    topic: 'Đếm và tạo thành 10',
    status: 'not_started',
    total: 10,
    description: 'Ôn tập đếm nhanh, cấu tạo số và kỹ thuật gộp thành 10.',
  },
  {
    id: 2,
    name: 'Chặng 2: Khám phá',
    topic: 'Phép cộng có nhớ trong phạm vi 20',
    status: 'not_started',
    total: 10,
    description: 'Luyện tập kỹ thuật làm tròn 10 rồi cộng tiếp (9 + ?, 8 + ?, 7 + ?).',
  },
  {
    id: 3,
    name: 'Chặng 3: Luyện tập',
    topic: 'Phép trừ có nhớ trong phạm vi 20',
    status: 'not_started',
    total: 10,
    description: 'Thực hành trừ qua 10 (bớt về 10 rồi trừ tiếp hoặc lấy 10 trừ đi).',
  },
  {
    id: 4,
    name: 'Chặng 4: Vận dụng',
    topic: 'Giải quyết tình huống gần gũi (Phép cộng, phép trừ)',
    status: 'in_progress',
    total: 10,
    description: 'Vận dụng 3 bước: Chọn phép tính, Tính đáp số, Giải thích lý do.',
  },
];
