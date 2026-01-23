import React from 'react';
import { Link } from 'react-router-dom';
import { LEARNING_URL } from '../config';

const AboutPage: React.FC = () => {
  const logos = [
    'LEADERS', 'GLOBAL LABS', 'INNOVATE CORP', 'VISIONARY GROUP', 'CORE PARTNER', 
    'ELITE SYSTEMS', 'FUTURE TECH', 'NEXUS AI', 'STRATOS'
  ];

  return (
    <div className="animate-in fade-in duration-1000 bg-white">
      {/* Hero Section - Reduced padding from 48/56 to 36/44 for a better fit */}
      <section className="relative pt-36 pb-12 lg:pt-44 lg:pb-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-left">
              <h1 className="font-heading text-6xl md:text-8xl font-bold leading-[1.05] tracking-tighter mb-10 text-slate-900">
                Empowering Builders for the<br/>
                <span className="inline-block px-10 py-4 rounded-[2.5rem] accent-gradient text-white mt-4 shadow-2xl shadow-purple-200">AI Shift</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-xl font-light font-body mb-12">
                WeCreate is a strategic studio bridging the gap between human ambition and technological capability through expert-led AI education and high-impact consulting.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link to="/contact" className="bg-navy text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-navy/20">
                  WORK WITH US
                </Link>
                <a href={LEARNING_URL} target="_blank" rel="noopener noreferrer" className="bg-white border border-slate-200 text-slate-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                  EXPLORE PATHS
                </a>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[4rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
                <img 
                  alt="Team collaborating" 
                  className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute right-[-10%] top-[-5%] w-[60%] h-[120%] opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M44.7,-76.4C58.2,-69.2,70.1,-58.5,78.2,-45.3C86.3,-32.1,90.6,-16.1,88.7,-0.9C86.8,14.2,78.8,28.4,69.5,40.8C60.2,53.2,49.6,63.8,36.8,71.1C24,78.4,9,82.4,-6.1,81.1C-21.2,79.8,-36.5,73.1,-49.1,63.4C-61.7,53.7,-71.7,40.9,-77.6,26.5C-83.5,12.1,-85.4,-3.8,-82.1,-18.8C-78.7,-33.7,-70.2,-47.7,-58.4,-55.8C-46.7,-63.9,-31.6,-66.2,-17.7,-71.1C-3.8,-76.1,9,-83.6,24.5,-83.4C40,-83.2,44.7,-76.4,44.7,-76.4Z" fill="currentColor" className="text-primary" transform="translate(100 100)"></path>
          </svg>
        </div>
      </section>

      {/* Mission Vision Section - Reduced bottom padding */}
      <section className="pb-16 sm:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-slate-50 p-12 lg:p-16 rounded-[3rem] border border-slate-100 shadow-sm hover:translate-y-[-8px] transition-all duration-500">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-[0.2em] mb-8 font-heading">Our Mission</div>
              <p className="text-slate-900 text-3xl lg:text-4xl leading-tight font-heading font-bold">To democratize AI literacy and provide innovators with the strategic skills to build the future.</p>
            </div>
            <div className="bg-slate-50 p-12 lg:p-16 rounded-[3rem] border border-slate-100 shadow-sm hover:translate-y-[-8px] transition-all duration-500">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-[0.2em] mb-8 font-heading">Our Vision</div>
              <p className="text-slate-900 text-3xl lg:text-4xl leading-tight font-heading font-bold">A world where anyone can leverage artificial intelligence to create meaningful, ethical, and scalable impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Reduced vertical padding */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
                <img 
                  alt="Collaboration" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000" 
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white p-6 rounded-[2rem] shadow-xl hidden md:flex items-center justify-center text-center">
                <p className="logo-font text-primary text-xl font-bold">Rooted in Innovation</p>
              </div>
            </div>
            <div className="lg:pl-10">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-6 block font-heading">OUR ORIGIN</span>
              <h2 className="font-heading text-5xl md:text-6xl font-bold mb-10 leading-[1.1] text-slate-900">
                The <span className="text-gradient">WeCreate</span> Story
              </h2>
              <div className="space-y-8 text-lg md:text-xl font-light leading-relaxed text-slate-600 font-body">
                <p>WeCreate emerged from a singular observation: as artificial intelligence began reshaping the global economy, the gap between human ambition and technical ability started to widen.</p>
                <p>Founded in the vibrant heart of South Florida’s tech ecosystem, we set out to build a bridge. We are a collective of strategists, educators, and technologists dedicated to transforming how individuals and organizations interact with AI.</p>
                <p>Our journey is rooted in South Florida’s spirit of innovation, but our mission is global. We don't just teach tools; we cultivate the mindset and frameworks necessary to lead in an AI-augmented world.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaborations & Heritage Section - Reduced vertical padding */}
      <section className="py-12 sm:py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="font-heading text-5xl md:text-[64px] font-bold text-slate-950 mb-4 tracking-tight">Collaborations & Heritage</h2>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 font-heading">TRUSTED BY LEADERS FROM WORLD-CLASS ORGANIZATIONS.</p>
        </div>
        <div className="logo-wall-mask relative w-full">
          <div className="animate-scroll py-8">
            {[...logos, ...logos].map((logo, i) => (
              <div key={i} className="mx-12 flex items-center justify-center min-w-[200px]">
                <span className="text-slate-300 font-bold italic tracking-tighter text-2xl uppercase font-heading">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Paths, One Vision Section - Reduced vertical padding */}
      <section className="py-16 sm:py-24 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="font-heading text-5xl md:text-[64px] font-bold text-slate-950 mb-6 tracking-tight">Two Paths, One Vision</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light font-body leading-relaxed">
            Whether empowering the individual or the organization, our commitment to human-centric AI remains constant.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-navy p-12 lg:p-20 rounded-[3.5rem] shadow-2xl flex flex-col items-start group transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-navy mb-12 shadow-inner">
              <span className="material-symbols-outlined text-3xl font-bold">query_stats</span>
            </div>
            <h3 className="font-heading text-4xl font-bold text-white mb-6">AI Consulting</h3>
            <p className="text-lg text-white/70 font-light font-body leading-relaxed mb-12 flex-1">
              Strategic implementation for high-growth organizations ready to scale. We architect bespoke AI roadmaps, design efficient workflows, and establish ethical governance frameworks tailored to your business objectives.
            </p>
            <Link to="/contact" className="text-[#00d4ff] font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all group/link font-heading">
              Inquire About Consulting <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="bg-white p-12 lg:p-20 rounded-[3.5rem] shadow-xl border border-slate-100 flex flex-col items-start group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white mb-12 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-3xl font-bold">school</span>
            </div>
            <h3 className="font-heading text-4xl font-bold text-slate-950 mb-6">AI Education</h3>
            <p className="text-lg text-slate-500 font-light font-body leading-relaxed mb-12 flex-1">
              Upskilling the next generation of builders with the technical literacy and creative confidence to lead in an automated world. Through immersive cohorts and workshops, we turn potential into active mastery.
            </p>
            <a href={LEARNING_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all group/link font-heading">
              Explore Education <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* Edge Section - Reduced vertical padding */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-5xl md:text-6xl font-bold mb-8 text-slate-900">The WeCreate Edge</h2>
            <p className="text-xl text-slate-500 font-light font-body leading-relaxed">A strategic approach to transformation that balances technical rigor with human-centric application.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
            {[
              { icon: 'precision_manufacturing', title: 'Studio-Led Innovation', desc: 'Our methodology is native to the AI era.' },
              { icon: 'language', title: 'Global Talent Network', desc: 'Access a high-caliber network of practitioners.' },
              { icon: 'psychology', title: 'Practical Mastery', desc: 'Bridging the learning gap for all backgrounds.' },
              { icon: 'hub', title: 'Strategic Ecosystem', desc: 'An integrated network of resources.' },
              { icon: 'trending_up', title: 'High-Impact Results', desc: 'Focusing on measurable operational efficiency.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                </div>
                <h4 className="font-heading text-xl font-bold mb-4 text-slate-900">{item.title}</h4>
                <p className="text-slate-500 text-sm font-light font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Reduced vertical padding */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="accent-gradient text-white rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] rounded-full bg-white blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] rounded-full bg-white blur-[120px]"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="font-heading text-5xl md:text-8xl font-bold mb-10 leading-[0.9] tracking-tighter text-white">Let's Build the Future</h2>
              <p className="text-xl md:text-2xl font-light font-body text-white/90 mb-16 leading-relaxed">
                Whether you are an individual builder or a forward-thinking organization, your AI journey begins here.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <a href={LEARNING_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-white text-primary px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  Start Learning
                </a>
                <Link to="/optimize" className="w-full sm:w-auto border-2 border-white/40 bg-white/10 backdrop-blur-md text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white/20 transition-all duration-300">
                  Get Clarity First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;