import { BlockType, ItemType } from 'entities/Schedule/model/types';

const juneItems: ItemType[] = [{
  date: '29 июня—2 июля',
  title: 'Объединяй',
  tags: ['обмен опытом', 'идеи', 'лидеры сообществ']
}];
const julyItems: ItemType[] = [
  {
    date: '4 июля—7 июля',
    title: 'Помни',
    tags: ['патриотизм', 'история', 'любовь к родине']
  },
  {
    date: '8 июля—12 июля',
    title: 'Узнавай',
    tags: ['медиа', 'контент', 'новый форматы']
  },
  {
    date: '14 июля—17 июля',
    title: 'Достигай',
    tags: ['спорт', 'препятствия', 'новые высоты']
  },
  {
    date: '19 июля—22 июля',
    title: 'Управляй',
    tags: ['студенческое самоуправление', 'лидерский потенциал']
  },
  {
    date: '24 июля—27 июля',
    title: 'Развивайся',
    tags: ['карьера', 'ставить цели', 'развивать навыки']
  },
  {
    date: '29 июля—1 августа',
    title: 'Создавай',
    tags: ['творчество', 'вдохновение', 'нестандартное мышление']
  },
];
const augustItems: ItemType[] = [
  {
    date: '3 августа—6 августа',
    title: 'Помогай',
    tags: ['волонтёрство', 'добрые дела', 'неравнодушие']
  },
  {
    date: '8 августа—11 августа',
    title: 'Благодари',
    tags: ['духовность', 'любовь', 'традиции', 'ценности']
  },
  {
    date: '13 августа—15 августа',
    title: 'Улучшай',
    tags: ['новые знания', 'навыки', 'молодые специалисты']
  },
];

export const ScheduleConst: BlockType[] = [
  {
    month: 'июнь',
    color: 'orange',
    items: juneItems
  },
  {
    month: 'июль',
    color: 'cyan',
    items: julyItems
  },
  {
    month: 'август',
    color: 'purple',
    items: augustItems
  }
]