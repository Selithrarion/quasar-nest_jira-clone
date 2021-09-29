import userRepository from 'src/repositories/userRepository';
import { useI18n } from 'vue-i18n';

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
  const { t } = useI18n();

  function required(v: FormValue): ValidationResult {
    return !!v || t('validation.required');
  }

  function email(v: FormValue): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(v)) || t('validation.incorrectEmailFormat');
  }
  async function uniqueUsername(v: FormValue): Promise<boolean | string> {
    const isTaken = await userRepository.isUsernameTaken(v);
    return !isTaken || t('validation.usernameTaken');
  }
  async function uniqueEmail(v: FormValue): Promise<boolean | string> {
    const isTaken = await userRepository.isEmailTaken(v);
    return !isTaken || t('validation.emailTaken');
  }

  function min10(v: FormValue): ValidationResult {
    return String(v).length >= 10 || t('validation.minChars', 10);
  }
  function min40(v: FormValue): ValidationResult {
    return String(v).length >= 40 || t('validation.minChars', 40);
  }

  function max10(v: FormValue): ValidationResult {
    return String(v).length <= 10 || t('validation.maxChars', 10);
  }
  function max24(v: FormValue): ValidationResult {
    return String(v).length <= 24 || t('validation.maxChars', 24);
  }
  function max40(v: FormValue): ValidationResult {
    return String(v).length <= 40 || t('validation.maxChars', 40);
  }
  function max64(v: FormValue): ValidationResult {
    return String(v).length <= 64 || t('validation.maxChars', 64);
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
