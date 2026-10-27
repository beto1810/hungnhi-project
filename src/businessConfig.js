// Public integration settings only. No credentials belong in VITE_* variables.
function confirmedZaloURL(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || !['zalo.me', 'chat.zalo.me', 'oa.zalo.me'].includes(url.hostname)) return null;
    return url.href;
  } catch { return null; }
}

function configuredEndpoint(value) {
  if (!value) return null;
  try {
    const url = new URL(value, window.location.origin);
    // This source has no verified third-party receiver. Integrate through the
    // existing application's own backend rather than inventing an external one.
    if (url.origin !== window.location.origin || url.username || url.password) return null;
    return url.pathname + url.search;
  } catch { return null; }
}

export const quotationConfig = {
  endpoint: configuredEndpoint(import.meta.env?.VITE_QUOTE_ENDPOINT?.trim()),
  zaloUrl: confirmedZaloURL(import.meta.env?.VITE_ZALO_URL?.trim()),
  maxFileBytes: 5 * 1024 * 1024,
  maxTotalBytes: 15 * 1024 * 1024,
  maxFiles: 5,
};

const allowedTypes = {
  xls: ['application/vnd.ms-excel', 'application/octet-stream'],
  xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/octet-stream'],
  pdf: ['application/pdf'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
  png: ['image/png'],
};

export function validateAttachments(files) {
  if (files.length > quotationConfig.maxFiles) return 'Vui lòng chọn tối đa 5 tệp.';
  if (files.reduce((sum, file) => sum + file.size, 0) > quotationConfig.maxTotalBytes) return 'Tổng dung lượng tệp không được vượt quá 15 MB.';
  for (const file of files) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const types = allowedTypes[extension];
    if (!types || (file.type && !types.includes(file.type))) return 'Chỉ hỗ trợ tệp Excel (.xls, .xlsx), PDF, JPG và PNG.';
    if (file.size === 0) return 'Tệp đính kèm không được rỗng.';
    if (file.size > quotationConfig.maxFileBytes) return 'Mỗi tệp không được vượt quá 5 MB.';
  }
  return null;
}

export async function sendQuotation(fields, files, endpoint = quotationConfig.endpoint) {
  if (!endpoint) throw new Error('NOT_CONNECTED');
  const attachmentError = validateAttachments(files);
  if (attachmentError) throw new Error('INVALID_ATTACHMENT');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const body = new FormData();
    for (const [key, value] of Object.entries(fields)) body.append(key, value.trim());
    for (const file of files) body.append('attachments', file);
    const response = await fetch(endpoint, { method: 'POST', body, credentials: 'same-origin', signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('SEND_FAILED');
    const result = await response.json().catch(() => null);
    if (result?.success !== true) throw new Error('UNCONFIRMED');
    return { requestId: typeof result.requestId === 'string' ? result.requestId : null };
  } finally { clearTimeout(timeout); }
}
