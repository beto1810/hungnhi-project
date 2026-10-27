import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

export default function ProductGallery({ product }) {
  const images=product.images?.length?product.images:[product.image];
  const [active,setActive]=useState(0);
  const dialog=useRef(null);
  const move=step=>setActive(index=>(index+step+images.length)%images.length);
  const keyboard=e=>{
    if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}
    if(e.key==='ArrowRight'){e.preventDefault();move(1);}
  };
  return <div className="product-gallery" onKeyDown={keyboard}>
    <div className="detail-image gallery-stage">
      <img src={images[active]} alt={`${product.sku} — ảnh ${active+1} / ${images.length}`} fetchPriority="high"/>
      {images.length>1&&<><button type="button" className="gallery-arrow previous" aria-label="Ảnh sản phẩm trước" onClick={()=>move(-1)}><ChevronLeft size={22}/></button><button type="button" className="gallery-arrow next" aria-label="Ảnh sản phẩm tiếp theo" onClick={()=>move(1)}><ChevronRight size={22}/></button></>}
      <button type="button" className="gallery-expand" onClick={()=>dialog.current.showModal()} aria-label="Phóng to ảnh sản phẩm"><Expand size={17}/></button>
      <span className="gallery-count" aria-live="polite">{active+1} / {images.length}</span>
    </div>
    <div className="gallery-thumbnails" aria-label="Các ảnh sản phẩm">{images.map((src,index)=><button type="button" key={src} className={index===active?'is-active':''} aria-label={`Xem ảnh sản phẩm ${index+1}`} aria-pressed={index===active} onClick={()=>setActive(index)}><img src={src} alt={`${product.sku} — hình thu nhỏ ${index+1}`} loading="lazy"/></button>)}</div>
    <p className="image-source-note">Hình ảnh sản phẩm từ website Hùng Nhi. Đối chiếu cấu hình thực tế khi báo giá.</p>
    <dialog className="product-lightbox" ref={dialog} aria-label={`Ảnh phóng lớn ${product.sku}`} onClick={e=>{if(e.target===e.currentTarget)dialog.current.close();}}>
      <div className="lightbox-content"><button type="button" className="lightbox-close" onClick={()=>dialog.current.close()} aria-label="Đóng ảnh phóng lớn"><X size={23}/></button><img src={images[active]} alt={`${product.sku} — ảnh phóng lớn ${active+1}`}/><div className="lightbox-controls"><button type="button" onClick={()=>move(-1)} aria-label="Ảnh phóng lớn trước"><ChevronLeft/></button><span>{active+1} / {images.length}</span><button type="button" onClick={()=>move(1)} aria-label="Ảnh phóng lớn tiếp theo"><ChevronRight/></button></div></div>
    </dialog>
  </div>;
}

export function SpecificationTable({ rows, caption, compact=false }) {
  return <table className={`product-spec-table${compact?' compact':''}`}><caption>{caption}</caption><tbody>{rows.map(([label,value],i)=><tr key={`${label}-${i}`}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table>;
}

export function ProductSpecifications({ product }) {
  return <><h2>Thông tin chi tiết sản phẩm</h2><p className="spec-source">Thông tin theo mã {product.sku}, ghi nhận từ website Hùng Nhi. Cấu hình đi kèm sẽ được đối chiếu khi báo giá.</p>{product.specSections?.length?product.specSections.map((section,index)=><section className="spec-section" key={`${section.title}-${index}`}><SpecificationTable caption={section.title} rows={section.rows}/></section>):<p>Chưa có thông số kỹ thuật đã xác nhận cho mã này. Vui lòng liên hệ để đối chiếu.</p>}</>;
}
