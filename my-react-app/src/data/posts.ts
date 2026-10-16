export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Мій перший пост",
    content: "Привіт! Це мій форум на React і TypeScript.",
    author: "Kirill",
    category: "Загальне",
  },
  {
    id: 2,
    title: "Вивчаю React",
    content: "Сьогодні вивчаю компоненти та передачу даних через props.",
    author: "Alex",
    category: "React",
  },
  {
    id: 3,
    title: "Знайомство з TypeScript",
    content: "Вчуся описувати типи для об’єктів і компонентів.",
    author: "Maria",
    category: "TypeScript",
  },
  {
    id: 4,
    title: "Робота з Prisma",
    content: "Додав роботу з базою даних у свій backend-проєкт.",
    author: "Kirill",
    category: "Backend",
  },
  {
    id: 5,
    title: "Ідеї для проєктів",
    content: "Який невеликий проєкт порадите створити для практики?",
    author: "Danylo",
    category: "Обговорення",
  },
];