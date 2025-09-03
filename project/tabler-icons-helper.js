/**
 * Tabler Icons Helper Script
 * Утилита для получения SVG иконок из библиотеки Tabler Icons
 */

class TablerIconsHelper {
  constructor() {
    this.baseUrl = 'https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/';
    this.cache = new Map();
  }

  /**
   * Получить SVG код иконки из Tabler Icons
   * @param {string} iconName - Название иконки (например, 'user', 'star')
   * @param {Object} options - Опции для кастомизации
   * @returns {Promise<string>} SVG код иконки
   */
  async getIcon(iconName, options = {}) {
    try {
      // Проверим кэш
      const cacheKey = `${iconName}_${JSON.stringify(options)}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      const response = await fetch(`${this.baseUrl}${iconName}.svg`);
      if (!response.ok) {
        throw new Error(`Icon "${iconName}" not found`);
      }
      
      let svgCode = await response.text();
      
      // Применяем опции кастомизации
      svgCode = this.customizeIcon(svgCode, options);
      
      // Кэшируем результат
      this.cache.set(cacheKey, svgCode);
      
      return svgCode;
    } catch (error) {
      console.error(`Error fetching icon "${iconName}":`, error.message);
      return this.getFallbackIcon(iconName);
    }
  }

  /**
   * Кастомизировать SVG иконку
   * @param {string} svgCode - Исходный SVG код
   * @param {Object} options - Опции (width, height, className, strokeWidth)
   * @returns {string} Модифицированный SVG код
   */
  customizeIcon(svgCode, options) {
    const {
      width = 24,
      height = 24,
      className = '',
      strokeWidth = 2,
      ariaHidden = true
    } = options;

    // Заменяем атрибуты
    svgCode = svgCode.replace(/width="[^"]*"/, `width="${width}"`);
    svgCode = svgCode.replace(/height="[^"]*"/, `height="${height}"`);
    svgCode = svgCode.replace(/stroke-width="[^"]*"/, `stroke-width="${strokeWidth}"`);
    
    // Добавляем класс если указан
    if (className) {
      svgCode = svgCode.replace(/<svg([^>]*)>/, `<svg$1 class="${className}">`);
    }
    
    // Добавляем aria-hidden для декоративных иконок
    if (ariaHidden) {
      svgCode = svgCode.replace(/<svg([^>]*)>/, `<svg$1 aria-hidden="true">`);
    }

    return svgCode;
  }

  /**
   * Получить только path элементы из SVG
   * @param {string} iconName - Название иконки
   * @returns {Promise<string>} Path элементы
   */
  async getIconPaths(iconName) {
    try {
      const svgCode = await this.getIcon(iconName);
      const pathMatches = svgCode.match(/<path[^>]*>/g);
      return pathMatches ? pathMatches.join('\n                  ') : '';
    } catch (error) {
      console.error(`Error getting paths for "${iconName}":`, error.message);
      return '';
    }
  }

  /**
   * Создать HTML готовую к вставке иконку
   * @param {string} iconName - Название иконки
   * @param {Object} options - Опции
   * @returns {Promise<string>} Готовый к вставке HTML
   */
  async createIconHtml(iconName, options = {}) {
    const {
      wrapper = 'div',
      wrapperClass = '',
      size = 24
    } = options;

    const iconOptions = { ...options, width: size, height: size };
    const svgCode = await this.getIcon(iconName, iconOptions);

    if (wrapper) {
      return `<${wrapper}${wrapperClass ? ` class="${wrapperClass}"` : ''}>
  ${svgCode}
</${wrapper}>`;
    }

    return svgCode;
  }

  /**
   * Резервная иконка если основная не найдена
   * @param {string} iconName - Название иконки
   * @returns {string} Резервная иконка
   */
  getFallbackIcon(iconName) {
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  <path d="M12 8l0 4" />
  <path d="M12 16l.01 0" />
  <title>Icon "${iconName}" not found</title>
</svg>`;
  }

  /**
   * Поиск иконок по ключевым словам (упрощенный)
   * @param {string} keyword - Ключевое слово
   * @returns {Array<string>} Список потенциально подходящих иконок
   */
  suggestIcons(keyword) {
    const iconSuggestions = {
      'user': ['user', 'users', 'user-plus', 'user-minus', 'user-check', 'user-x'],
      'play': ['player-play', 'player-pause', 'player-stop', 'play', 'video'],
      'star': ['star', 'star-filled', 'stars'],
      'layers': ['stack-3', 'layers-2', 'layers-intersect', 'layout-grid'],
      'book': ['book', 'book-2', 'books', 'notebook'],
      'video': ['video', 'device-tv', 'player-play', 'camera'],
      'money': ['currency-dollar', 'coin', 'credit-card'],
      'heart': ['heart', 'heart-filled', 'mood-heart'],
      'settings': ['settings', 'adjustments', 'tool'],
      'shield': ['shield', 'shield-check', 'security'],
      'check': ['check', 'circle-check', 'square-check'],
      'time': ['clock', 'history', 'calendar'],
      'home': ['home', 'building', 'house'],
      'cloud': ['cloud', 'cloud-download', 'cloud-upload'],
      'share': ['share', 'external-link', 'link'],
      'edit': ['edit', 'pencil', 'brush'],
      'delete': ['trash', 'x', 'circle-x']
    };

    const lowerKeyword = keyword.toLowerCase();
    return iconSuggestions[lowerKeyword] || [`${lowerKeyword}`, `${lowerKeyword}-2`, `${lowerKeyword}-3`];
  }

  /**
   * Проверить доступность иконки
   * @param {string} iconName - Название иконки
   * @returns {Promise<boolean>} Доступна ли иконка
   */
  async isIconAvailable(iconName) {
    try {
      const response = await fetch(`${this.baseUrl}${iconName}.svg`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Глобальная инициализация для использования в браузере
if (typeof window !== 'undefined') {
  window.TablerIcons = new TablerIconsHelper();
  
  // Добавляем удобные методы в консоль
  window.getIcon = (name, options) => window.TablerIcons.getIcon(name, options);
  window.getIconPaths = (name) => window.TablerIcons.getIconPaths(name);
  window.suggestIcons = (keyword) => window.TablerIcons.suggestIcons(keyword);
}

// Экспорт для Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TablerIconsHelper;
}