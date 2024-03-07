import { toastService } from 'service';

export async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    toastService.info('Copied to clipboard');
    return await navigator.clipboard.writeText(text);
  } else {
    toastService.info('Cannot Copy to clipboard');
  }
}
