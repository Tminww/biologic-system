# Стратегия документации LIMS

## Принципы

- Документация хранится в **отдельном репозитории** `lims-docs`
- Всё описывается **as-code** — никаких ручных обновлений в GUI-инструментах
- Единая точка входа — **один сайт на Zudoku**
- Документация обновляется автоматически через **CI/CD**
- **PostgreSQL** — источник истины для схемы БД (автогенерация через `pg_schema_to_dbml`)
- **FastAPI** — источник истины для OpenAPI (автогенерация через `GET /openapi.json`)

---

## Два репозитория

```
lims/                        # Основной репо (код)
├── src/
├── openapi/
│   └── lims.yaml            # OpenAPI спецификация
└── migrations/              # Миграции БД (источник истины)

lims-docs/                        # Репо документации
├── zudoku.config.ts
├── components/
│   └── ERDDiagram.tsx            # React Flow ERD компонент
├── likec4/
│   └── architecture.c4           # Архитектура системы (LikeC4)
├── schema/
│   ├── schema.dbml               # Автогенерация из PG в CI (не редактировать)
│   ├── schema.summary.md         # Краткое описание таблиц (пишется вручную)
│   └── schema.semantic.md        # Инварианты и доменные правила (пишется вручную)
├── openapi/
│   └── lims.yaml                 # Автогенерация из FastAPI в CI (не редактировать)
│
├── guides/                       # 👤 Клиенты / конечные пользователи
│   ├── laborant.mdx
│   ├── manager.mdx
│   └── admin.mdx
│
├── api-reference/                # 🔌 API — нативный рендер OpenAPI в Zudoku
│   └── index.mdx
│
├── architecture/                 # 🏗️ Архитектура — LikeC4 компоненты в MDX
│   ├── overview.mdx              # Обзор системы (бэк + фронт)
│   ├── backend.mdx               # Архитектура бэкенда
│   ├── frontend.mdx              # Архитектура фронтенда
│   └── usecases.mdx              # Use cases
│
├── erd/                          # 🗄️ ERD — React Flow playground
│   └── index.mdx                 # Все домены, интерактивно
│
└── developer/                          # 🛠️ Для разработчика и LLM
    ├── README.md                 # Как читать эту секцию
    ├── backend/
    │   ├── dto.md                # DTO бэкенда по модулям
    │   └── models.md             # Pydantic-модели и их назначение
    ├── frontend/
    │   ├── dto.md                # TypeScript-типы и интерфейсы
    │   └── state.md              # Модели состояния (store, context)
    └── database/
        ├── samples.md            # Детальное описание домена Образцы
        ├── tests.md              # Детальное описание домена Тесты
        ├── results.md            # Детальное описание домена Результаты
        └── users.md              # Детальное описание домена Пользователи
```

---

## Источники истины и синхронизация

Оба источника — живые системы. Оба обновляются скриптом в CI. Никакой ручной работы.

### OpenAPI — FastAPI как источник истины

FastAPI генерирует спецификацию автоматически. CI поднимает приложение и скачивает её:

```yaml
# .github/workflows/docs.yml
steps:
  - name: Start FastAPI
    run: |
      pip install -r requirements.txt
      uvicorn app.main:app --host 0.0.0.0 --port 8000 &
      sleep 3

  - name: Fetch OpenAPI spec
    run: |
      curl -f http://localhost:8000/openapi.json | \
  python3 -c "import sys, json, yaml; print(yaml.dump(json.load(sys.stdin), allow_unicode=True, sort_keys=False))" \
  > openapi/lims.yaml

  - name: Build Zudoku
    run: npm run build
```

Файл `openapi/lims.yaml` **не редактируется вручную** — перезаписывается при каждой сборке.

### Схема БД — PostgreSQL как источник истины

`schema.dbml` генерируется прямо из живой PostgreSQL при каждой сборке через **`@dbml/connector`** (официальный JS/TS пакет от авторов DBML):

```ts
// scripts/generate-schema.ts
import { connector } from '@dbml/connector'
import { importer } from '@dbml/core'
import { writeFileSync } from 'fs'

const schemaJson = await connector.fetchSchemaJson(process.env.DATABASE_URL, 'postgres')
const dbml = importer.generateDbml(schemaJson)

writeFileSync('./schema/schema.dbml', dbml)
console.log('schema.dbml updated')
```

```bash
npx tsx scripts/generate-schema.ts
```

