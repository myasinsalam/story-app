export function transition(callback) {

  if (!document.startViewTransition) {
    callback();
    return;
  }

  document
    .startViewTransition(() => {
      callback();
    })
    .finished.catch(() => {
    });
}