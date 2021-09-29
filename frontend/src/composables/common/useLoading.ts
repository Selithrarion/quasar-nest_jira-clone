import { ref, reactive, Ref } from 'vue';

// TODO: make custom var not object with items, but simple refs like active var
interface LoadingInterface {
  active: Ref<boolean>;
  custom: Record<string, boolean>;
  start: (name?: string) => void;
  stop: (name?: string) => void;
}
interface LoadingOptionsInterface {
  default?: boolean;
  customNames?: string[] | null;
}

export default function useLoading(options: LoadingOptionsInterface = {}): LoadingInterface {
  const active = ref(options.default || false);
  const custom = reactive<Record<string, boolean>>({});

  if (options.customNames) {
    options.customNames.forEach((name) => {
      custom[name] = false;
    });
  }

  const start = (name?: string) => {
    if (name) custom[name] = true;
    else active.value = true;
  };
  const stop = (name?: string) => {
    if (name) custom[name] = false;
    else active.value = false;
  };

  return {
    active,
    custom,
    start,
    stop,
  };
}
