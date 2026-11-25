import { assetUrl } from './assetUrl';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Download, Menu, X, Github, Linkedin, Mail, Plus, ArrowRight, Sparkles, BrainCircuit, Code2 } from 'lucide-react';
import './style.css';
import ContentSections from './ContentSections';
import { PROJECTS } from './projects';
const PROFILE={name:'Mohamed Amine Kabtni',headline:['Building','Intelligent Solutions'],eyebrow:'AI · DATA SCIENCE · MACHINE LEARNING',intro:'Hey, I’m Amine. I turn data and ambitious ideas into intelligent, practical solutions.',summary:'Exploring machine learning, computer vision, NLP, and the ideas that connect intelligent systems with real-world impact.',email:'amine.kabtani@ieee.org',github:'https://github.com/aminekabtni1',linkedin:'https://www.linkedin.com/in/mohamed-amine-kabtni-6b0240339',resume:assetUrl('CV_MohamedAmineKabtni.pdf')};


function Corners(){return <><span className="corner top-left">+</span><span className="corner top-right">+</span><span className="corner bottom-left">+</span><span className="corner bottom-right">+</span></>}
function App(){const [menuOpen,setMenuOpen]=useState(false);return <div className="page-frame"><main>
<section className="hero" id="home"><div className="grid-lines" aria-hidden="true"><i/><i/><i/><i/></div><header className="topbar"><a className="eyebrow" href="#home">{PROFILE.eyebrow}</a><nav className="toplinks"><a className="pill talk glass-button" href={`mailto:${PROFILE.email}`}>Let’s Talk <span className="circle"><Mail size={16}/></span></a><a className="pill glass-button" href={PROFILE.resume||'#about'} download={!!PROFILE.resume}>My Resume <span className="circle"><Download size={17}/></span></a><button className="menu-button glass-button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X size={22}/>:<Menu size={22}/>}</button></nav>{menuOpen&&<div className="dropdown">{[['About','about'],['Journey','journey'],['Projects','projects'],['Leadership','leadership'],['Certifications','certifications'],['Contact','contact']].map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setMenuOpen(false)}>{label}</a>)}</div>}</header>
<div className="hero-content"><h1><span>{PROFILE.headline[0]}</span><span>{PROFILE.headline[1]}</span></h1><div className="hero-bottom"><div className="side-card left"><Corners/><p>{PROFILE.intro}</p><a className="cta glass-button" href={`mailto:${PROFILE.email}`}>Let's Talk Now <span><ArrowUpRight size={21}/></span></a></div><div className="portrait-slot"><img src={assetUrl('portrait.png')} width="1500" height="2000" decoding="async" alt="Portrait of Mohamed Amine Kabtni" className="portrait"/></div><div className="side-card right"><Corners/><p>{PROFILE.summary}</p><div className="socials"><a className="social-button" aria-label="GitHub" href={PROFILE.github} target="_blank" rel="noreferrer"><Github size={22}/></a>{PROFILE.linkedin&&<a className="social-button" aria-label="LinkedIn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={22}/></a>}<a className="social-button" aria-label="Email" href={`mailto:${PROFILE.email}`}><Mail size={21}/></a></div></div></div></div></section>
<nav className="section-nav"><a href="#about"><Plus/> My Story</a><a href="#journey"><Plus/> My Path to AI & Data Science</a><a href="#projects"><Plus/> Selected Works</a></nav>
<ContentSections profile={PROFILE} projects={PROJECTS}/>
</main></div>};

createRoot(document.getElementById('root')).render(<App/>);


import './glass.css';

import './viewport.css';
