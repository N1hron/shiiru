import type { en } from "./en";

export const ru = {
  theme: {
    toggle: "Переключить тему",
    light: "Светлая тема",
    dark: "Темная тема",
    system: "Системная тема"
  },
  language: {
    toggle: "Переключить язык",
    en: "Английский язык",
    ru: "Русский язык"
  },
  settings: {
    heading: "Настройки",
    remember: "Запомнить выбор",
    reset: "Сбросить настройки",
    items: {
      type: {
        label: "Тип стикера",
        options: {
          sticker: "Стикер",
          emoji: "Эмодзи"
        }
      },
      verticalAlignment: {
        label: "Верт. выравнивание",
        options: {
          top: "Сверху",
          middle: "По центру",
          bottom: "Снизу"
        }
      },
      horizontalAlignment: {
        label: "Гориз. выравнивание",
        options: {
          left: "Слева",
          middle: "По центру",
          right: "Справа"
        }
      },
      resize: {
        label: "Масштабирование",
        options: {
          contain: "Вписать",
          "scale-down": "Уменьшить",
          cover: "Заполнить",
          fill: "Растянуть"
        }
      },
      quality: {
        label: "Качество",
        options: {
          auto: "Авто",
          "very-low": "Очень низкое",
          low: "Низкое",
          medium: "Среднее",
          high: "Высокое",
          "very-high": "Очень высокое"
        }
      },
      staticFormat: {
        label: "Статичный формат",
        options: {
          webp: "Webp",
          png: "Png"
        }
      },
      removeSpaces: {
        label: "Удалять пробелы"
      },
      antialiasing: {
        label: "Включить сглаживание"
      },
      allowDuplicates: {
        label: "Разрешить дубликаты"
      }
    }
  },
  spinSelect: {
    prev: "Предыдущее значение",
    next: "Следующее значение",
    reset: "Сбросить значение"
  }
} satisfies typeof en;
