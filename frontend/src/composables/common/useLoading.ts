import { ref, Ref } from 'vue';

interface LoadingInterface {
  active: Ref<boolean>;
  start: () => void;
  stop: () => void;
}

export default function useLoading(): LoadingInterface {
  const active = ref(false);
  const start = () => (active.value = true);
  const stop = () => (active.value = false);

  return {
    active,
    start,
    stop,
  };
}
