export async function mockAsyncTimeout() {
  return await new Promise((res) =>
    setTimeout(() => {
      res({});
    }, 2000)
  );
}
