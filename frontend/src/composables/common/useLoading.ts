import { ref, Ref } from 'vue';

interface LoadingInterface {
  active: Ref<boolean>;
  start: () => void;
  stop: () => void;
}
interface LoadingOptionsInterface {
  default: boolean;
}

export default function useLoading(options: LoadingOptionsInterface = { default: false }): LoadingInterface {
  const active = ref(options.default);
  const start = () => (active.value = true);
  const stop = () => (active.value = false);

  return {
    active,
    start,
    stop,
  };
}
