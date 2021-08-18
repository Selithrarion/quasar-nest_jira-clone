interface InputValidation {
  getIsNumberKey: (event: KeyboardEvent) => ValidationResult;
}

type ValidationResult = boolean;

export default function useFormValidation(): InputValidation {
  function getIsNumberKey(event: KeyboardEvent): ValidationResult {
    const valid = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete'];
    return valid.includes(event.key);
  }

  return {
    getIsNumberKey,
  };
}
