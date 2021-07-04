import { ref, Ref } from 'vue';

declare interface DialogInterface {
  openedName: Ref<string | null>;
  open: (name: string) => void;
  close: () => void;
}

export default function useDialog(): DialogInterface {
  const openedName = ref<string | null>(null);

  function open(name: string) {
    openedName.value = name;
  }
  function close() {
    openedName.value = null;
  }

  return {
    openedName,
    open,
    close,
  };
}
