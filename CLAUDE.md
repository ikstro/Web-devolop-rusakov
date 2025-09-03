# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Russian web development course landing page ("Профессиональная Web-разработка") built with vanilla HTML, CSS, and JavaScript. The project uses a modular approach with organized file structure and follows modern web development practices.

## Project Requirements

1. **Adaptive Design**: Must be responsive down to 320px width
2. **HTML5 Validity**: All markup must be valid HTML5
3. **Interactive Elements**: Buttons and links must have hover effects
4. **File Organization**:
   - Images: `images/proweb/` (main) or `images/freeproweb/` (subscription version)
   - Styles: `styles/proweb/` (main) or `styles/freeproweb/` (subscription version)
   - JavaScript: `js/proweb.min.js` (main) or `js/freeproweb.min.js` (subscription)
   - Fonts: `styles/proweb/fonts/` or `styles/freeproweb/fonts/`
5. **Sticky Navigation**: Top navigation must always stay at the top of the screen
6. **Accordion Functionality**: "^" symbols in FAQ and program sections toggle content visibility (closed by default)
7. **Dual Block System**: Form and order button blocks are mutually exclusive - easy to hide/show either
8. **Variant System**: Two versions (proweb/freeproweb) with separate asset paths

## Architecture

### File Structure
```
project/
├── index.html                     # Main HTML file
├── styles/
│   ├── proweb/
│   │   ├── main.css              # Main styles with CSS imports
│   │   ├── media-queries.css     # Responsive breakpoints
│   │   ├── fonts/                # Font files
│   │   └── components/           # Component-specific styles
│   │       ├── accordion.css
│   │       ├── buttons.css
│   │       └── card.css
│   └── freeproweb/               # Alternative version styles
├── js/
│   ├── proweb.min.js            # Main JavaScript (ES6 modules)
│   ├── freeproweb.min.js        # Alternative version JS
│   ├── components/              # JavaScript components
│   └── utils/                   # Utility functions
├── images/
│   ├── proweb/                  # Main version images
│   ├── freeproweb/             # Subscription version images
│   ├── covers/                 # Course covers
│   ├── hero/                   # Hero section images
│   └── icons/                  # Icon assets
└── fonts/                      # Legacy font directory
```

