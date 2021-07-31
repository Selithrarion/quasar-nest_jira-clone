interface RulesInterface {
  required: (v: FormValueInterface) => ValidationResultInterface;

  email: (v: FormValueInterface) => ValidationResultInterface;

  min10: (v: FormValueInterface) => ValidationResultInterface;
  max10: (v: FormValueInterface) => ValidationResultInterface;

  min40: (v: FormValueInterface) => ValidationResultInterface;
  max40: (v: FormValueInterface) => ValidationResultInterface;
}

type FormValueInterface = string | number;
type ValidationResultInterface = boolean | string;

export default function useFormValidation(): RulesInterface {
  function required(v: FormValueInterface): ValidationResultInterface {
    return !!v || 'Обязательное поле';
  }

  function email(v: FormValueInterface): ValidationResultInterface {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(v)) || 'Неверный формат Email';
  }

  function min10(v: FormValueInterface): ValidationResultInterface {
    return String(v).length >= 10 || 'Минимум 10 символов';
  }
  function max10(v: FormValueInterface): ValidationResultInterface {
    return String(v).length <= 10 || 'Максимум 10 символов';
  }

  function min40(v: FormValueInterface): ValidationResultInterface {
    return String(v).length >= 40 || 'Минимум 40 символов';
  }
  function max40(v: FormValueInterface): ValidationResultInterface {
    return String(v).length <= 40 || 'Максимум 40 символов';
  }

  return {
    required,

    email,

    min10,
    max10,

    min40,
    max40,
  };
}
