import { merge } from "lodash";
import translations from "./models";
import scenesTranslations from "./scenes";
import formsTranslations from "./forms";

const translation = {
  general: {
    back: "Назад",
    email: "email",
    phone: "телефон",
    total: "всего",
    attendee: "участник",
    actions: "Доступные операции",
    all: "Все",
    additional: "Дополнительно",
    id: "ID",
    noData: "Нет данных",
    save: "Сохранить",
    edit: "Редактировать",
    cancel: "Закрыть",
    available: "Доступные",
    yes: "Да",
    no: "Нет",
    next: "Дальше",
    previous: "Назад",
    hour: "Час",
    hours: "Часы",
    hourShort: "ч.",
    minute: "Минута",
    minutes: "Минуты",
    minuteShort: "мин.",
    required: "Обязательно",
    details: "Детали",
    search: "Поиск",
  },
  weekdays: {
    monday: "Понедельник",
    tuesday: "Вторник",
    wednesday: "Среда",
    thursday: "Четверг",
    friday: "Пятница",
    saturday: "Суббота",
    sunday: "Воскресенье",
  },
  datepicker: {
    changeDate: "Изменить дату",
    selectDate: "Выберите дату",
    selectTime: "Выберите время",
  },
  layout: {
    header: {
      myTrips: "Путешествия",
      myFirm: "Моя Фирма",
      addNewEvent: "Добавить новое мероприятие",
      registerFirm: "Зарегистрировать Компанию",
      logIn: "Вход",
      logOut: "Выход",
      myProfile: "Мой профиль",
    },
  },
  event: {
    book: "Забронировать",
    ratingOf: "{{val}} из {{max}}",
  },
  statuses: {
    active: "Активно",
    past: "Прошло",
    paid: "Оплачено",
    canceled: "Отменено",
    cancelled: "Отменено",
    future: "Грядет",
    successful: "Успешно",
    pending: "Обрабатывается",
    processing: "Обрабатывается",
    inactive: "Не активно",
    removed: "Удалено",
    published: "Опубликовано",
    unpublished: "Не опубликовано",
    draft: "Черновик",
    registered: "Зарегистрировано",
    not_registered: "Не зарегистрировано",
    available: "Доступно для заказа",
    not_available: "Не доступно для заказа",
  },
  address: {
    title: "Адрес",
    fullAddress: "Полный адрес",
    country: "Страна",
    region: "Регион",
    city: "Город",
    street: "Улица",
    houseNumber: "Номер дома",
    latitude: "Широта",
    longitude: "Долгота",
  },
  languages: {
    action: "🌐 Выберите язык",
    russian: "🇷🇺 Русский",
    english: "🇺🇸 English",
  },
  components: {
    link: {
      _blank: "Будет открыто в новой вкладке",
    },
  },
};

export default merge(
  translations,
  formsTranslations,
  scenesTranslations,
  translation
);
