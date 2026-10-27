import { assetUrl } from './assets.js';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const storePhotos = [
  { src: assetUrl('/assets/storefront-wide.webp'), alt: 'Mặt tiền cửa hàng Hùng Nhi', position: '50% 50%' },
  { src: assetUrl('/assets/warehouse-tools.webp'), alt: 'Khu trưng bày máy móc và dụng cụ thực tế tại Hùng Nhi', position: '72% 40%' },
  { src: assetUrl('/assets/shop-interior.webp'), alt: 'Không gian bên trong cửa hàng Hùng Nhi', position: '50% 48%' },
  { src: assetUrl('/assets/tools-wall.webp'), alt: 'Khu trưng bày dụng cụ cầm tay tại Hùng Nhi', position: '50% 42%' },
  { src: assetUrl('/assets/steel-stock.webp'), alt: 'Kệ vật tư kim khí tại cửa hàng Hùng Nhi', position: '55% 50%' },
  { src: assetUrl('/assets/pipe-stock.webp'), alt: 'Khu vật tư ống và phụ kiện tại cửa hàng Hùng Nhi', position: '55% 45%' },
];

export default function HeroGallery() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % storePhotos.length), 3000);
    return () => window.clearTimeout(timer);
  }, [index]);

  const move = direction => setIndex(current => (current + direction + storePhotos.length) % storePhotos.length);
  return <div className="hero-gallery" role="group" aria-roledescription="trình chiếu" aria-label="Ảnh thực tế cửa hàng Hùng Nhi" data-active-slide={index}>
    {storePhotos.map((photo,i) => <img key={photo.src} className={`hero-gallery-image ${i===index?'is-active':''}`} src={photo.src} alt={photo.alt} style={{objectPosition:photo.position}} aria-hidden={i!==index} fetchPriority={i===0?'high':'low'}/>)}
    <div className="hero-gallery-controls">
      <button type="button" onClick={()=>move(-1)} aria-label="Ảnh cửa hàng trước"><ArrowLeft size={19}/></button>
      <div className="hero-gallery-dots" aria-label="Chọn ảnh cửa hàng">{storePhotos.map((photo,i)=><button type="button" className={`hero-gallery-dot ${i===index?'is-active':''}`} aria-label={`Xem ảnh cửa hàng ${i+1}`} aria-current={i===index?'true':undefined} key={photo.src} onClick={()=>setIndex(i)}><span/></button>)}</div>
      <button type="button" onClick={()=>move(1)} aria-label="Ảnh cửa hàng tiếp theo"><ArrowRight size={19}/></button>
    </div>
  </div>;
}
