import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Header, Footer, Button } from './components.jsx';
import Home from './Home.jsx';
import { About, Categories, Catalog, ProductDetail, Brands, Solutions, Knowledge, Contact, Quotation, NotFound } from './Pages.jsx';
import { products } from './catalogData.js';

export default function App() {
  const [quote,setQuote] = useState(()=>{try{const stored=JSON.parse(localStorage.getItem('hungnhi-demo-quote')||'[]');return Array.isArray(stored)?stored.filter(item=>products.some(p=>p.id===item?.id)).map(item=>({id:item.id,quantity:Math.max(1,Math.min(9999,Number(item.quantity)||1))})):[];}catch{return [];}});
  const [toast,setToast] = useState('');
  const location=useLocation();
  useEffect(()=>{window.scrollTo({top:0,behavior:'instant'});const titles={'/':'Giải pháp vật tư cho mọi nhu cầu','/gioi-thieu':'Giới thiệu','/danh-muc':'Danh mục sản phẩm','/san-pham':'Sản phẩm','/thuong-hieu':'Thương hiệu','/giai-phap':'Giải pháp theo nhu cầu','/kien-thuc':'Kiến thức & hướng dẫn','/lien-he':'Liên hệ','/bao-gia':'Yêu cầu báo giá'};document.title=`${titles[location.pathname]||'Khám phá danh mục'} — Hùng Nhi · Demo`;},[location.pathname]);
  useEffect(()=>{localStorage.setItem('hungnhi-demo-quote',JSON.stringify(quote));},[quote]);
  useEffect(()=>{if(toast){const timer=setTimeout(()=>setToast(''),3500);return()=>clearTimeout(timer);}},[toast]);
  function addQuote(product){setQuote(items=>items.some(p=>p.id===product.id)?items:[...items,{id:product.id,quantity:1}]);setToast(`Đã thêm ${product.sku} vào danh sách báo giá.`);}
  return <><Header quoteCount={quote.length}/><main id="main" tabIndex={-1}><Routes>
    <Route path="/" element={<Home addQuote={addQuote} quote={quote}/>}/>
    <Route path="/gioi-thieu" element={<About/>}/>
    <Route path="/danh-muc" element={<Categories/>}/>
    <Route path="/danh-muc/:categoryId" element={<Catalog addQuote={addQuote} quote={quote}/>}/>
    <Route path="/san-pham" element={<Catalog addQuote={addQuote} quote={quote}/>}/>
    <Route path="/san-pham/:productId" element={<ProductDetail addQuote={addQuote} quote={quote}/>}/>
    <Route path="/thuong-hieu" element={<Brands/>}/>
    <Route path="/giai-phap" element={<Solutions/>}/>
    <Route path="/giai-phap/:solutionId" element={<Solutions/>}/>
    <Route path="/kien-thuc" element={<Knowledge/>}/>
    <Route path="/kien-thuc/:articleId" element={<Knowledge/>}/>
    <Route path="/lien-he" element={<Contact/>}/>
    <Route path="/bao-gia" element={<Quotation quote={quote} setQuote={setQuote}/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></main><Footer/>{toast&&<div className="toast" role="status">{toast}<Link to="/bao-gia">Xem danh sách →</Link></div>}</>;
}
