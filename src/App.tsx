import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Instagram, MapPin, Menu, MessageCircle, Plus, Star, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const whatsappHref = 'https://wa.me/5511999999999?text=Oi%2C%20J%C3%BAlia%21%20Quero%20conhecer%20o%20acompanhamento.&utm_source=site';

const faqs = [
  {
    question: 'Preciso seguir uma dieta muito restritiva?',
    answer: 'Não. O acompanhamento parte da sua rotina, preferências e momento de vida para construir escolhas que façam sentido no dia a dia — sem um listão impossível de sustentar.',
  },
  {
    question: 'O atendimento é presencial ou on-line?',
    answer: 'O atendimento pode acompanhar a sua realidade. Fale com a Júlia pelo WhatsApp para entender o formato mais adequado para você.',
  },
  {
    question: 'O acompanhamento é só para emagrecimento?',
    answer: 'Não. A atuação também é voltada à saúde da mulher, com espaço para olhar para alimentação, rotina e objetivos de forma individualizada.',
  },
  {
    question: 'Como saber se este acompanhamento é para mim?',
    answer: 'Se você está cansada de começar de novo e procura orientação prática, humana e baseada na sua vida real, a conversa inicial é um bom próximo passo.',
  },
];

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function WhatsAppButton({ children, className = '', light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      data-testid="link-whatsapp"
      className={`focus-ring group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-[13px] font-semibold tracking-[.01em] transition-all duration-300 hover:-translate-y-1 ${light ? 'bg-[#f7f3e9] text-[#33433d] hover:bg-white' : 'bg-[#a47041] text-[#f7f3e9] hover:bg-[#8f5e34]'} ${className}`}
    >
      <MessageCircle size={17} strokeWidth={1.8} />
      {children}
      <ArrowUpRight size={16} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const links = [
    { label: 'Meu jeito de cuidar', href: '#metodo' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Dúvidas', href: '#duvidas' },
  ];
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#30433c]/10 bg-[#f7f3e9]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-6 lg:px-10">
        <a href="#inicio" data-testid="link-logo" className="focus-ring flex items-center gap-3 text-[#30433c]" onClick={closeMenu}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#30433c]/50 font-display text-xl italic">j</span>
          <span className="leading-none">
            <span className="block font-display text-[18px] tracking-[-.02em]">Júlia Zenni</span>
            <span className="mt-1 block font-mono text-[8px] uppercase tracking-[.2em] opacity-70">nutrição gentil</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
          {links.map((link) => (
            <a key={link.href} href={link.href} data-testid={`link-nav-${link.href.slice(1)}`} className="focus-ring text-[12px] font-medium text-[#30433c]/75 transition-colors hover:text-[#a47041]">{link.label}</a>
          ))}
          <WhatsAppButton className="px-5 py-2.5">Conversar com a Júlia</WhatsAppButton>
        </nav>
        <button type="button" data-testid="button-mobile-menu" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} className="focus-ring rounded-full p-2 text-[#30433c] lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {menuOpen && (
        <div className="mx-4 rounded-2xl border border-[#30433c]/10 bg-[#f7f3e9] p-5 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Menu mobile">
            {links.map((link) => (
              <a key={link.href} href={link.href} data-testid={`link-mobile-${link.href.slice(1)}`} onClick={closeMenu} className="focus-ring border-b border-[#30433c]/10 pb-4 text-sm text-[#30433c]">{link.label}</a>
            ))}
            <WhatsAppButton className="mt-1 w-full">Conversar com a Júlia</WhatsAppButton>
          </nav>
        </div>
      )}
    </header>
  );
}

function SectionEyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className={`mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.22em] ${light ? 'text-[#f7f3e9]/65' : 'text-[#a47041]'}`}>
      <span className={`h-px w-8 ${light ? 'bg-[#f7f3e9]/50' : 'bg-[#a47041]'}`} />
      {children}
    </div>
  );
}

