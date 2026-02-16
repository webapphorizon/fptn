# fptn

Лендинг на Next.js 15 с мультиязычностью (next-intl).

## Требования

- Node.js 20+
- npm

## Как запустить

### 1. Установка зависимостей

```bash
npm install
```

### 2. Переменные окружения (опционально)

Файл `.env` не обязателен для локального запуска. Если нужен свой базовый URL для sitemap/robots:

```bash
cp .env.example .env
# Отредактируйте .env при необходимости (NEXT_PUBLIC_BASE_URL и т.д.)
```

Для сборки без валидации env (например, в Docker):

```bash
SKIP_ENV_VALIDATION=1 npm run build
```

### 3. Режим разработки

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000). Поддерживаются локали: en, ru, es, de, fr, it, pt, cn, jp, kr.

### 4. Продакшен-сборка и запуск

```bash
npm run build
npm run start
```

Либо одной командой (сборка + старт):

```bash
npm run preview
```

## Полезные команды

| Команда           | Описание                          |
|-------------------|-----------------------------------|
| `npm run dev`     | Сервер разработки с hot reload   |
| `npm run build`   | Продакшен-сборка                 |
| `npm run start`   | Запуск собранного приложения     |
| `npm run lint`    | Проверка ESLint                  |
| `npm run typecheck` | Проверка типов TypeScript      |
| `npm run check`   | lint + typecheck                 |
