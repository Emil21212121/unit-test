import { nameIsValid, fullTrim, getTotal } from '../src/app';

describe('nameIsValid', () => {
  test('валидное имя', () => {
    expect(nameIsValid('john')).toBe(true);
  });

  test('имя с цифрами недействительно', () => {
    expect(nameIsValid('john123')).toBe(false);
  });

  test('имя короче 2 символов недействительно', () => {
    expect(nameIsValid('j')).toBe(false);
  });
});

describe('fullTrim', () => {
  test('удаление пробелов', () => {
    expect(fullTrim('hello world')).toBe('helloworld');
  });

  test('удаление пробелов из пустой строки', () => {
    expect(fullTrim('')).toBe('');
  });

  test('удаление пробелов из строки с несколькими пробелами', () => {
    expect(fullTrim('   hello   world   ')).toBe('helloworld');
  });
});

describe('getTotal', () => {
  test('подсчёт суммы без скидки', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(getTotal(items)).toBe(20);
  });

  test('подсчёт суммы со скидкой', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(getTotal(items, 10)).toBe(18); 
  });

  test('подсчёт суммы с нулевой скидкой', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(getTotal(items, 0)).toBe(20);
  });

  test.each([
    [[{ price: 10, quantity: 1 }], 0, 10],
    [[{ price: 10, quantity: 1 }], 50, 5],
    [[{ price: 10, quantity: 10 }], 10, 90],
    [[{ price: 10, quantity: 0 }], 0, 0],
  ])('подсчёт суммы с параметрами %p, скидка %p, итоговая сумма %p', (items, discount, expected) => {
    expect(getTotal(items, discount)).toBe(expected);
  });

  test('ошибка при отрицательной скидке', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(() => getTotal(items, -10)).toThrow('Процент скидки не может быть отрицательным');
  });

  test('ошибка при скидке больше 100%', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(() => getTotal(items, 110)).toThrow('Процент скидки не может быть больше 100');
  });

  test('ошибка при нечисловой скидке', () => {
    const items = [{ price: 10, quantity: 2 }];
    expect(() => getTotal(items, '10')).toThrow('Скидка должна быть числом');
  });
});