function Home() {
  useReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <main id="inicio" className="grain overflow-hidden bg-[#f7f3e9]">
      <Header />

      <section className="relative min-h-[760px] bg-[#dce0d4] lg:min-h-[820px]" aria-labelledby="hero-title">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_23%,rgba(247,243,233,.75),transparent_25%),linear-gradient(115deg,#dce0d4_12%,#e4e4d8_60%,#c9d2c6)]" />
        <div className="relative mx-auto grid min-h-[760px] max-w-[1240px] items-center gap-10 px-6 pb-16 pt-32 lg:min-h-[820px] lg:grid-cols-[.94fr_1.06fr] lg:px-10 lg:pb-10 lg:pt-28">
          <div className="relative z-10 max-w-[570px]">
            <div className="reveal flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.21em] text-[#30433c]/70">
              <span className="h-2 w-2 rounded-full bg-[#a47041]" /> Nutrição para a vida real
            </div>
            <h1 id="hero-title" className="reveal reveal-delay-1 mt-7 max-w-[600px] font-display text-[clamp(3.2rem,7vw,6.55rem)] leading-[.95] tracking-[-.065em] text-[#30433c]">
              Emagrecer pode ser mais <em className="text-[#a47041]">leve.</em>
            </h1>
            <p className="reveal reveal-delay-2 mt-8 max-w-[470px] text-[17px] leading-[1.65] text-[#30433c]/75">
              Emagrecimento e saúde da mulher, com acompanhamento feito pra você — não um listão de dieta.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <WhatsAppButton>Quero conversar sobre meu momento</WhatsAppButton>
              <a href="#metodo" data-testid="link-hero-method" className="focus-ring group inline-flex items-center gap-2 text-[12px] font-semibold text-[#30433c]">
                Conhecer o jeito de cuidar <ArrowDown size={15} className="transition-transform group-hover:translate-y-1" />
              </a>
            </div>
            <div className="reveal reveal-delay-3 mt-12 flex items-center gap-7 border-t border-[#30433c]/15 pt-5">
              <div><span className="block font-display text-2xl text-[#a47041]">5,0</span><span className="mt-1 block font-mono text-[9px] uppercase tracking-[.12em] text-[#30433c]/60">Nota no Google</span></div>
              <div className="h-8 w-px bg-[#30433c]/15" />
              <div><span className="block font-display text-2xl text-[#a47041]">+2.600</span><span className="mt-1 block font-mono text-[9px] uppercase tracking-[.12em] text-[#30433c]/60">Vidas transformadas</span></div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[580px] self-end lg:mt-16">
            <div className="reveal relative ml-auto aspect-[.88] w-[88%] overflow-hidden rounded-[160px_160px_18px_18px] bg-[#a8a474] sm:w-[76%]">
              <img src="/assets/01.png" alt="Júlia Zenni, nutricionista" data-testid="img-hero-julia" className="image-drift h-full w-full object-cover object-center mix-blend-multiply opacity-[.88]" />
              <div className="absolute inset-0 bg-[#d2d3bc]/20" />
            </div>
            <div className="absolute bottom-4 left-0 flex items-center gap-3 rounded-full border border-[#30433c]/15 bg-[#f7f3e9]/90 px-4 py-3 backdrop-blur-sm sm:bottom-10 sm:left-2">
              <div className="flex gap-0.5 text-[#a47041]"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
              <span className="font-mono text-[9px] uppercase tracking-[.1em] text-[#30433c]">Nota 5,0 no Google</span>
            </div>
            <div className="absolute -right-2 top-12 hidden h-28 w-28 rounded-full border border-[#a47041]/40 sm:block" />
            <span aria-hidden="true" className="absolute -left-3 top-24 h-6 w-6 rounded-full border border-[#a47041]/70" />
          </div>
        </div>
        <a href="#manifesto" data-testid="link-scroll-manifesto" className="focus-ring absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono text-[9px] uppercase tracking-[.2em] text-[#30433c]/55 lg:flex">Deslize para continuar <ArrowDown size={13} /></a>
      </section>

      <section id="manifesto" className="relative bg-[#30433c] px-6 py-24 text-[#f7f3e9] lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1160px] gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div className="reveal">
            <SectionEyebrow light>Um outro começo</SectionEyebrow>
            <p className="max-w-[225px] font-display text-[27px] leading-[1.15] text-[#d6d7be]">Seu corpo não precisa de mais uma bronca.</p>
          </div>
          <div className="reveal reveal-delay-1">
            <h2 className="max-w-[810px] font-display text-[clamp(2.7rem,5.7vw,5.6rem)] leading-[.98] tracking-[-.06em]">Talvez você não precise de mais <em className="text-[#c9b38d]">disciplina.</em><br />Precise de um plano que caiba.</h2>
            <p className="mt-8 max-w-[530px] text-[16px] leading-[1.7] text-[#f7f3e9]/65">Entre o trabalho, a casa, os ciclos, a fome e tudo o que acontece no caminho, existe uma forma possível de cuidar de você. A gente começa daí.</p>
          </div>
        </div>
        <div className="mx-auto mt-20 max-w-[1160px] overflow-hidden border-y border-[#f7f3e9]/15 py-4">
          <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap font-mono text-[10px] uppercase tracking-[.2em] text-[#f7f3e9]/45">
            <span>comida sem culpa</span><span className="text-[#c9b38d]">•</span><span>cuidado que considera seu contexto</span><span className="text-[#c9b38d]">•</span><span>saúde da mulher</span><span className="text-[#c9b38d]">•</span><span>comida sem culpa</span><span className="text-[#c9b38d]">•</span><span>cuidado que considera seu contexto</span><span className="text-[#c9b38d]">•</span><span>saúde da mulher</span>
          </div>
        </div>
      </section>

      <section id="metodo" className="bg-[#f7f3e9] px-6 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1160px]">
          <div className="grid gap-12 lg:grid-cols-[.68fr_1.32fr]">
            <div className="reveal">
              <SectionEyebrow>Meu jeito de cuidar</SectionEyebrow>
              <h2 className="max-w-[300px] font-display text-[clamp(2.7rem,5vw,4.8rem)] leading-[.98] tracking-[-.06em] text-[#30433c]">Ciência, escuta e <em className="text-[#a47041]">vida real.</em></h2>
              <p className="mt-7 max-w-[275px] text-sm leading-[1.7] text-[#30433c]/65">Um acompanhamento próximo para você entender o que funciona no seu corpo — e por que funciona.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['01', 'Sem fórmulas prontas', 'Seu plano nasce da conversa, da sua rotina e das suas preferências.'],
                ['02', 'Orientação prática', 'Menos teoria solta. Mais clareza para decidir o que fazer na próxima refeição.'],
                ['03', 'Olhar para a mulher inteira', 'Alimentação, corpo, rotina e fases da vida entram na mesma conversa.'],
                ['04', 'Cuidado sem julgamento', 'Um espaço seguro para falar sobre alimentação com honestidade e acolhimento.'],
              ].map(([number, title, text], index) => (
                <article key={number} className={`reveal reveal-delay-${(index % 3) + 1} group border-t border-[#30433c]/20 py-6 transition-colors hover:border-[#a47041]`}>
                  <div className="flex items-start justify-between"><span className="font-mono text-[10px] text-[#a47041]">{number}</span><ArrowUpRight size={17} className="text-[#30433c]/30 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#a47041]" /></div>
                  <h3 className="mt-12 font-display text-[25px] leading-tight text-[#30433c]">{title}</h3>
                  <p className="mt-3 max-w-[250px] text-[13px] leading-[1.6] text-[#30433c]/60">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e5e5d4] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1160px] items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
          <div className="reveal relative mx-auto w-full max-w-[480px]">
            <div className="aspect-[.83] overflow-hidden rounded-[15px]">
              <img src="/assets/02.png" alt="Júlia em um momento de escuta" data-testid="img-method-julia" className="image-drift h-full w-full object-cover object-center" />
            </div>
            <div className="absolute -bottom-7 -right-4 w-[47%] overflow-hidden rounded-[12px] border-[7px] border-[#e5e5d4] sm:-right-10">
              <img src="/assets/03.png" alt="Júlia Zenni em atendimento" data-testid="img-ethics-julia" className="aspect-square w-full object-cover object-center" />
            </div>
            <span className="absolute -left-6 top-10 font-display text-7xl italic text-[#a47041]/70">“</span>
          </div>
          <div className="reveal reveal-delay-1 lg:pl-10">
            <SectionEyebrow>Para quem está cansada</SectionEyebrow>
            <h2 className="max-w-[540px] font-display text-[clamp(2.7rem,5vw,5rem)] leading-[.99] tracking-[-.06em] text-[#30433c]">Você não é um caso difícil. <em className="text-[#a47041]">Você é única.</em></h2>
            <p className="mt-7 max-w-[470px] text-[16px] leading-[1.75] text-[#30433c]/68">Se cada tentativa parece começar com regras impossíveis e terminar em culpa, talvez o problema não seja você. Um acompanhamento individualizado olha para os detalhes que uma dieta genérica não consegue ver.</p>
            <div className="mt-9 grid gap-3 text-[13px] text-[#30433c]/75">
              {['Quando você começa de novo toda segunda-feira', 'Quando sabe o que “deveria” fazer, mas não consegue sustentar', 'Quando quer emagrecer sem deixar sua saúde para depois'].map((item) => (
                <div key={item} className="flex items-start gap-3"><Check size={16} className="mt-0.5 shrink-0 text-[#a47041]" /> <span>{item}</span></div>
              ))}
            </div>
            <a href="#como-funciona" data-testid="link-identification-next" className="focus-ring mt-10 inline-flex items-center gap-2 border-b border-[#a47041] pb-2 text-[12px] font-semibold text-[#a47041]">É disso que vamos cuidar <ArrowRight size={15} /></a>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-[#f7f3e9] px-6 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1160px]">
          <div className="reveal max-w-[650px]">
            <SectionEyebrow>Como funciona</SectionEyebrow>
            <h2 className="font-display text-[clamp(2.8rem,5.5vw,5.3rem)] leading-[.96] tracking-[-.065em] text-[#30433c]">Cuidado com começo, meio e <em className="text-[#a47041]">continuidade.</em></h2>
          </div>
          <div className="mt-16 grid gap-0 border-y border-[#30433c]/20 lg:grid-cols-3">
            {[
              ['01', 'A conversa', 'Você compartilha seu momento, seus objetivos e o que está pegando. Sem roteiro engessado.'],
              ['02', 'O plano possível', 'A partir do seu contexto, organizamos estratégias práticas para a sua rotina.'],
              ['03', 'O acompanhamento', 'Você não fica sozinha entre uma decisão e outra. O cuidado acompanha o caminho.'],
            ].map(([number, title, text], index) => (
              <article key={number} className={`reveal reveal-delay-${index + 1} relative border-b border-[#30433c]/20 py-9 lg:border-b-0 lg:border-r lg:px-9 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0`}>
                <span className="font-mono text-[11px] text-[#a47041]">{number}</span>
                <h3 className="mt-12 font-display text-[31px] tracking-[-.03em] text-[#30433c]">{title}</h3>
                <p className="mt-4 max-w-[270px] text-sm leading-[1.65] text-[#30433c]/62">{text}</p>
              </article>
            ))}
          </div>
          <div className="reveal mt-16 flex flex-col items-start justify-between gap-7 rounded-2xl bg-[#a8a474] p-8 sm:p-10 lg:flex-row lg:items-center">
            <div><span className="font-mono text-[10px] uppercase tracking-[.18em] text-[#30433c]/60">Primeiro passo</span><p className="mt-3 font-display text-3xl leading-tight text-[#30433c]">Quer me contar o que você está vivendo?</p></div>
            <WhatsAppButton>Falar com a Júlia</WhatsAppButton>
          </div>
        </div>
      </section>

      <section className="bg-[#a47041] px-6 py-24 text-[#f7f3e9] lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1160px]">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
            <div className="reveal">
              <SectionEyebrow light>O que você encontra aqui</SectionEyebrow>
              <h2 className="max-w-[310px] font-display text-[clamp(2.8rem,5vw,4.8rem)] leading-[.98] tracking-[-.06em]">Um lugar para voltar a <em className="text-[#dce0c7]">confiar.</em></h2>
            </div>
            <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {[
                ['Mais clareza', 'para fazer escolhas alimentares sem viver em guerra com a comida.'],
                ['Mais presença', 'para perceber o que seu corpo está pedindo em cada fase.'],
                ['Mais autonomia', 'para levar o cuidado para além da consulta.'],
                ['Mais acolhimento', 'para olhar para suas metas com firmeza e gentileza.'],
              ].map(([title, text], index) => (
                <div key={title} className={`reveal reveal-delay-${(index % 3) + 1} border-t border-[#f7f3e9]/30 pt-5`}>
                  <h3 className="font-display text-[28px] text-[#f7f3e9]">{title}</h3>
                  <p className="mt-2 text-sm leading-[1.6] text-[#f7f3e9]/70">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3e9] px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1160px]">
          <div className="reveal flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><SectionEyebrow>Na prática</SectionEyebrow><h2 className="max-w-[580px] font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-[-.06em] text-[#30433c]">Um consultório que também <em className="text-[#a47041]">cabe em você.</em></h2></div>
            <span className="font-mono text-[10px] uppercase tracking-[.16em] text-[#30433c]/50">Presença & propósito</span>
          </div>
          <div className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:grid-rows-[260px_210px]">
            <div className="reveal overflow-hidden rounded-xl lg:row-span-2"><img src="/assets/04.png" alt="Momentos da trajetória profissional de Júlia Zenni" data-testid="img-journey" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div>
            <div className="reveal reveal-delay-1 overflow-hidden rounded-xl"><img src="/assets/05.png" alt="Consultório de Júlia Zenni" data-testid="img-office" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div>
            <div className="reveal reveal-delay-2 flex flex-col justify-between rounded-xl bg-[#dce0d4] p-7"><span className="font-mono text-[10px] uppercase tracking-[.18em] text-[#30433c]/60">Onde acontece</span><div><MapPin size={20} className="mb-4 text-[#a47041]" /><p className="font-display text-[25px] leading-tight text-[#30433c]">Um espaço pensado para você se sentir à vontade.</p></div></div>
            <div className="reveal reveal-delay-1 flex items-end rounded-xl bg-[#30433c] p-7 text-[#f7f3e9] lg:col-span-2"><p className="max-w-[480px] font-display text-[26px] leading-tight">“Cada conduta é baseada na ciência, não em modismos ou interesses comerciais.”</p></div>
          </div>
        </div>
      </section>

      <section className="bg-[#30433c] px-6 py-24 text-[#f7f3e9] lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1160px] gap-14 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
          <div className="reveal"><SectionEyebrow light>Confiança se constrói</SectionEyebrow><h2 className="font-display text-[clamp(2.8rem,5vw,5rem)] leading-[.96] tracking-[-.06em]">Um número só não conta tudo. <em className="text-[#c9b38d]">Mas ajuda.</em></h2></div>
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="reveal reveal-delay-1 border-t border-[#f7f3e9]/25 pt-5"><div className="flex items-center gap-2 text-[#c9b38d]"><Star size={15} fill="currentColor" /><span className="font-mono text-[10px] uppercase tracking-[.12em]">Google</span></div><p className="mt-5 font-display text-5xl">5,0</p><p className="mt-2 text-sm text-[#f7f3e9]/55">Nota 5,0 no Google</p></div>
            <div className="reveal reveal-delay-2 border-t border-[#f7f3e9]/25 pt-5"><p className="font-display text-5xl text-[#c9b38d]">+5.072</p><p className="mt-2 text-sm text-[#f7f3e9]/55">avaliações</p></div>
            <div className="reveal reveal-delay-3 border-t border-[#f7f3e9]/25 pt-5"><p className="font-display text-5xl text-[#c9b38d]">+2.600</p><p className="mt-2 text-sm text-[#f7f3e9]/55">vidas transformadas</p></div>
          </div>
        </div>
      </section>

      <section id="duvidas" className="bg-[#f7f3e9] px-6 py-24 lg:px-10 lg:py-36">
        <div className="mx-auto grid max-w-[1000px] gap-14 lg:grid-cols-[.76fr_1.24fr]">
          <div className="reveal"><SectionEyebrow>Antes de começar</SectionEyebrow><h2 className="font-display text-[clamp(2.8rem,5vw,4.8rem)] leading-[.97] tracking-[-.06em] text-[#30433c]">Talvez você ainda esteja <em className="text-[#a47041]">pensando.</em></h2><p className="mt-6 max-w-[270px] text-sm leading-[1.7] text-[#30433c]/62">É normal ter dúvidas. O cuidado começa com uma conversa clara.</p></div>
          <div className="reveal reveal-delay-1 border-t border-[#30433c]/20">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="border-b border-[#30433c]/20">
                  <button type="button" data-testid={`button-faq-${index}`} aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)} className="focus-ring flex w-full items-center justify-between gap-5 py-6 text-left">
                    <span className="font-display text-[21px] leading-tight text-[#30433c]">{faq.question}</span>
                    <Plus size={19} className="faq-icon shrink-0 text-[#a47041]" />
                  </button>
                  <div className="faq-panel" data-open={isOpen}><div><p className="max-w-[580px] pb-6 pr-10 text-sm leading-[1.7] text-[#30433c]/65">{faq.answer}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#a8a474] px-6 py-24 lg:px-10 lg:py-32">
        <div className="absolute -right-28 -top-40 h-[480px] w-[480px] rounded-full border border-[#30433c]/15" />
        <div className="absolute -right-14 -top-24 h-[330px] w-[330px] rounded-full border border-[#30433c]/15" />
        <div className="relative mx-auto max-w-[1160px]">
          <div className="reveal max-w-[760px]"><SectionEyebrow>Seu próximo capítulo</SectionEyebrow><h2 className="font-display text-[clamp(3.2rem,7vw,6.8rem)] leading-[.91] tracking-[-.075em] text-[#30433c]">Vamos fazer isso<br /><em>do seu jeito.</em></h2><p className="mt-8 max-w-[420px] text-[16px] leading-[1.7] text-[#30433c]/70">Me conte o que você procura e vamos entender juntas se este acompanhamento faz sentido para você.</p><WhatsAppButton className="mt-9">Quero conversar com a Júlia</WhatsAppButton></div>
        </div>
      </section>

      <footer className="bg-[#30433c] px-6 py-10 text-[#f7f3e9] lg:px-10">
        <div className="mx-auto flex max-w-[1160px] flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div><a href="#inicio" data-testid="link-footer-logo" className="focus-ring font-display text-2xl">Júlia Zenni</a><p className="mt-2 font-mono text-[9px] uppercase tracking-[.18em] text-[#f7f3e9]/45">Nutrição para a vida real</p></div>
          <div className="flex items-center gap-5"><a href="https://www.instagram.com/juliazenni_nutri" target="_blank" rel="noreferrer" data-testid="link-instagram" className="focus-ring text-[#f7f3e9]/70 transition-colors hover:text-[#c9b38d]" aria-label="Instagram da Júlia Zenni"><Instagram size={19} /></a><a href={whatsappHref} target="_blank" rel="noreferrer" data-testid="link-footer-whatsapp" className="focus-ring text-[#f7f3e9]/70 transition-colors hover:text-[#c9b38d]" aria-label="WhatsApp da Júlia Zenni"><MessageCircle size={19} /></a><span className="font-mono text-[9px] text-[#f7f3e9]/35">© {new Date().getFullYear()} Júlia Zenni</span></div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;