import { ref, Ref } from 'vue';

interface DialogInterface {
  openedName: Ref<string | null>;
  openedItem: Ref<unknown | null>;
  open: (name: string, options?: DialogOpenOptionsInterface) => void;
  close: () => void;

  loading: Ref<boolean>;
  startLoading: () => void;
  stopLoading: () => void;
}

interface DialogOpenOptionsInterface {
  item?: unknown;
}

export default function useDialog(): DialogInterface {
  const openedName = ref<string | null>(null);
  const openedItem = ref<unknown | null>({});
  function open(name: string, options: DialogOpenOptionsInterface = {}) {
    openedName.value = name;
    openedItem.value = options.item;
  }
  function close() {
    openedName.value = null;
  }

  const loading = ref<boolean>(false);
  function startLoading() {
    loading.value = true;
  }
  function stopLoading() {
    loading.value = false;
  }

  return {
    openedName,
    openedItem,
    open,
    close,

    loading,
    startLoading,
    stopLoading,
  };
}
