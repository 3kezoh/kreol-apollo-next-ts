export const popup = (url: string, windowName: string, h: number, w: number) => {
  const x = window.top.outerWidth / 2 + window.top.screenX - w / 2;
  const y = window.top.outerHeight / 2 + window.top.screenY - h / 2;
  return window.open(url, windowName, `width=${w},height=${h},top=${y},left=${x}`);
};