Файл `schema/schema.dbml` **не редактируется вручную** — перезаписывается при каждой сборке.

---

## Стек инструментов

| Слой | Инструмент | Формат | Где отображается |
|---|---|---|---|
| API-документация | OpenAPI + Zudoku | `.yaml` (из FastAPI `/openapi.json`) | Zudoku нативно |
| Пользовательская документация | Zudoku (MDX) | `.mdx` | Zudoku нативно |
| Требования (SRS) | Markdown/MDX | `.mdx` | Zudoku нативно |
| Архитектура (C4) | LikeC4 | `.c4` | React-компонент в MDX |
| Схема БД — структура | `@dbml/connector` (автогенерация из PG) | `.dbml` | React Flow ERD в MDX |
| Схема БД — описание | Markdown (пишется вручную) | `.md` | Zudoku + LLM-контекст |
| Версионирование | Git | — | — |

---

## Блок 1 — Требования (SRS)

**Файл:** `requirements/srs.mdx`

Разделы:

1. Цель и контекст системы
2. Роли пользователей — лаборант, руководитель, администратор
3. Функциональные требования по модулям:
   - Управление образцами
   - Управление тестами и методиками
   - Ввод и хранение результатов
   - Отчёты и журналы
   - Управление пользователями
4. Нефункциональные требования — производительность, безопасность, доступность
5. Ограничения и допущения

---

## Блок 2 — Архитектура и дизайн

### 2.1 Архитектурные диаграммы — LikeC4

**Файл:** `likec4/architecture.c4`

Встраивается в MDX нативно:

```mdx
import { LikeC4View, LikeC4ModelProvider } from '@likec4/diagram/bundle'
import model from '../../likec4/architecture.c4'

<LikeC4ModelProvider model={model}>
  <LikeC4View viewId="SystemContext" />
</LikeC4ModelProvider>
```

### 2.2 Схема БД — PostgreSQL как источник истины

**DBML не пишется руками.** PostgreSQL — источник истины. При каждом деплое CI автоматически интроспектирует живую БД и генерирует `schema.dbml`:

```bash
python pg_schema_to_dbml.py \
  --dsn "postgresql://user@localhost:5432/lims" \
  --schema public \
  --out schema/schema.dbml
```

Из `schema.dbml` строится React Flow ERD в Zudoku. 25 таблиц разбиты на 5 доменов, каждый — отдельная страница:

| Домен | Страница |
|---|---|
| Обзор | `database/overview.mdx` |
| Образцы | `database/samples.mdx` |
| Тесты | `database/tests.mdx` |
| Результаты | `database/results.mdx` |
| Пользователи | `database/users.mdx` |

Встраивается в MDX:

```mdx
import { ERDDiagram } from '../../components/ERDDiagram'
import schema from '../../schema/schema.json'

<ERDDiagram domain="samples" schema={schema} />
```

### 2.3 Описание модели для LLM — три файла

Рядом с автогенерируемым `schema.dbml` хранятся два файла которые пишутся вручную один раз и дополняются по мере роста:

```
schema/
├── schema.dbml          ← автогенерация из PG (не редактировать руками)
├── schema.summary.md    ← краткое описание каждой таблицы
└── schema.semantic.md   ← инварианты, жизненные циклы, доменные правила
```

**schema.summary.md** — что такое каждая таблица:

```markdown
## sample
Физический образец поступивший в лабораторию.
Жизненный цикл: `pending` → `in_progress` → `completed` | `rejected`
При rejected — все связанные тесты автоматически отменяются.

## result
Результат выполненного теста. Неизменен после записи (append-only).
```

**schema.semantic.md** — правила и инварианты:

```markdown
## Инварианты
- Штрихкод образца (sample.barcode) генерируется автоматически и неизменен
- Результат (result) нельзя редактировать — только создавать новый
- Пользователь без роли lab_manager не может менять статус теста на approved

## Связи между доменами
- Results зависит от Tests, Tests зависит от Samples
- Users пронизывает все домены через created_by / assigned_to
```

Когда даёшь LLM задачу — добавляешь все три файла в контекст. Никакого билда.

---

## Секции документации

### 👤 guides/ — Руководства для клиентов

Чистый MDX, нативный рендер Zudoku. Никаких React-компонентов.

| Файл | Аудитория | Содержание |
|---|---|---|
| `laborant.mdx` | Лаборант | Вход, регистрация образца, ввод результатов, ошибки |
| `manager.mdx` | Руководитель | Дашборд, задания, экспорт отчётов |
| `admin.mdx` | Администратор | Пользователи, роли, методики, бэкап |

