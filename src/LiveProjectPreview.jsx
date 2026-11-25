import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Maximize2, X, MousePointer2, Pause } from 'lucide-react';
import './preview.css';

export default function LiveProjectPreview({ project }) {
  const [requested, setRequested] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [width, setWidth] = useState(600);
  const viewport = useRef(null), dialog = useRef(null), opener = useRef(null);
  const isLive = project.previewType === 'iframe' && requested && !failed;
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    resize.observe(element); return () => resize.disconnect();
  }, [expanded]);
  useEffect(() => {
    if (!isLive || loaded) return;
    const timeout = setTimeout(() => { setFailed(true); setInteractive(false); }, 25000);
    return () => clearTimeout(timeout);
  }, [isLive, loaded]);
  useEffect(() => {
    if (!expanded) return;
    const prior = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector('button')?.focus();
    const keyboard = event => {
      if (event.key === 'Escape') { setExpanded(false); setInteractive(false); }
      if (event.key === 'Tab') {
        const controls = [...dialog.current.querySelectorAll('button,a,iframe')].filter(el => el.tabIndex !== -1);
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', keyboard);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keyboard); (opener.current || prior)?.focus(); };
  }, [expanded]);
  const start = () => { setRequested(true); setFailed(false); setInteractive(true); };
  const close = () => { setLoaded(false); setExpanded(false); setInteractive(false); };
  const browser = <div className={`lp-browser${expanded ? ' lp-expanded' : ''}`}>
    <div className="lp-toolbar"><span className="lp-dots" aria-hidden="true"><i/><i/><i/></span><span className="lp-host">{new URL(project.liveUrl).hostname}</span><div className="lp-controls">{project.previewType === 'iframe' && <button type="button" onClick={interactive ? () => setInteractive(false) : start} aria-label={`${interactive ? 'Pause' : 'Interact with'} ${project.title} preview`}>{interactive ? <Pause size={14}/> : <MousePointer2 size={14}/>}<span>{interactive ? 'Pause' : 'Interact'}</span></button>}{expanded ? <button type="button" onClick={close} aria-label="Close fullscreen preview"><X size={16}/></button> : <button ref={opener} type="button" onClick={() => { setLoaded(false); setExpanded(true); }} aria-label={`Open ${project.title} fullscreen preview`}><Maximize2 size={14}/></button>}</div></div>
    <div className="lp-viewport" ref={viewport}>
      {(!isLive || !loaded) && <img className="lp-screenshot" src={project.fallbackImage} loading="lazy" width="1280" height="900" alt={`${project.title} — actual application screenshot`}/>}
      {isLive && <iframe className={`lp-frame${interactive && loaded ? ' is-interactive' : ''}`} src={project.liveUrl} title={`${project.title} — live application`} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="fullscreen" tabIndex={interactive && loaded ? 0 : -1} style={{width:1280,height:Math.max(900, (expanded ? window.innerHeight - 150 : 320) / (width / 1280)),transform:`scale(${width / 1280})`,opacity:loaded ? 1 : 0}} onLoad={() => setLoaded(true)} onError={() => {setFailed(true);setInteractive(false);}}/>}
      {isLive && !loaded && <div className="lp-loading" role="status">Loading application…</div>}
      {!interactive && project.previewType === 'iframe' && <button className="lp-activate" type="button" onClick={start}><MousePointer2 size={15}/> Interact with preview</button>}
      {interactive && loaded && <span className="lp-interaction-note">Preview active · Pause above to resume page scrolling</span>}
      {failed && <span className="lp-fallback-note" role="status">Showing application screenshot. Open Live Demo to use the app.</span>}
    </div>
    <div className="lp-bottom"><span>{isLive && loaded ? 'Interactive application preview' : 'Application screenshot'}</span><a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo <ArrowUpRight size={13}/></a></div>
  </div>;
  return <><div className="lp-shell">{!expanded && browser}</div>{expanded && createPortal(<div className="lp-modal" role="dialog" aria-modal="true" aria-label={`${project.title} fullscreen preview`} ref={dialog}>{browser}</div>,document.body)}</>;
}

