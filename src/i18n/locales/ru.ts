import type { Translation } from "../types";

export const ru: Translation = {
  theme: {
    toggle: "Переключить тему",
    current: "Текущая тема: {{theme}}",
    light: "Светлая",
    dark: "Темная",
    system: "Системная"
  },
  language: {
    toggle: "Переключить язык",
    current: "Текущий язык: {{language}}",
    en: "Английский",
    ru: "Русский"
  },
  spinSelect: {
    prev: "Предыдущее значение",
    next: "Следующее значение",
    reset: "Сбросить значение"
  },
  stickerSettings: {
    heading: "Настройки стикера",
    reset: "Сбросить настройки стикера",
    toggle: "Переключить настройки стикера"
  },
  settings: {
    labels: {
      type: "Тип стикера",
      verticalAlignment: "Вертик. выравнивание",
      horizontalAlignment: "Гориз. выравнивание",
      antialiasingQuality: "Качество сглаживания",
      resizeMode: "Тип масштабирования",
      removeSpaces: "Удалять пробелы",
      downloadZip: "Скачать в виде zip файла",
      imageFormat: "Формат изображения",
      videoQuality: "Качество видео"
    },
    values: {
      type: {
        sticker: "Стикер",
        emoji: "Эмодзи"
      },
      verticalAlignment: {
        top: "Сверху",
        middle: "По центру",
        bottom: "Снизу"
      },
      horizontalAlignment: {
        left: "Слева",
        middle: "По центру",
        right: "Справа"
      },
      resizeMode: {
        "scale-down": "Уменьшить",
        contain: "Вписать",
        cover: "Заполнить",
        fill: "Растянуть"
      },
      antialiasingQuality: {
        off: "Выключено",
        low: "Низкое",
        medium: "Среднее",
        high: "Высокое"
      },
      imageFormat: {
        webp: "WEBP",
        png: "PNG"
      },
      videoQuality: {
        auto: "Автоматическое",
        "very-low": "Очень низкое",
        low: "Низкое",
        medium: "Среднее",
        high: "Высокое",
        "very-high": "Очень высокое"
      }
    }
  }
};
