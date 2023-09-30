import { merge } from "lodash";
import translations from "./models";

const translation = {
  general: {
    back: "Назад",
    email: "email",
    phone: "телефон",
    total: "всего",
    attendee: "участник",
  },
  datepicker: {
    selectDate: "Выберите дату",
    selectTime: "Выберите время",
  },
  layout: {
    header: {
      myTrips: "Путешествия",
      myFirm: "Моя Фирма",
      registerFirm: "Зарегистрировать Компанию",
      logIn: "Вход",
      logOut: "Выход",
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
    cancelled: "Отменено",
    future: "Грядет",
    successful: "Успешно",
    pending: "Обрабатывается",
    processing: "Обрабатывается",
  },
  paymentTypes: {
    stripe: "Онлайн",
    cash: "Наличными",
  },
  scenes: {
    verifyBooking: {
      toTrip: "Обратно к путешествию",
    },
    signIn: {
      changeLoginType: "Изменить {{type}}",
      header: "Вход / Регистрация",
      enterCode: "Введите код из {{type}}",
      youCanResendDelay: "Вы можете повторно отправить код через {{seconds}}",
      resendCode: "Отправить код повторно",
      enterEmail: "Введите Email",
      enterPhone: "Введите телефон",
      useType: "Использвоать {{type}}",
      signInAction: "Вход",
    },
    attendees: {
      eventScene: {
        bookEvent: "Забронировать",
        chooseCount: "Сколько человек",
      },
      tripScene: {
        bookingInfo: "Информация о бронировании",
        attendeesCount: "{{count}} участник(-ов)",
        bookignOptionsSubheader: "Дополнительные опции",
        cancelBooking: "Отменить бронирование",
        noAvailablePaymentMethod: "Нет доступных способов оплаты. Пока что.",
        payDeposit: "Оплатить депозит {{amount}}",
        payOnline: "Оплатить онлайн {{amount}}",
        cancelBookingModal: {
          title: "Отмена бронирования",
          refundAmount: "Вам вернется:",
          penaltyAmount: "Штраф:",
          close: "Закрыть",
          confirm: "Отменить бронирование",
        },
      },
      eventsScene: {
        sidebar: {
          city: "Город",
          startDate: "Начало",
          endDate: "Конец",
          startDatePlaceholder: "Когда начинаем?",
          endDatePlaceholder: "Когда заканчиваем?",
          priceRance: "Цена",
          minPrice: "Мин. цена",
          maxPrice: "Макс. цена",
          categoriesSubheader: "Категории",
        },
      },
    },
  },
};

export default merge(translations, translation);
