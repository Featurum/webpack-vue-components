# Конфигурация webpack для сборки vue компонентов

Данная конфигурация позволяет разрабатывать (в рантайме) и собирать vue компоненты для последующего использования в статичных проектах без фреймворков.

## Запуск и сборка

Для разворачивания и сборки требуется выполнить команды в консоли:

```
# Установка зависимостей
npm install

# Запуск локального стенда по адресу localhost:8080
npm run dev --component=<% Имя компонента (название директории в папке "src") %>

# Сборка исходников проекта в билд
npm run build --component=<% Имя компонента (название директории в папке "src") %>

# Сборка всех компонентов
npm run build
```

## Доступные компоненты и команды для их запуска

#### Menu
```
npm run dev --component=menu
```

#### Header
```
npm run dev --component=header
```