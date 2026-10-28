import React, { useId, useRef, useState } from 'react';
import { MessageCircle, Paperclip, ArrowUpRight, X, FileText, LoaderCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { quotationConfig, validateAttachments, sendQuotation } from './businessConfig.js';

export function ZaloLink({ compact = false }) {
  const label = compact ? 'Zalo' : 'Liên hệ qua Zalo';
  return <div className={`zalo-control ${compact ? 'zalo-compact' : ''}`}>
    {quotationConfig.zaloUrl
      ? <a className="zalo-button" href={quotationConfig.zaloUrl} target="_blank" rel="noreferrer"><MessageCircle size={17}/>{label}<ArrowUpRight size={16}/></a>
      : <><button className="zalo-button" disabled type="button" title="Chưa có URL Zalo được xác nhận"><MessageCircle size={17}/>{label}<ArrowUpRight size={16}/></button><small>Chờ cấu hình URL Zalo đã xác nhận.</small></>}
  </div>;
}

export default function ConsultationForm() {
  const prefix = useId();
  const [fields, setFields] = useState({ name: '', phone: '', email: '', company: '', requirements: '' });
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState('');
  const [state, setState] = useState({ status: 'idle', message: '' });
  const inputRef = useRef();
  const inputId = name => `${prefix}-${name}`;
  const isSending = state.status === 'sending';

  function update(event) {
    const { name, value } = event.target;
    setFields(current => ({ ...current, [name]: value }));
    if (state.status !== 'idle') setState({ status: 'idle', message: '' });
  }

  function selectFiles(event) {
    const selected = [...event.target.files];
    const error = validateAttachments(selected);
    setFileError(error || '');
    setFiles(error ? [] : selected);
    if (error) event.target.value = '';
    setState({ status: 'idle', message: '' });
  }

  function removeFile(index) {
    setFiles(current => current.filter((_, i) => i !== index));
    if (inputRef.current) inputRef.current.value = '';
  }

  async function submit(event) {
    event.preventDefault();
    if (isSending) return;
    if (!fields.name.trim() || !fields.phone.trim() || !fields.requirements.trim()) {
      setState({ status: 'error', message: 'Vui lòng điền họ tên, số điện thoại và nhu cầu sản phẩm.' });
      return;
    }
    const phoneDigits = fields.phone.replace(/\D/g, '');
    if (!/^\+?[0-9 ()-]+$/.test(fields.phone.trim()) || phoneDigits.length < 8 || phoneDigits.length > 15) {
      setState({ status: 'error', message: 'Vui lòng kiểm tra số điện thoại liên hệ (8–15 chữ số).' });
      return;
    }
    if (fileError) return;
    if (!quotationConfig.endpoint) {
      setState({ status: 'not-connected', message: 'Yêu cầu chưa được gửi: biểu mẫu chưa kết nối hệ thống tiếp nhận. Vui lòng liên hệ qua số điện thoại hoặc email đã công bố.' });
      return;
    }
    setState({ status: 'sending', message: 'Đang gửi yêu cầu, vui lòng chờ…' });
    try {
      await sendQuotation(fields, files);
      setState({ status: 'success', message: 'Hệ thống đã tiếp nhận yêu cầu báo giá của bạn.' });
      setFields({ name: '', phone: '', email: '', company: '', requirements: '' });
      setFiles([]);
      if (inputRef.current) inputRef.current.value = '';
    } catch (error) {
      setState({ status: 'error', message: error.name === 'AbortError' ? 'Quá thời gian chờ xác nhận. Chưa xác nhận được yêu cầu đã gửi; vui lòng kiểm tra trước khi thử lại.' : 'Chưa xác nhận được yêu cầu đã gửi. Vui lòng thử lại hoặc liên hệ trực tiếp.' });
    }
  }

  return <section className="consultation-section" id="tu-van-bao-gia" aria-labelledby="consultation-title"><div className="container consultation-layout">
    <div className="consultation-copy"><p className="eyebrow">TƯ VẤN & BÁO GIÁ</p><h2 id="consultation-title">Gửi nhu cầu,<br/>nhận tư vấn báo giá</h2><p>Có mã hàng, danh sách vật tư hoặc chỉ có hình ảnh? Hãy gửi để chúng tôi hỗ trợ đối chiếu.</p><ZaloLink/></div>
    <form className="consultation-form" onSubmit={submit} aria-label="Form tư vấn báo giá" aria-busy={isSending}>
      <fieldset disabled={isSending}>
        <div className="consultation-fields"><label htmlFor={inputId('name')}>Họ và tên <span>*</span><input id={inputId('name')} required name="name" autoComplete="name" maxLength={100} value={fields.name} onChange={update} placeholder="Họ và tên của bạn"/></label><label htmlFor={inputId('phone')}>Số điện thoại <span>*</span><input id={inputId('phone')} required type="tel" name="phone" autoComplete="tel" pattern="[+0-9 ()-]{8,20}" maxLength={20} value={fields.phone} onChange={update} placeholder="Số điện thoại liên hệ"/></label>
        <label htmlFor={inputId('email')}>Email<input id={inputId('email')} type="email" name="email" autoComplete="email" maxLength={150} value={fields.email} onChange={update} placeholder="Email của bạn"/></label><label htmlFor={inputId('company')}>Tên công ty<input id={inputId('company')} name="company" autoComplete="organization" maxLength={200} value={fields.company} onChange={update} placeholder="Công ty / Đơn vị"/></label>
        <label className="consultation-wide" htmlFor={inputId('requirements')}>Sản phẩm / mã hàng, quy cách và số lượng <span>*</span><textarea id={inputId('requirements')} required name="requirements" rows={4} maxLength={6000} value={fields.requirements} onChange={update} placeholder="Tên hoặc mã sản phẩm, quy cách, số lượng và nội dung cần tư vấn…"/></label></div>
        <div className="consultation-actions"><div className="attachment-control"><label htmlFor={inputId('files')}><Paperclip size={17}/><span>Đính kèm danh sách hoặc hình ảnh</span></label><input ref={inputRef} id={inputId('files')} className="attachment-input" type="file" multiple accept=".xls,.xlsx,.pdf,.jpg,.jpeg,.png" aria-describedby={`${prefix}-file-help`} onChange={selectFiles}/><small id={`${prefix}-file-help`}>Excel, PDF, JPG, PNG · tối đa 5 MB/tệp</small></div><button type="submit" className="button consultation-submit" disabled={isSending}>{isSending?<LoaderCircle className="sending-spinner" size={17}/>:null}{isSending?'Đang gửi yêu cầu…':'Gửi yêu cầu báo giá'}{!isSending&&<ArrowUpRight size={18}/>}</button></div>
        {files.length>0&&<ul className="selected-attachments" aria-label="Tệp đã chọn">{files.map((file,i)=><li key={`${file.name}-${i}`}><FileText size={14}/><span>{file.name}</span><small>{Math.ceil(file.size/1024)} KB</small><button type="button" aria-label={`Bỏ tệp ${file.name}`} onClick={()=>removeFile(i)}><X size={14}/></button></li>)}</ul>}
      </fieldset>
      {fileError&&<p className="consultation-message is-error" role="alert"><AlertCircle size={16}/>{fileError}</p>}
      {state.message&&<p className={`consultation-message ${state.status==='success'?'is-success':state.status==='sending'?'is-sending':'is-error'}`} role={['error','not-connected'].includes(state.status)?'alert':'status'}>{state.status==='success'?<CheckCircle2 size={17}/>:state.status==='sending'?<LoaderCircle size={17} className="sending-spinner"/>:<AlertCircle size={17}/>}<span>{state.message}</span></p>}
      <p className="consultation-privacy">Thông tin được dùng để liên hệ và xử lý yêu cầu của bạn.</p>
      {!quotationConfig.endpoint&&<p className="consultation-connection">Biểu mẫu chưa kết nối hệ thống tiếp nhận; thông tin và tệp chưa được gửi.</p>}
    </form>
  </div></section>;
}
