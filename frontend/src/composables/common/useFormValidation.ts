type FormValue = string | number;
type RuleValue = boolean | string;

interface RulesInterface {
  required: (v: FormValue) => RuleValue;
  min10: (v: FormValue) => RuleValue;
  max10: (v: FormValue) => RuleValue;
  min40: (v: FormValue) => RuleValue;
  max40: (v: FormValue) => RuleValue;
}

export default function useFormValidation(): RulesInterface {
  function required(v: FormValue): RuleValue {
    return !!v || 'Обязательное поле';
  }

  function min10(v: FormValue): RuleValue {
    return String(v).length >= 10 || 'Минимум 10 символов';
  }
  function max10(v: FormValue): RuleValue {
    return String(v).length <= 10 || 'Максимум 10 символов';
  }

  function min40(v: FormValue): RuleValue {
    return String(v).length >= 40 || 'Минимум 40 символов';
  }
  function max40(v: FormValue): RuleValue {
    return String(v).length <= 40 || 'Максимум 40 символов';
  }

  return { required, min10, max10, min40, max40 };
}