### CSS Architecture
- **Design System**: Uses CSS custom properties (CSS variables) for consistent theming
- **Import Structure**: Main CSS file imports component stylesheets
- **Methodology**: Component-based organization with BEM-like naming
- **Color Scheme**: Indigo/violet primary colors (#4f46e5, #7c3aed)
- **Typography**: Inter font family with clamp() for responsive sizing
- **Responsive**: Mobile-first approach with breakpoints at 768px and 1024px

### Component Architecture Rules
- **🚨 СТРОГОЕ ПРАВИЛО**: Весь сайт строится исключительно на компонентах. Никаких стилей для UI элементов в main.css
- **Процедура добавления**: Новые компоненты добавляются только после согласования. Создается новый `.css` файл в `styles/proweb/components/`
- **Консистентность**: Все элементы одного типа должны использовать один компонент (все карточки = `.card`, все кнопки = `.btn`)
- **Модификаторы**: Используются БЭМ-подобные модификаторы (`.card--large`, `.btn--secondary`, `.card--author`)
- **CSS Variables**: Обязательное использование CSS custom properties для всех значений (цвета, размеры, тени)
- **Наследование**: Базовые компоненты + модификаторы, никаких переопределений в других файлах

### Bento Grid Layout System
- **Основной подход**: Используем bento-grid (неравномерная сетка) для современного, динамичного лейаута
- **CSS Grid Areas**: Именованные области сетки для четкой структуры и читаемости кода
- **Адаптивность**: Bento-grid трансформируется на мобильных устройствах (<768px) в линейную структуру
- **Базовый класс**: `.bento-grid` - основной контейнер для неравномерных сеток
- **Модификаторы**: `.bento-grid--2x2`, `.bento-grid--3x2`, `.bento-grid--asymmetric` для разных вариантов
- **Применение**: Секции с карточками, галереи, блоки контента, дашборды
- **Пример структуры**:
  ```css
  .bento-grid {
    display: grid;
    gap: 24px;
    grid-template-areas: 
      "large large small1"
      "large large small2"
      "wide wide small3";
  }
  ```

### JavaScript Architecture
- **ES6 Modules**: Modern module system
- **Component Structure**: Modular JavaScript components
- **Key Features**:
  - Countdown timer functionality
  - Accordion component for FAQ/program sections
  - Mobile menu toggle
  - Sticky navigation and action bars
  - Form handling

### Available Components

**UI Components** (в `styles/proweb/components/`):

1. **Cards** (`card.css`)
   - `.card` - базовая карточка с фиолетовыми тенями
   - `.card--white` - белый фон
   - `.card--gradient` - градиентный фон
   - `.card--large` - увеличенные тени
   - `.card--author` - специальный стиль для секции "Об авторе"
   - `.card--author-full` / `.card--author-half` - модификаторы размеров

2. **Buttons** (`buttons.css`)
   - `.btn` - базовая кнопка
   - `.btn--primary` - основная кнопка (фиолетовый градиент)
   - `.btn--secondary` - вторичная кнопка (прозрачная с обводкой)
   - `.btn--lg` - увеличенный размер

3. **Accordion** (`accordion.css`)
   - `.accordion` - контейнер аккордеона
   - `.accordion__item` - элемент аккордеона
   - `.accordion__header` - заголовок (кликабельный)
   - `.accordion__panel` - раскрывающееся содержимое

4. **Grid System** (`card.css`)
   - `.grid` - базовая сетка
   - `.grid--cards` - сетка для карточек
   - `.bento-grid` - неравномерная сетка (планируется)

**Layout Sections**:

5. **Sticky Header** (`site-header`)
   - Fixed navigation with blur backdrop
   - Mobile hamburger menu
   - Responsive CTA button

6. **Hero Section** (`hero-section`)
   - Two-column layout (content + video/form)
   - Countdown timer
   - Statistics display
   - Dual block system (order vs subscribe)

7. **Action Bars** (`action-bar`)
   - Desktop: Vertical floating buttons
   - Mobile: Bottom sticky bar
   - Appears on scroll

### Data Attributes
- `data-variant="order"` or `data-variant="subscribe"` on body controls which blocks are visible
- `data-accordion` on accordion containers
- `data-open="false"` on accordion items (default closed)
- `data-target` on countdown timer

## Development Commands

Since this is a vanilla HTML/CSS/JavaScript project, no build commands are necessary. Simply:

1. **Development**: Open `project/index.html` in a browser or use a local server
2. **Testing**: Test responsiveness using browser dev tools
3. **Validation**: Use W3C HTML validator to ensure HTML5 compliance

## Development Rules

### 🚫 ЗАПРЕЩЕНО:
- Создавать стили UI компонентов напрямую в `main.css`
- Переопределять компоненты в других файлах (только через модификаторы)
- Использовать inline стили или !important
- Создавать новые компоненты без согласования
- Нарушать консистентность (например, разные стили для одинаковых элементов)

### ✅ ОБЯЗАТЕЛЬНО:
- ВСЕ UI элементы должны использовать существующие компоненты
- Новые компоненты согласовываются и создаются как отдельные `.css` файлы
- Использовать CSS custom properties для всех значений (colors, sizes, shadows)
- Следовать БЭМ-подобной методологии для модификаторов
- Тестировать адаптивность на всех устройствах (320px+)
- Обеспечивать hover-эффекты для всех интерактивных элементов

### Процесс добавления нового компонента:
1. **Согласование**: Обсудить необходимость и структуру компонента
2. **Создание**: Создать файл `styles/proweb/components/[component-name].css`
3. **Импорт**: Добавить `@import` в `main.css`
4. **Документация**: Добавить компонент в список в CLAUDE.md
5. **Тестирование**: Проверить работу на всех breakpoints

## Styling Guidelines

- Follow the existing CSS custom property system in `:root`
- Use the established color palette (indigo/violet theme)
- Maintain responsive design with `clamp()` for typography
- Add hover effects to all interactive elements
- Follow the component-based CSS organization

## Content Management

The landing page has extensive Russian text content for a web development course. When editing content:
- Maintain the professional, educational tone
- Keep technical terms consistent
- Preserve the course structure and module organization
- Maintain proper Russian typography (em dashes, proper spacing)

## Browser Support

Target modern browsers with support for:
- CSS Grid and Flexbox
- CSS Custom Properties
- ES6 Modules
- Backdrop-filter (for header blur effect)

## Icons Guidelines

### 🎯 Icon Source
- **Единственный источник**: [Tabler Icons](https://tabler.io/icons)
- **Причина выбора**: Консистентный дизайн, обширная библиотека, SVG формат, открытый исходный код

### 📐 Технические требования
- **Формат**: Только SVG, инлайн в HTML
- **Размер**: 24x24 viewBox (стандарт Tabler Icons)
- **Stroke width**: 2px (стандарт Tabler Icons)
- **Атрибуты**: `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`

### 🔧 Использование
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="..." />
</svg>
```

### 🎨 Стилизация
- **Цвет**: Через CSS `color` или `stroke` свойство
- **Размер**: Через CSS `width` и `height`
- **Hover эффекты**: Через CSS переходы
- **Доступность**: Обязательно `aria-hidden="true"` для декоративных иконок

### 📋 Правила использования
1. **Консистентность**: Все иконки только из Tabler Icons
2. **Семантика**: Выбор иконки должен соответствовать содержанию
3. **Размеры**: Использовать стандартные размеры (16px, 24px, 32px, 48px)
4. **Доступность**: Добавлять `aria-label` для функциональных иконок
5. **Производительность**: Группировать повторяющиеся иконки в спрайты при необходимости

### 🚫 Запрещено
- Использовать иконки из других источников (Font Awesome, Feather, Heroicons и т.д.)
- Создавать собственные иконки без согласования
- Использовать растровые форматы (PNG, JPG) для иконок
- Смешивать разные стили иконок на одной странице

## Tabler Icons Integration System

### 🛠️ Инструменты для работы с иконками

В проекте созданы специальные инструменты для работы с Tabler Icons:

1. **tabler-icons-helper.js** - JavaScript утилита для получения иконок
2. **icon-finder.html** - Веб-интерфейс для поиска и копирования иконок

### 📦 Использование tabler-icons-helper.js

Подключение в HTML:
```html
<script src="tabler-icons-helper.js"></script>
<script>
  // Получить иконку
  const iconSvg = await TablerIcons.getIcon('user');
  
  // Получить только paths
  const paths = await TablerIcons.getIconPaths('star');
  
  // Поиск подходящих иконок
  const suggestions = TablerIcons.suggestIcons('user');
  
  // Проверить доступность
  const isAvailable = await TablerIcons.isIconAvailable('play');
</script>
```

### 🔍 Использование Icon Finder

1. Откройте `project/icon-finder.html` в браузере
2. Введите название иконки или ключевое слово
3. Выберите подходящую иконку из результатов
4. Скопируйте готовый HTML или только path элементы
5. Вставьте в свой код

### ⚡ Быстрое получение иконок через CDN

Для получения актуальных иконок используйте:
```bash
# Получить иконку напрямую из CDN
curl "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/ICON_NAME.svg"

# Примеры:
curl "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/user.svg"
curl "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/star.svg"
curl "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/play.svg"
```

### 📚 Популярные иконки в проекте

| Назначение | Иконка | Tabler Name |
|------------|--------|-------------|
| Пользователи | 👤 | `user`, `users` |
| Избранное | ⭐ | `star`, `heart` |
| Воспроизведение | ▶️ | `player-play`, `video` |
| Настройки | ⚙️ | `settings`, `adjustments` |
| Безопасность | 🛡️ | `shield`, `shield-check` |
| Проверка | ✅ | `check`, `circle-check` |
| Время | 🕐 | `clock`, `calendar` |
| Дом | 🏠 | `home`, `building` |
| Облако | ☁️ | `cloud`, `cloud-download` |
| Деньги | 💰 | `currency-dollar`, `credit-card` |
| Слои | 📚 | `stack-3`, `layers-2` |
| Книги | 📖 | `book`, `book-2` |

### 🎨 Кастомизация иконок

```html
<!-- Стандартная иконка 24x24 -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>

<!-- Увеличенная иконка 32x32 -->
<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>

<!-- С дополнительными классами -->
<svg class="icon icon--large" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>
```

### 🔧 CSS стилизация иконок

```css
/* Базовые стили для иконок */
.icon {
  display: inline-block;
  color: currentColor;
  transition: color 0.2s ease;
}

/* Размеры */
.icon--sm { width: 16px; height: 16px; }
.icon--md { width: 24px; height: 24px; }
.icon--lg { width: 32px; height: 32px; }
.icon--xl { width: 48px; height: 48px; }

/* Цвета */
.icon--primary { color: var(--color-primary); }
.icon--success { color: var(--color-success); }
.icon--warning { color: var(--color-warning); }
.icon--danger { color: var(--color-danger); }

/* Hover эффекты */
.icon-hover {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.icon-hover:hover {
  transform: scale(1.1);
}
```

### 🚨 Исправленные проблемы

В ходе аудита были исправлены следующие поврежденные иконки:

1. **layers** → **stack-3** (строка 1268) - Исправлен некорректный SVG путь
2. **credit-card** (строка 213) - Обновлен на правильную иконку из Tabler
3. **cloud** (строка 253) - Добавлены недостающие элементы пути
4. **user-heart** (строка 450) - Исправлены координаты в path

### ⚠️ Troubleshooting

**Проблема**: Иконка отображается некорректно
- Проверьте правильность SVG path
- Убедитесь что viewBox="0 0 24 24"
- Проверьте наличие всех обязательных атрибутов

**Проблема**: Иконка не найдена
- Используйте Icon Finder для поиска правильного названия
- Проверьте доступность через CDN
- Рассмотрите альтернативные названия

**Проблема**: Иконка слишком мелкая/крупная  
- Измените width и height (сохраняя пропорции)
- Используйте CSS для масштабирования
- Не изменяйте viewBox (всегда "0 0 24 24")

## Typography & Colors System

Проект использует строгую систему типографики и цветов для обеспечения консистентности дизайна.

### 📏 Typography Scale (Размеры шрифтов)

Все размеры шрифтов стандартизированы через CSS переменные:

#### Базовая шкала (12px-48px)
```css
--fs-xs: 12px;     /* Labels, captions, мелкий текст */
--fs-sm: 14px;     /* Body small, вторичный текст */
--fs-base: 16px;   /* Body основной, базовый размер */
--fs-lg: 18px;     /* Body large, акценты */
--fs-xl: 20px;     /* Subtitle, лиды */
--fs-2xl: 24px;    /* H4, карточки заголовки */
--fs-3xl: 28px;    /* H3, большие числа */
--fs-4xl: 32px;    /* H2, секции заголовки */
--fs-5xl: 36px;    /* Hero numbers, countdown */
--fs-6xl: 42px;    /* H1, главные заголовки */
--fs-7xl: 48px;    /* Display, очень крупные элементы */
```

#### Семантические переменные
```css
/* Для основного текста */
--fs-body-xs: var(--fs-xs);      /* 12px - badges, timestamps */
--fs-body-sm: var(--fs-sm);      /* 14px - buttons, labels */
--fs-body: var(--fs-base);       /* 16px - основной текст */
--fs-body-lg: var(--fs-lg);      /* 18px - лиды, CTA текст */

/* Для заголовков */
--fs-heading-sm: var(--fs-2xl);  /* 24px - H4, card titles */
--fs-heading-md: var(--fs-3xl);  /* 28px - H3, stats */
--fs-heading-lg: var(--fs-4xl);  /* 32px - H2, section titles */
--fs-heading-xl: var(--fs-6xl);  /* 42px - H1, hero titles */

/* Для крупных элементов */
--fs-display-sm: var(--fs-5xl);  /* 36px - numbers, countdown */
--fs-display-lg: var(--fs-7xl);  /* 48px - hero numbers */
```

### 🎨 Text Colors System (Цвета текста)

Система контрастных цветов для лучшей читаемости:

#### Базовые цвета
```css
--color-text-primary: var(--gray-900);    /* #111827 - основной текст */
--color-text-secondary: var(--gray-800);  /* #1f2937 - вторичный текст */
--color-text-muted: var(--gray-700);      /* #374151 - приглушенный текст */
--color-text-light: var(--gray-600);      /* #4b5563 - светлый текст */
--color-text-subtle: var(--gray-500);     /* #6b7280 - очень светлый */
```

#### Семантические цвета
```css
--text-heading: var(--color-text-primary);     /* Заголовки - самый темный */
--text-body: var(--color-text-primary);        /* Основной текст - темный */
--text-body-secondary: var(--color-text-secondary); /* Описания */
--text-caption: var(--color-text-muted);       /* Подписи, лейблы */
--text-placeholder: var(--color-text-light);   /* Плейсхолдеры */
--text-disabled: var(--color-text-subtle);     /* Неактивные элементы */
```

### 📋 Usage Rules (Правила использования)

#### ✅ ОБЯЗАТЕЛЬНО:
1. **Использовать только переменные** - никаких хардкодов `font-size: 16px`
2. **Семантический выбор** - использовать переменные по назначению
3. **Консистентность** - одинаковые элементы = одинаковые размеры

#### 🚫 ЗАПРЕЩЕНО:
1. Прямые размеры: `font-size: 14px` → используйте `font-size: var(--fs-body-sm)`
2. Прямые цвета: `color: #374151` → используйте `color: var(--text-caption)`
3. Создавать новые размеры без согласования

### 📐 Application Guidelines (Руководство по применению)

#### Размеры шрифтов по типу контента:

| Контент | Переменная | Размер | Применение |
|---------|------------|--------|------------|
| **Badges, timestamps** | `--fs-body-xs` | 12px | Copyright, мелкие подписи |
| **Button text, labels** | `--fs-body-sm` | 14px | Кнопки, навигация, метки |
| **Body text** | `--fs-body` | 16px | Основной текст, параграфы |
| **Important text** | `--fs-body-lg` | 18px | CTA текст, важные описания |
| **Subtitles, leads** | `--fs-xl` | 20px | Подзаголовки, лиды |
| **Card titles, H4** | `--fs-heading-sm` | 24px | Заголовки карточек |
| **Stats, H3** | `--fs-heading-md` | 28px | Статистика, секции |
| **Section titles, H2** | `--fs-heading-lg` | 32px | Заголовки секций |
| **Hero titles, H1** | `--fs-heading-xl` | 42px | Главные заголовки |
| **Numbers, countdown** | `--fs-display-sm` | 36px | Цифры, таймеры |
| **Hero numbers** | `--fs-display-lg` | 48px | Крупные цифры |

#### Цвета текста по важности:

| Важность | Переменная | Цвет | Применение |
|----------|------------|------|------------|
| **Наивысшая** | `--text-heading` | #111827 | H1-H6, важные заголовки |
| **Высокая** | `--text-body` | #111827 | Основной текст |
| **Средняя** | `--text-body-secondary` | #1f2937 | Описания, подтексты |
| **Низкая** | `--text-caption` | #374151 | Подписи, метаданные |
| **Очень низкая** | `--text-placeholder` | #4b5563 | Плейсхолдеры форм |
| **Неактивная** | `--text-disabled` | #6b7280 | Отключенные элементы |

### 🔧 Implementation Examples

```css
/* Правильно ✅ */
.card-title {
  font-size: var(--fs-heading-sm);
  color: var(--text-heading);
}

.card-description {
  font-size: var(--fs-body);
  color: var(--text-body-secondary);
}

.button-text {
  font-size: var(--fs-body-sm);
}

/* Неправильно ❌ */
.card-title {
  font-size: 24px;
  color: #1f2937;
}
```

### 🔄 Migration from Old System

При обновлении старого кода:

```css
/* Старый код */
font-size: 14px; → font-size: var(--fs-body-sm);
font-size: 16px; → font-size: var(--fs-body);
font-size: 18px; → font-size: var(--fs-body-lg);
font-size: 24px; → font-size: var(--fs-heading-sm);

color: var(--gray-800); → color: var(--text-heading);
color: var(--gray-600); → color: var(--text-body-secondary);
color: var(--gray-500); → color: var(--text-disabled);
```

## Bento Grid Patterns

### Pattern 1: Asymmetric 3x3
Идеально для секций с основным контентом и дополнительной информацией:
```html
<div class="bento-grid bento-grid--asymmetric">
  <div class="bento-item bento-item--large">Основной контент</div>
  <div class="bento-item bento-item--small">Дополнительно 1</div>
  <div class="bento-item bento-item--small">Дополнительно 2</div>
  <div class="bento-item bento-item--wide">Широкий блок</div>
</div>
```

### Pattern 2: Featured + Grid
Для секций с выделенным элементом и сеткой:
```html
<div class="bento-grid bento-grid--featured">
  <div class="bento-item bento-item--hero">Главная карточка</div>
  <div class="bento-item">Карточка 1</div>
  <div class="bento-item">Карточка 2</div>
  <div class="bento-item">Карточка 3</div>
</div>
```

### Pattern 3: Dashboard Layout
Для сложных интерфейсов:
```html
<div class="bento-grid bento-grid--dashboard">
  <div class="bento-item bento-item--stats">Статистика</div>
  <div class="bento-item bento-item--chart">График</div>
  <div class="bento-item bento-item--list">Список</div>
  <div class="bento-item bento-item--actions">Действия</div>
</div>
```

### CSS Grid Areas Examples:
```css
.bento-grid--asymmetric {
  grid-template-areas: 
    "large large small1"
    "large large small2"
    "wide  wide  wide";
}

.bento-grid--featured {
  grid-template-areas:
    "hero hero card1"
    "hero hero card2"
    "hero hero card3";
}
```