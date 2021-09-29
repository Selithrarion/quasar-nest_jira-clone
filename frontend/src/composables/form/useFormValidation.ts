import userRepository from 'src/repositories/userRepository';

interface UseFormValidation {
  required: (v: FormValue) => ValidationResult;

  email: (v: FormValue) => ValidationResult;
  uniqueUsername: (v: FormValue) => ValidationResult;
  uniqueEmail: (v: FormValue) => ValidationResult;

  min10: (v: FormValue) => ValidationResult;
  min40: (v: FormValue) => ValidationResult;

  max10: (v: FormValue) => ValidationResult;
  max24: (v: FormValue) => ValidationResult;
  max40: (v: FormValue) => ValidationResult;
  max64: (v: FormValue) => ValidationResult;
  max128: (v: FormValue) => ValidationResult;
}

type FormValue = string | number;
type ValidationResult = Promise<boolean | string> | boolean | string;

export default function useFormValidation(): UseFormValidation {
  function required(v: FormValue): ValidationResult {
    return !!v || 'Обязательное поле';
  }

  function email(v: FormValue): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(v)) || 'Неверный формат Email';
  }
  async function uniqueUsername(v: FormValue): Promise<boolean | string> {
    const isTaken = await userRepository.isUsernameTaken(v);
    return !isTaken || 'Имя пользователя уже занято';
  }
  async function uniqueEmail(v: FormValue): Promise<boolean | string> {
    const isTaken = await userRepository.isEmailTaken(v);
    return !isTaken || 'Такой email уже зарегистрирован';
  }

  function min10(v: FormValue): ValidationResult {
    return String(v).length >= 10 || 'Минимум 10 символов';
  }
  function min40(v: FormValue): ValidationResult {
    return String(v).length >= 40 || 'Минимум 40 символов';
  }

  function max10(v: FormValue): ValidationResult {
    return String(v).length <= 10 || 'Максимум 10 символов';
  }
  function max24(v: FormValue): ValidationResult {
    return String(v).length <= 24 || 'Максимум 10 символов';
  }
  function max40(v: FormValue): ValidationResult {
    return String(v).length <= 40 || 'Максимум 40 символов';
  }
  function max64(v: FormValue): ValidationResult {
    return String(v).length <= 64 || 'Максимум 40 символов';
  }
  function max128(v: FormValue): ValidationResult {
    return String(v).length <= 128 || t('validation.maxChars', 128);
  }

  return {
    required,

    email,
    uniqueUsername,
    uniqueEmail,

    min10,
    min40,

    max10,
    max24,
    max40,
    max64,
    max128,
  };
}
