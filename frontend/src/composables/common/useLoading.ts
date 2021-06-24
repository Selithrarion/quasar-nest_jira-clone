import { ref, Ref } from 'vue';

interface LoadingInterface {
  status: Ref<boolean>;
  start: () => void;
  stop: () => void;
}

export default function useLoading(): LoadingInterface {
  const status = ref(false);
  const start = () => (status.value = true);
  const stop = () => (status.value = false);

  return {
    status,
    start,
    stop,
  };
}
