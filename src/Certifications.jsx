import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, ChevronLeft, ChevronRight, Minus, Plus, X } from 'lucide-react';
import { CERTIFICATES } from './certificates';
import './certifications.css';

function CertificateViewer({initialIndex,onClose}) {
  const [index,setIndex]=useState(initialIndex);
  const [zoom,setZoom]=useState(1);
  const [closing,setClosing]=useState(false);
  const dialog=useRef(null);
  const stage=useRef(null);
  const touch=useRef(null);
  const timer=useRef(null);
  const close=()=>{setClosing(true);timer.current=setTimeout(onClose,180);};
  const move=direction=>{setIndex(i=>(i+direction+CERTIFICATES.length)%CERTIFICATES.length);setZoom(1);if(stage.current){stage.current.scrollTop=0;stage.current.scrollLeft=0;}};
  useEffect(()=>{
    const previous=document.activeElement;
    const overflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    dialog.current.showModal();
    return()=>{clearTimeout(timer.current);document.body.style.overflow=overflow;previous?.focus();};
  },[]);
  const certificate=CERTIFICATES[index];
  return createPortal(<dialog ref={dialog} className={`cert-viewer${closing?' is-closing':''}`} aria-labelledby="certificate-viewer-title" onCancel={event=>{event.preventDefault();close();}} onClick={event=>{if(event.target===event.currentTarget)close();}} onKeyDown={event=>{if(event.key==='ArrowRight'){event.preventDefault();move(1);}if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}}}>
    <div className="cert-viewer-shell">
      <header className="cert-viewer-bar"><div><span>{index+1} / {CERTIFICATES.length} · NVIDIA</span><h3 id="certificate-viewer-title">{certificate.title}</h3></div><button type="button" onClick={close} aria-label="Close certificate viewer"><X size={22}/></button></header>
      <div ref={stage} className="cert-viewer-stage" onTouchStart={event=>{touch.current=event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;}} onTouchEnd={event=>{if(!touch.current||zoom!==1)return;const dx=event.changedTouches[0].clientX-touch.current.x,dy=event.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.5)move(dx<0?1:-1);touch.current=null;}}>
        <div className="cert-zoom-canvas" style={{width:`${zoom*100}%`,height:`${zoom*100}%`}}><img key={certificate.id} src={certificate.image} alt={`${certificate.title} certificate, issued by NVIDIA on ${certificate.issueDate}`} draggable="false"/></div>
      </div>
      <footer className="cert-viewer-controls"><button type="button" onClick={()=>move(-1)} aria-label="Previous certificate"><ChevronLeft size={20}/></button><div className="cert-zoom-controls"><button type="button" disabled={zoom<=1} onClick={()=>setZoom(z=>Math.max(1,z-.5))} aria-label="Zoom out"><Minus size={18}/></button><button type="button" onClick={()=>setZoom(1)} aria-label="Reset zoom">{Math.round(zoom*100)}%</button><button type="button" disabled={zoom>=3} onClick={()=>setZoom(z=>Math.min(3,z+.5))} aria-label="Zoom in"><Plus size={18}/></button></div><button type="button" onClick={()=>move(1)} aria-label="Next certificate"><ChevronRight size={20}/></button></footer>
    </div>
  </dialog>,document.body);
}
export default function Certifications({Reveal,SectionLabel}) {
  const [active,setActive]=useState(null);
  return <section className="cs-section cs-certifications" id="certifications" aria-labelledby="certifications-title">
    <SectionLabel number="05">Certifications</SectionLabel>
    <Reveal><p className="cs-overline cert-subtitle">CONTINUOUS PROFESSIONAL DEVELOPMENT</p><h2 className="cs-heading" id="certifications-title">Knowledge earned.<br/><em>Skills validated.</em></h2></Reveal>
    <div className="cert-gallery">{CERTIFICATES.map((certificate,index)=><Reveal key={certificate.id} delay={index*60}><article className="cert-card"><button className="cert-image-button" type="button" onClick={()=>setActive(index)} aria-label={`View certificate: ${certificate.title}`}><img src={certificate.image} alt={`${certificate.title} — NVIDIA certificate`} loading="lazy" decoding="async" width="1487" height="1925"/></button><div className="cert-details"><p className="cert-issuer">{certificate.issuer}<time>{certificate.issueDate}</time></p><h3>{certificate.title}</h3><button className="cert-open" type="button" onClick={()=>setActive(index)}>View Certificate <ArrowUpRight size={17}/></button></div></article></Reveal>)}</div>
    {active!==null&&<CertificateViewer initialIndex={active} onClose={()=>setActive(null)}/>}
  </section>;
}
