export function exeTimeinterval(fn: () => void, time: number) {
  let timer: any = null;

  function interval() {
    fn();
    timer = setTimeout(interval, time);
  }

  interval();

  return {
    cancel() {
      clearTimeout(timer);
    },
  };
}
