# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Об архитектуре
Взаимодействия внутри приложения происходят через события. Модели будут инициализировать события, слушатели событий в основном коде выполнять передачу данных компонентам отображения, через события могут и обновляться и данные в моделях.

## Описание типов

Основные интерфейсы и типы:

- **Category**: Категория товара.

  ```typescript
  type Category = 
      'софт-скил' | 
      'хард-скил' |
      'кнопка' |
      'другое'|
      'дополнительное';
  ```

- **IProduct**: Описывает структуру объекта продукта.

  ```typescript
  interface IProduct {
    id: string; // id номер товара
    name: string; // название товара
    description: string; // описание товара
    icon: string; // иконка товара
    cost: number | null; // цена товара
    category: Category; // категория товара
    inCart: boolean; // добавлен ли в корзину
  }
  ```

- **ICart**: Описывает корзину.

  ```typescript
  interface ICart {
    items: IProduct[]; // товары, добаавленные в корзину
    totalCost: number; // общая их стоимость
  }
  ```

- **IOrder**: Определяет структуру объекта заказа.

  ```typescript
  // наследуется от интерфейсов IDeliveryForm, IContactForm
  interface IOrder extends IDeliveryForm, IContactForm { 
    cart: ICart; // корзина
    total: number; // стоимость заказа
  }
  ```

- **IAppState**: Описывает состояние приложения.

  ```typescript
  interface IAppState {
    catalog: ICatalog; // каталог товаров
    cart: ICart; // корзина с товарами
    delivery: IDeliveryForm | null; // доставка
    contact: IContactForm | null; // контакты
    order: IOrder | null; // заказ
  }
  ```

- **IDeliveryForm** и **IContactForm**: Определяют структуру данных для форм данных по доставке и контактной информации соответственно.

  ```typescript
  interface IDeliveryForm {
    payment: string; // способ оплаты
    address: string; // адрес доставки
  }
  
  interface IContactForm {
      email: string; // электронная почта
      phone: string; // номер телефона
  }
  ```

## Базовые классы

- **Абстрактный класс `Model<T>`**: служит базовым для всех моделей данных в приложении.

  - **Свойства**:
    - `data: T`: Данные модели.
    - `events: IEvents`: Экземпляр EventEmitter для управления событиями.
  
  - **Конструктор**: Принимает объект данных и экземпляр EventEmitter.
  
    ```typescript
    constructor(protected data: Partial<T>, events: IEvents) {
      Object.assign(this, data);
    }
    ```

  - **Методы**:
    - `emitChanges(event: string)`: Генерирует событие об изменении данных модели.


- **Абстрактный класс `Component<T>`**: служит базовым для всех компонентов отображения в приложении.

  - **Свойства**:
    - `container: HTMLElement`: Контейнер компонента.
  
  - **Конструктор**: Принимает DOM-элемент контейнера, в который будет помещен компонент.
  
    ```typescript
    protected constructor(protected container: HTMLElement) {};
    ```
  
  - **Методы**:
    - `render(data?: Partial<T>): HTMLElement`: Метод для отрисовки компонента, должен быть реализован/переопределен в наследниках.
    - `toggleClass(element: HTMLElement, className: string): void;`: Переключает класс для переданного элемента.
    - `setHidden(element: HTMLElement): void;`: Скрывает элемент.
    - `setVisible(element: HTMLElement): void;`: Отображает элемент.
    - `setText(element: HTMLElement, value: unknown): void;`: Устанавливает текстовое содержимое для переданного элемента.
    - `setImage(element: HTMLImageElement, src: string, alt?: string): void;`: Устанавливает изображения и альтернативный текст для изоображения.


## Общие компоненты отображения

- **Класс `Modal`**: отвечает за управление модальными окнами в приложении. Наследуется от `Component<IModal>`.

  - **Свойства**:
    - `closeButton: HTMLButtonElement`: Кнопка закрытия модального окна.
    - `content: HTMLElement`: Отображаемый контент в модальном окне.
  
  - **Конструктор**: Принимает два параметра — `container` (DOM-элемент контейнера модального окна) и `events` (экземпляр EventEmitter для управления событиями).
  
    ```typescript
    constructor(protected container: HTMLElement, protected events: IEvents) {
      super(container);
    }
    ```
  
  - **Методы**:
    - `open()`: Открывает модальное окно.
    - `close()`: Закрывает модальное окно.



- **Класс `Form`**: отвечает за работу с формами в приложении. Наследуется от `Component<IFormState>`.

  - **Свойства**:
    - `submit: HTMLButtonElement`: Кнопка отправки формы.
    - `errors: HTMLElement`: Элемент для отображения ошибок.
  
  - **Конструктор**: Принимает контейнер формы и экземпляр EventEmitter.
  
    ```typescript
    constructor(protected container: HTMLFormElement, protected events: IEvents) {
      super(container);
    }
    ```
