import { assetUrl } from './assets.js';
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Phone, Search, Menu, X, ChevronDown, Mail, PackageCheck, ClipboardList, Ruler, Truck, Check, Plus } from 'lucide-react';
import { categories } from './catalogData.js';
import { ZaloLink } from './ConsultationForm.jsx';

export const contact = { phone: '0918 539 848', phones: ['0918 539 848','0919 661 900','0918 682 900'], email: 'hungnhi0306@gmail.com', address: 'Số 826, Quốc lộ 51, Tổ 1, Khu phố Long An, Phường Long Thành, Thành phố Đồng Nai, Việt Nam' };
export const brands = ['TOTAL', 'WADFOW', 'ASAKI', 'DCA', 'BOSCH', 'MAKITA'];
export const brandLogos = { TOTAL: assetUrl('/assets/brand-logos/total.png'), WADFOW: assetUrl('/assets/brand-logos/wadfow.png'), ASAKI: assetUrl('/assets/brand-logos/asaki.svg'), DCA: assetUrl('/assets/brand-logos/dca.png'), BOSCH: assetUrl('/assets/brand-logos/bosch.png'), MAKITA: assetUrl('/assets/brand-logos/makita.png') };
export const storefrontPhoto = assetUrl('/assets/retouched/storefront-unnamed1-clean-v2.webp');
export function BrandLogo(){return <svg className="company-logo" viewBox="454 1330 4053 848" role="img" aria-label="Công ty TNHH TM DV Hùng Nhi" preserveAspectRatio="xMidYMid meet"><image href={assetUrl('/assets/logo/hung-nhi-company-original.png')} width="4961" height="3508"/></svg>;}
export function Button({ to, href, children, secondary = false, light = false, className = '', ...props }) {
  const cls = `button ${secondary ? 'button-secondary' : ''} ${light ? 'button-light' : ''} ${className}`;
  return to ? <Link to={to} className={cls} {...props}>{children}<ArrowUpRight size={18}/></Link> : href ? <a href={href} className={cls} {...props}>{children}<ArrowUpRight size={18}/></a> : <button className={cls} {...props}>{children}<ArrowUpRight size={18}/></button>;
}
export function SectionTitle({ number, eyebrow, title, children, to, link = 'Khám phá thêm', dark = false }) {
  return <div className={`section-heading ${dark ? 'on-dark' : ''}`}><div><p className="eyebrow"><span>{number || 'HÙNG NHI'}</span>{eyebrow}</p><h2>{title}</h2>{children && <p className="section-description">{children}</p>}</div>{to && <Link to={to} className="text-link">{link}<ArrowUpRight size={20}/></Link>}</div>;
}
export function Header({ quoteCount }) {
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const navigate = useNavigate();
  const close = () => {setOpen(false);setMega(false);};
  return <><a className="skip-link" href="#main" onClick={e=>{e.preventDefault();document.getElementById('main')?.focus();document.getElementById('main')?.scrollIntoView();}}>Chuyển đến nội dung</a><div className="topbar"><div className="container"><span>Vật tư cho dân dụng, xây dựng & công nghiệp</span><div><span>Đồng Nai, Việt Nam</span><a href="tel:0918539848"><Phone size={13}/> {contact.phone}</a></div></div></div>
    <header className="site-header"><div className="container header-main"><Link to="/" onClick={close} aria-label="Hùng Nhi — Trang chủ" className="logo-link"><BrandLogo/></Link><nav aria-label="Điều hướng chính" className={open ? 'nav-open' : ''}>
      <NavLink to="/gioi-thieu" onClick={close}>Giới thiệu</NavLink><div className="products-nav"><div className="nav-product-row"><NavLink to="/san-pham" onClick={close}>Sản phẩm</NavLink><button aria-label="Mở danh mục sản phẩm" aria-expanded={mega} onClick={()=>setMega(!mega)}><ChevronDown size={14}/></button></div></div>
      <NavLink to="/thuong-hieu" onClick={close}>Thương hiệu</NavLink><NavLink to="/giai-phap" onClick={close}>Giải pháp</NavLink><NavLink to="/lien-he" onClick={close}>Liên hệ</NavLink>
    </nav><div className="header-actions"><button className="icon-button search-trigger" aria-label="Tìm sản phẩm" onClick={()=>{navigate('/san-pham?focus=search');close();}}><Search size={21}/></button><Link className="header-quote" to="/bao-gia" onClick={close}>Yêu cầu báo giá {quoteCount > 0 && <span>{quoteCount}</span>}<ArrowUpRight size={17}/></Link><button className="icon-button mobile-menu" aria-expanded={open} aria-label={open?'Đóng menu':'Mở menu'} onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div></div>
      {mega && <div className="mega-menu"><div className="container"><div className="mega-intro"><p className="eyebrow">DANH MỤC VẬT TƯ</p><h3>Tìm đúng nhóm.<br/>Chọn đúng sản phẩm.</h3><Link to="/danh-muc" onClick={close} className="text-link">Tất cả danh mục<ArrowRight size={17}/></Link></div><div className="mega-links">{categories.map(c=><Link key={c.id} to={`/danh-muc/${c.id}`} onClick={close}>{c.name}<ArrowUpRight size={15}/></Link>)}</div></div></div>}
    </header></>;
}
export function Footer() {
  return <footer className="footer compact-footer"><div className="container compact-footer-grid"><div className="compact-footer-about"><Link to="/" className="compact-footer-logo" aria-label="Hùng Nhi — Trang chủ"><BrandLogo/></Link><p>Cung cấp máy móc, dụng cụ và vật tư phục vụ dân dụng, xây dựng và công nghiệp.</p><small>© 2026 Hùng Nhi. All rights reserved.</small></div><div className="compact-footer-contact"><a href={`tel:${contact.phone.replaceAll(' ','')}`}><Phone size={18}/>{contact.phone}</a><a href={`mailto:${contact.email}`}><Mail size={18}/>{contact.email}</a></div><div className="compact-footer-navigation"><nav aria-label="Liên kết cuối trang"><Link to="/san-pham">Sản phẩm</Link><Link to="/thuong-hieu">Thương hiệu</Link><Link to="/gioi-thieu">Về Hùng Nhi</Link><Link to="/lien-he">Liên hệ</Link></nav><ZaloLink compact/></div></div></footer>;
}
export function QuoteCTA() {
  return <section className="quote-cta"><div className="container"><div><p className="eyebrow">LIÊN HỆ HÙNG NHI</p><h2>Để việc chọn vật tư<br/>trở nên đơn giản hơn.</h2><p>Gửi sản phẩm bạn cần hoặc công việc bạn đang thực hiện.<br/>Hùng Nhi sẽ hỗ trợ lựa chọn và báo giá phù hợp.</p></div><div><Button to="/bao-gia" light>Gửi yêu cầu báo giá</Button><a className="cta-phone" href="tel:0918539848"><Phone size={21}/><span><small>Hoặc trao đổi trực tiếp</small>{contact.phone}</span></a></div></div></section>;
}
export function ProductCard({ product, addQuote, selected }) {
  return <article className="product-card"><Link className="product-image" to={`/san-pham/${product.id}`} aria-label={`Xem ${product.name}`}><img src={product.image} alt={product.name} loading="lazy"/><span>{product.brand}</span></Link><div className="product-info"><div className="product-meta"><span>{product.brand}</span><span>{product.sku}</span></div><Link to={`/san-pham/${product.id}`} className="product-name">{product.name.replace(/\s*TOTAL\s*-\s*\w+$/, '')}</Link><div className="product-card-bottom"><Link to={`/san-pham/${product.id}`}>Chi tiết<ArrowUpRight size={14}/></Link><button onClick={()=>addQuote(product)} className={selected?'selected':''} aria-label={selected?`${product.sku} đã trong yêu cầu`:`Thêm ${product.sku} vào yêu cầu báo giá`}>{selected?<Check size={16}/>:<Plus size={16}/>}<span>{selected?'Đã thêm':'Báo giá'}</span></button></div></div></article>;
}
export function CategoryCard({ category }) {
  return <Link className="category-card" to={`/danh-muc/${category.id}`}><div className="category-image"><img src={category.image} alt={`${category.illustrative?'Hình minh họa AI':'Hình ảnh vật tư Hùng Nhi'} — ${category.name}`} loading="lazy"/>{category.illustrative&&<small className="illustration-label">MINH HỌA AI</small>}</div><div className="category-caption"><div><h3>{category.name}</h3><p>{category.children.slice(0,3).map(c=>c.name).join(' · ')}</p></div><ArrowUpRight size={22}/></div></Link>;
}
export const strengths = [
  {icon:ClipboardList,title:'Danh mục rõ ràng',description:'Tìm vật tư theo nhóm hàng và nhu cầu công việc.'},
  {icon:Ruler,title:'Đối chiếu quy cách',description:'Trao đổi mã hàng, kích thước và thông số trước khi chọn.'},
  {icon:PackageCheck,title:'Báo giá đủ thông tin',description:'Tập hợp sản phẩm, số lượng và yêu cầu trong một danh sách.'},
  {icon:Truck,title:'Phối hợp giao nhận',description:'Làm rõ phương án giao nhận theo nhu cầu từng đơn hàng.'},
];