Дополнительно в само приложение встраивается **интерактивный онбординг** через **Shepherd.js** — отдельный инструмент, не часть документации:

```ts
// frontend/src/tours/laborant.ts
import Shepherd from 'shepherd.js'

const tour = new Shepherd.Tour({ useModalOverlay: true })

tour.addStep({
  id: 'register-sample',
  text: 'Нажмите сюда чтобы зарегистрировать новый образец',
  attachTo: { element: '#btn-new-sample', on: 'bottom' },
  buttons: [{ text: 'Далее', action: tour.next }]
})
```

Отдельный тур для каждой роли. Запускается при первом входе или по кнопке "Показать тур".

---

### 🔌 api-reference/ — API документация

Нативный рендер OpenAPI спецификации через Zudoku. Источник — `openapi/lims.yaml`, генерируется из FastAPI автоматически.

```ts
// zudoku.config.ts
apis: [{
  type: 'file',
  input: './openapi/lims.yaml',
  navigationId: 'api',
}]
```

---

### 🏗️ architecture/ — Архитектура системы

LikeC4 компоненты встроены в MDX. Поддерживает drill-down внутрь элементов.

| Файл | Содержание |
|---|---|
| `overview.mdx` | Обзор всей системы — бэк, фронт, БД, интеграции |
| `backend.mdx` | Внутренняя архитектура FastAPI |
| `frontend.mdx` | Внутренняя архитектура фронтенда |
| `usecases.mdx` | Use cases на основе LikeC4 |

```mdx
import { LikeC4View, LikeC4ModelProvider } from '@likec4/diagram/bundle'
import model from '../../likec4/architecture.c4'

<LikeC4ModelProvider model={model}>
  <LikeC4View viewId="SystemContext" />
</LikeC4ModelProvider>
```

---

### 🗄️ erd/ — ERD playground

Один интерактивный React Flow компонент со всеми 25 таблицами. Переключение по доменам, drag & drop, зум.

```mdx
import { ERDDiagram } from '../components/ERDDiagram'
import schema from '../schema/schema.json'

<ERDDiagram schema={schema} />
```

---

### 🛠️ developer/ — Для разработчика и LLM

Эту директорию читают разработчики и LLM. Детальные текстовые описания без визуального рендеринга — просто Markdown.

```
developer/
├── README.md              # Как устроена секция, что где искать
├── backend/
│   ├── dto.md             # Все DTO бэкенда по модулям с описанием полей
│   └── models.md          # Pydantic-модели, валидация, назначение
├── frontend/
│   ├── dto.md             # TypeScript-типы и интерфейсы
│   └── state.md           # Модели состояния — store, context, локальный стейт
└── database/
    ├── samples.md         # Домен Образцы — таблицы, поля, правила, связи
    ├── tests.md           # Домен Тесты
    ├── results.md         # Домен Результаты
    └── users.md           # Домен Пользователи
```

Каждый файл содержит: назначение сущности, описание полей с бизнес-смыслом, жизненный цикл (если есть статусы), инварианты и ограничения, связи с другими сущностями.

LLM-контекст для задачи: `schema/schema.dbml` + `schema/schema.summary.md` + `schema/schema.semantic.md` + нужный файл из `developer/`.

---

## CI/CD пайплайн

```
lims (основной репо)
    │
    └── push → триггерит сборку lims-docs
                        │
lims-docs               ▼
    │           1. поднимает FastAPI → GET /openapi.json → конвертация → openapi/lims.yaml
    │           2. npx tsx scripts/generate-schema.ts → schema/schema.dbml
    │           3. конвертирует schema.dbml → schema.json для ERD
    │                   │
    └── push ───────────┴──→ сборка Zudoku → deploy → внутренний хостинг
```

---

## Порядок создания документов

```
Сейчас (старт разработки)
  └── requirements/srs.mdx
  └── likec4/architecture.c4
  └── openapi/lims.yaml (в основном репо)
  └── schema.summary.md       ← описание таблиц (пишется вручную)
  └── schema.semantic.md      ← инварианты (пишется вручную)

В процессе разработки
  └── schema.dbml             ← автогенерация из PG в CI (не руками)
  └── components/ERDDiagram.tsx
  └── database/*.mdx

Перед сдачей
  └── guides/laborant.mdx
  └── guides/manager.mdx
  └── guides/admin.mdx
```
