import { ref, Ref } from 'vue';

declare interface DialogInterface {
  opened: Ref<string | null>;
  open: (name: string) => void;
  close: () => void;
}

export default function useDialog(): DialogInterface {
  const opened = ref<string | null>(null);

  function open(name: string) {
    opened.value = name;
  }
  function close() {
    opened.value = null;
  }

  return {
    opened,
    open,
    close,
  };
}
