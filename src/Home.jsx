import { assetUrl } from './assets.js';
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, ClipboardList, Search, FileText, Truck } from 'lucide-react';
import { Button, SectionTitle, ProductCard, CategoryCard, strengths, brands, brandLogos, storefrontPhoto } from './components.jsx';
import ConsultationForm from './ConsultationForm.jsx';
import HeroGallery from './HeroGallery.jsx';
import { categories } from './catalogData.js';
import { products } from './catalogData.js';

export const articles = [
  {id:'chuan-bi-yeu-cau-bao-gia',title:'Một yêu cầu báo giá rõ ràng bắt đầu từ đâu?',category:'HƯỚNG DẪN MUA HÀNG',image:assetUrl('/assets/warehouse-tools.webp'),description:'Những thông tin nên chuẩn bị để trao đổi vật tư thuận tiện hơn.'},
  {id:'doi-chieu-ma-hang',title:'Mã hàng và quy cách: những thông tin cần đối chiếu',category:'KIẾN THỨC VẬT TƯ',image:assetUrl('/assets/tools-wall.webp'),description:'Ghi lại model, nhãn hàng và quy cách trên sản phẩm bạn đang sử dụng.'},
  {id:'sap-xep-danh-sach-vat-tu',title:'Sắp xếp danh sách vật tư cho từng công việc',category:'GÓC THAM KHẢO',image:assetUrl('/assets/steel-stock.webp'),description:'Gom nhóm và ghi chú nhu cầu để hạn chế bỏ sót khi hỏi hàng.'},
];
export const solutions = [
  {id:'nha-xuong-bao-tri',name:'Nhà xưởng & bảo trì',text:'Vật tư, dụng cụ và thiết bị cho hoạt động thường ngày.',image:assetUrl('/assets/applications/factory-maintenance-v2.webp'),groups:['may-moc-thiet-bi','co-khi-kim-khi','do-luong-kiem-tra']},
  {id:'xay-dung-cong-trinh',name:'Xây dựng & công trình',text:'Tìm nhóm vật tư theo từng hạng mục thi công.',image:assetUrl('/assets/applications/construction-v2.webp'),groups:['xay-dung-cong-trinh','ong-van-phu-kien','bao-ho-lao-dong']},
  {id:'co-khi-gara',name:'Xưởng cơ khí & gia công',text:'Dụng cụ cầm tay, thiết bị và vật tư gia công.',image:assetUrl('/assets/applications/machining-v2.webp'),groups:['dung-cu-cam-tay','han-cat-mai','co-khi-kim-khi']},
  {id:'co-dien',name:'Cơ điện / M&E',text:'Thiết bị điện, ống và phụ kiện cho công việc kỹ thuật.',image:assetUrl('/assets/applications/mep-v2.webp'),groups:['thiet-bi-dien','ong-van-phu-kien','do-luong-kiem-tra']},
];
export default function Home({ addQuote, quote }) {
  const processSteps = [
    { title: 'Gửi nhu cầu', icon: ClipboardList },
    { title: 'Đối chiếu quy cách', icon: Search },
    { title: 'Nhận báo giá', icon: FileText },
    { title: 'Xác nhận & giao hàng', icon: Truck },
  ];
  return <>
    <section className="hero refined-hero"><div className="hero-photo"><HeroGallery/></div><div className="container hero-content"><div className="hero-copy"><p className="eyebrow"><span className="status-dot"/>HÙNG NHI · ĐỒNG HÀNH TỪ NĂM 2006</p><h1>Giải Pháp Vật Tư<br/>Đáp Ứng <em>mọi Nhu Cầu</em></h1><p className="hero-description"><strong className="hero-tagline">Bạn cần vật tư, Hùng Nhi có giải pháp</strong><span>Cung ứng dụng cụ, thiết bị và vật tư công nghiệp đa ngành, đáp ứng nhu cầu mua sắm, bảo trì và vận hành của doanh nghiệp.</span></p><div className="hero-buttons"><Button to="/danh-muc">Khám phá danh mục</Button><Button onClick={()=>document.getElementById('tu-van-bao-gia')?.scrollIntoView({behavior:'smooth'})} secondary>Yêu cầu báo giá</Button></div></div></div><div className="hero-bottom-line"/></section>
    <section className="brand-strip refined-brands"><div className="container"><p><strong>THƯƠNG HIỆU NỔI BẬT</strong></p><div>{brands.map(b=><Link className={`brand-logo-link logo-${b.toLowerCase()}`} aria-label={`Xem thương hiệu ${b}`} to={`/san-pham?brand=${encodeURIComponent(b)}`} key={b}><img src={brandLogos[b]} alt={b} loading="lazy"/></Link>)}</div><Link to="/thuong-hieu" aria-label="Xem thương hiệu"><ArrowUpRight size={22}/></Link></div></section>
    <section className="section about-preview"><div className="container about-grid"><div className="about-image storefront-about-image"><img src={storefrontPhoto} alt="Mặt tiền Hùng Nhi từ unnamed1.png, đã chỉnh ảnh xóa cột điện, người và xe" loading="lazy"/><div className="since-mark"><span>TỪ NĂM</span><strong>2006</strong><span>BỀN BỈ ĐỒNG HÀNH</span></div></div><div className="about-copy"><p className="eyebrow"><span>01</span> VỀ HÙNG NHI</p><h2>Từ nền tảng uy tín<br/>đến giá trị bền vững</h2><p className="lead">Mỗi công việc đều bắt đầu từ việc chọn đúng vật tư.</p><p>Thành lập từ năm 2006, Hùng Nhi cung cấp máy móc, dụng cụ và vật tư cho dân dụng, xây dựng, cơ khí và công nghiệp.</p><p>Từ một mã hàng cụ thể đến một danh sách nhiều hạng mục, chúng tôi cùng bạn làm rõ nhu cầu và lựa chọn sản phẩm phù hợp.</p><Link to="/gioi-thieu" className="text-link">Tìm hiểu về Hùng Nhi<ArrowUpRight size={20}/></Link><div className="about-principle"><span>ĐÚNG SẢN PHẨM</span><span>ĐÚNG QUY CÁCH</span><span>ĐÚNG NHU CẦU</span></div></div></div></section>
    <section className="strengths-strip"><div className="container">{strengths.map(({icon:Icon,title,description},i)=><div key={title} className="strength-item"><Icon size={29} strokeWidth={1.4}/><span className="strength-number">0{i+1}</span><h3>{title}</h3><p>{description}</p></div>)}</div></section>
    <section className="section categories-section"><div className="container"><SectionTitle number="02" eyebrow="KHÁM PHÁ DANH MỤC" title={<>Đa dạng vật tư<br/>Rõ ràng từng nhóm hàng</>} to="/danh-muc" link="Xem đủ 12 nhóm hàng">Tìm theo loại sản phẩm, sau đó chọn thương hiệu và quy cách phù hợp.</SectionTitle><div className="category-grid">{[categories[0],categories[1],categories[3],categories[4],categories[5],categories[2]].map((c,i)=><CategoryCard key={c.id} category={c} index={i}/>)}</div></div></section>
    <section className="section featured-section"><div className="container"><SectionTitle number="03" eyebrow="SẢN PHẨM ĐƯỢC QUAN TÂM" title="Tìm sản phẩm cho công việc của bạn" to="/san-pham" link="Tất cả sản phẩm">Tham khảo mã hàng và gửi yêu cầu để được tư vấn báo giá.</SectionTitle><div className="product-grid">{products.slice(0,4).map(p=><ProductCard key={p.id} product={p} addQuote={addQuote} selected={quote.some(q=>q.id===p.id)}/>)}</div><div className="product-bottom-note"><span>Bạn có sẵn mã hàng hoặc hình ảnh mẫu?</span><Link to="/bao-gia">Gửi yêu cầu để cùng đối chiếu<ArrowUpRight size={17}/></Link></div></div></section>
    <section className="section solutions-section refined-solutions"><div className="container"><SectionTitle number="04" eyebrow="GIẢI PHÁP THEO NHU CẦU" title="GIẢI PHÁP PHÙ HỢP CHO TỪNG NHU CẦU CÔNG VIỆC" to="/giai-phap" link="Khám phá giải pháp" dark>Tiếp cận danh mục từ chính công việc bạn đang thực hiện.</SectionTitle><div className="solution-grid">{solutions.map((s,i)=><Link className="solution-card" to={`/giai-phap/${s.id}`} key={s.id}><img src={s.image} alt={`${s.name} — hình minh họa`} loading="lazy"/><div><span>0{i+1}</span><h3>{s.name}</h3><p>{s.text}</p><ArrowUpRight size={24}/></div></Link>)}</div><p className="solution-image-note">Hình minh họa bối cảnh công việc được tạo bằng AI.</p></div></section>
    <ConsultationForm/>
    <section className="process-section refined-process" aria-label="Quy trình 4 bước"><div className="container process-grid">{processSteps.map(({title,icon:Icon},i)=><div className="process-step" key={title}><span className="process-icon"><Icon size={32} strokeWidth={1.6}/></span><div className="process-step-copy"><span>0{i+1}</span><h3>{title}</h3></div>{i<3&&<ArrowRight className="process-arrow" size={18}/>}</div>)}</div></section>
  </>;
}
