import test from 'node:test';
import assert from 'node:assert/strict';
import { quotationConfig, validateAttachments, sendQuotation } from '../src/businessConfig.js';

test('unconfigured integration never sends a request', async () => {
  assert.equal(quotationConfig.endpoint, null);
  assert.equal(quotationConfig.zaloUrl, null);
  await assert.rejects(sendQuotation({ name: 'Test' }, []), /NOT_CONNECTED/);
});

test('attachments reject unsupported, disguised, oversized and excessive files', () => {
  assert.equal(validateAttachments([new File(['pdf'], 'list.pdf', { type: 'application/pdf' })]), null);
  assert.equal(validateAttachments([new File(['excel'], 'list.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })]), null);
  for (const file of [new File(['x'],'program.exe'),new File(['x'],'image.png',{type:'application/x-msdownload'}),new File([],'empty.pdf',{type:'application/pdf'}),new File([new Uint8Array(5*1024*1024+1)],'large.pdf',{type:'application/pdf'})]) assert.ok(validateAttachments([file]));
  assert.ok(validateAttachments(Array.from({length:6},(_,i)=>new File(['x'],`${i}.pdf`,{type:'application/pdf'}))));
  assert.ok(validateAttachments(Array.from({length:4},(_,i)=>new File([new Uint8Array(4*1024*1024)],`${i}.pdf`,{type:'application/pdf'}))));
});

test('adapter requires explicit backend confirmation and builds multipart data', async () => {
  const originalFetch = globalThis.fetch;
  const fields={name:' Test ',phone:'0900000000',email:'',company:'',requirements:' Sample '};
  try {
    let posted;
    globalThis.fetch=async (url,options)=>{posted={url,options};return new Response(JSON.stringify({success:true,requestId:'test-1'}),{status:200,headers:{'Content-Type':'application/json'}});};
    const result=await sendQuotation(fields,[new File(['test'],'list.pdf',{type:'application/pdf'})],'/__test/quote');
    assert.equal(result.requestId,'test-1');
    assert.equal(posted.url,'/__test/quote');
    assert.equal(posted.options.body.get('name'),'Test');
    assert.equal(posted.options.body.get('requirements'),'Sample');
    assert.equal(posted.options.body.getAll('attachments').length,1);
    globalThis.fetch=async()=>new Response('<html>Not an API</html>',{status:200});
    await assert.rejects(sendQuotation(fields,[],'/__test/quote'),/UNCONFIRMED/);
    globalThis.fetch=async()=>new Response(JSON.stringify({success:false}),{status:200});
    await assert.rejects(sendQuotation(fields,[],'/__test/quote'),/UNCONFIRMED/);
    globalThis.fetch=async()=>new Response('Unavailable',{status:503});
    await assert.rejects(sendQuotation(fields,[],'/__test/quote'),/SEND_FAILED/);
  } finally {globalThis.fetch=originalFetch;}
});
