'use client'

import { useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  Filter,
  Heart,
  ImagePlus,
  Link2,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Upload,
  X,
  Zap,
} from 'lucide-react'

type Mode = 'link' | 'image' | 'describe'
type Product = { name: string; store: string; price: number; original: number; image: string; tag: string; rating: string; delivery: string; url: string; score?: number }

const products: Product[] = [
  { name: 'Pastel Floral Puff Sleeve Midi Dress', store: 'Myntra', price: 899, original: 1999, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85', tag: 'Best Price', rating: '4.6 (2.4k)', delivery: 'Free delivery · 2 days', url: 'https://www.myntra.com', score: 98 },
  { name: 'Floral Print Fit & Flare Dress', store: 'Flipkart', price: 1049, original: 2299, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85', tag: 'Exact match', rating: '4.4 (841)', delivery: 'Free delivery · 3 days', url: 'https://www.flipkart.com', score: 94 },
  { name: 'Printed Midi Dress with Puff Sleeves', store: 'Amazon', price: 1199, original: 2499, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=85', tag: 'Exact match', rating: '4.2 (1.1k)', delivery: '₹40 delivery · 2 days', url: 'https://www.amazon.in', score: 91 },
  { name: 'Rose Garden Midi Dress', store: 'Ajio', price: 1290, original: 2790, image: 'https://images.unsplash.com/photo-1585488439601-4f7c4a7d8a7b?auto=format&fit=crop&w=700&q=85', tag: 'Similar · 86%', rating: '4.5 (603)', delivery: 'Free delivery · 4 days', url: 'https://www.ajio.com', score: 86 },
  { name: 'Puff Sleeve Printed Dress', store: 'Meesho', price: 699, original: 1499, image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=700&q=85', tag: 'Similar · 81%', rating: '4.1 (329)', delivery: '₹49 delivery · 5 days', url: 'https://www.meesho.com', score: 81 },
]

const modeCopy: Record<Mode, { label: string; placeholder: string }> = {
  link: { label: 'Product link', placeholder: 'Paste a product link from any store…' },
  image: { label: 'Product photo', placeholder: 'Upload a clear photo of the product…' },
  describe: { label: 'Describe it', placeholder: 'Try “pink floral midi dress under ₹1,000”…' },
}

function money(value: number) { return `₹${value.toLocaleString('en-IN')}` }

export default function Page() {
  const [mode, setMode] = useState<Mode>('describe')
  const [query, setQuery] = useState('')
  const [file, setFile] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [sort, setSort] = useState('relevance')
  const fileRef = useRef<HTMLInputElement>(null)

  const visibleProducts = useMemo(() => {
    const list = [...products]
    if (sort === 'price') list.sort((a, b) => a.price - b.price)
    if (sort === 'discount') list.sort((a, b) => (1 - b.price / b.original) - (1 - a.price / a.original))
    return list
  }, [sort])

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0]
    if (selected) { setFile(URL.createObjectURL(selected)); setMode('image') }
  }

  function submitSearch() {
    if (mode === 'link' && query && !/^https?:\/\//i.test(query)) { setQuery('https://' + query); return }
    setLoading(true); setSearched(false)
    window.setTimeout(() => { setLoading(false); setSearched(true) }, 1100)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fcfaf7] text-[#292733]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight"><span className="grid size-9 place-items-center rounded-xl bg-[#dcd6f7] text-[#5f587c]"><Sparkles size={18} /></span><span className="text-xl">findly<span className="text-[#968acb]">.</span></span></a>
        <div className="hidden items-center gap-8 text-sm font-medium text-[#77737d] md:flex"><a href="#how">How it works</a><a href="#deals">Explore deals</a><a href="#why">Why Findly</a></div>
        <a href="#search" className="hidden rounded-full bg-[#292733] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#4a4657] sm:block">Start searching <ArrowRight className="ml-1 inline" size={15} /></a>
        <button className="rounded-lg p-2 md:hidden" aria-label="Open navigation"><Menu size={22} /></button>
      </nav>

      <section id="top" className="relative mx-auto max-w-7xl px-5 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="pointer-events-none absolute -right-20 top-0 size-80 rounded-full bg-[#f8e8ee] blur-3xl" /><div className="pointer-events-none absolute -left-40 top-60 size-96 rounded-full bg-[#ddf3e4] blur-3xl" />
        <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_0.8fr]">
          <div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#dcd6f7] bg-white/70 px-3.5 py-2 text-xs font-semibold text-[#716892]"><Zap size={14} className="fill-[#a399ce]" /> Smart shopping starts here</div><h1 className="max-w-2xl text-5xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-[78px]">Your next find.<br /><span className="text-[#9a8fc9]">At the best price.</span></h1><p className="mt-6 max-w-xl text-lg leading-8 text-[#77737d]">Found something you love? Upload a photo, paste a link, or describe it. We&apos;ll find the best prices and closest matches across stores.</p>
            <div id="search" className="mt-9 max-w-2xl rounded-[24px] border border-[#e8e3dc] bg-white p-2.5 shadow-[0_18px_50px_rgba(60,51,83,0.08)]">
              <div className="flex gap-1 rounded-2xl bg-[#f8f6f2] p-1"><button onClick={() => setMode('describe')} className={`flex-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition sm:text-sm ${mode === 'describe' ? 'bg-white text-[#292733] shadow-sm' : 'text-[#97929a]'}`}><Search className="mr-1 inline" size={14} /> Describe it</button><button onClick={() => setMode('link')} className={`flex-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition sm:text-sm ${mode === 'link' ? 'bg-white text-[#292733] shadow-sm' : 'text-[#97929a]'}`}><Link2 className="mr-1 inline" size={14} /> Paste link</button><button onClick={() => { setMode('image'); fileRef.current?.click() }} className={`flex-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition sm:text-sm ${mode === 'image' ? 'bg-white text-[#292733] shadow-sm' : 'text-[#97929a]'}`}><ImagePlus className="mr-1 inline" size={14} /> Upload photo</button></div>
              <div className="flex items-center gap-3 p-3"><div className="min-w-0 flex-1">{file && mode === 'image' ? <div className="flex items-center gap-2"><img src={file} alt="Selected product" className="size-10 rounded-lg object-cover" /><span className="truncate text-sm text-[#77737d]">Photo ready to search</span><button onClick={() => setFile(null)} aria-label="Remove photo"><X size={15} /></button></div> : <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.nativeEvent.isComposing && e.keyCode !== 229) submitSearch() }} className="w-full bg-transparent text-sm outline-none placeholder:text-[#b0abb0]" placeholder={modeCopy[mode].placeholder} aria-label={modeCopy[mode].label} />}</div><input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" /><button onClick={submitSearch} disabled={loading} className="shrink-0 rounded-xl bg-[#292733] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#504b5b] disabled:opacity-60">{loading ? 'Searching…' : 'Find best deal'} <ArrowRight className="ml-1 inline" size={15} /></button></div>
            </div><p className="mt-4 flex items-center gap-2 text-xs text-[#9d989b]"><ShieldCheck size={14} className="text-[#7eab8c]" /> One search. Multiple stores. Smarter shopping.</p>
          </div>
          <div className="relative mx-auto w-full max-w-md"><div className="absolute -right-4 top-12 z-10 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_35px_rgba(60,51,83,0.12)]"><div className="flex items-center gap-2 text-xs font-semibold"><span className="grid size-7 place-items-center rounded-full bg-[#ddf3e4] text-[#5a9270]"><Check size={14} /></span><span>Best price found<br /><strong className="text-base">₹899</strong> <span className="font-normal text-[#9d989b]">· saved ₹1,100</span></span></div></div><div className="overflow-hidden rounded-[34px] bg-[#f8e8ee] p-5"><img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85" alt="Floral dress discovered by Findly" className="aspect-[0.78] w-full rounded-[25px] object-cover" /><div className="mt-4 flex items-center justify-between"><div><p className="text-xs font-medium text-[#8d8290]">MATCHED ACROSS 4 STORES</p><p className="mt-1 font-semibold">Pastel floral midi dress</p></div><span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#6d628e]">98% match</span></div></div></div>
        </div>
      </section>

      <section id="how" className="border-y border-[#eee9e3] bg-white/60"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8"><div className="mb-10 flex items-end justify-between"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#9b8fc9]">Simple by design</p><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">From want to found.</h2></div><span className="hidden text-sm text-[#9d989b] sm:block">No more tab-hopping.</span></div><div className="grid gap-4 md:grid-cols-3">{[['01','Share what you want','Upload a photo, paste a product link, or describe your dream find.'],['02','Compare across stores','We scan supported stores to surface exact matches and smart alternatives.'],['03','Find your best deal','Compare real prices, delivery and ratings, then shop with confidence.']].map(([num,title,text]) => <div key={num} className="rounded-3xl border border-[#eee9e3] bg-[#fcfaf7] p-6"><span className="text-sm font-bold text-[#aa9fd3]">{num}</span><h3 className="mt-10 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#858087]">{text}</p></div>)}</div></div></section>

      {(searched || loading) && <section id="deals" className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#ddf3e4] px-3 py-1.5 text-xs font-bold text-[#5a9270]">{loading ? <><span className="size-2 animate-pulse rounded-full bg-[#6eaa83]" /> Searching stores…</> : <><Check size={13} /> Demo results · sample data</>}</div><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{loading ? 'Finding your best matches…' : "Here's what we found."}</h2><p className="mt-2 text-sm text-[#858087]">{loading ? 'Identifying your product · Comparing prices · Finding alternatives' : 'For “pastel pink floral midi dress” across 4 supported stores'}</p></div>{!loading && <label className="flex items-center gap-2 rounded-xl border border-[#e8e3dc] bg-white px-3 py-2 text-sm"><Filter size={15} className="text-[#9b8fc9]" /><select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent outline-none"><option value="relevance">Best match</option><option value="price">Lowest price</option><option value="discount">Highest discount</option></select><ChevronDown size={14} /></label>}</div>{loading ? <div className="mt-10 flex items-center justify-center rounded-3xl border border-[#eee9e3] bg-white py-24 text-sm text-[#858087]"><Sparkles className="mr-2 animate-pulse text-[#9b8fc9]" size={18} /> Comparing prices across stores…</div> : <><div className="mt-10 grid gap-5 lg:grid-cols-3">{visibleProducts.slice(0,3).map((product, index) => <article key={product.store} className={`group overflow-hidden rounded-3xl border bg-white ${index === 0 ? 'border-[#bdb3e7] shadow-[0_12px_32px_rgba(130,115,190,0.12)]' : 'border-[#eee9e3]'}`}><div className="relative"><img src={product.image} alt={product.name} className="aspect-[1.18] w-full object-cover transition duration-500 group-hover:scale-[1.02]" /><span className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-bold ${index === 0 ? 'bg-[#292733] text-white' : 'bg-white/90 text-[#6e6689]'}`}>{product.tag}</span><button className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/90 text-[#77737d]" aria-label={`Save ${product.name}`}><Heart size={15} /></button></div><div className="p-5"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#9a8fc9]">{product.store}</span><span className="flex items-center gap-1 text-xs text-[#858087]"><Star size={12} className="fill-[#e5b86b] text-[#e5b86b]" />{product.rating}</span></div><h3 className="mt-2 font-semibold leading-5">{product.name}</h3><div className="mt-4 flex items-end justify-between"><div><span className="text-2xl font-bold">{money(product.price)}</span><span className="ml-2 text-xs text-[#aaa4a6] line-through">{money(product.original)}</span><p className="mt-1 text-xs text-[#6fa17c]">{Math.round((1-product.price/product.original)*100)}% off · {product.delivery}</p></div><a href={product.url} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-xl bg-[#dcd6f7] text-[#625981] transition hover:bg-[#cfc7f1]" aria-label={`View ${product.store} deal`}><ExternalLink size={16} /></a></div></div></article>)}</div><div className="mt-12 flex items-center gap-3"><div className="h-px flex-1 bg-[#eee9e3]" /><span className="text-xs font-bold uppercase tracking-[0.16em] text-[#9d989b]">Closest matches for you</span><div className="h-px flex-1 bg-[#eee9e3]" /></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{visibleProducts.slice(3).map((product) => <article key={product.store} className="flex gap-4 rounded-2xl border border-[#eee9e3] bg-white p-3"><img src={product.image} alt={product.name} className="size-24 rounded-xl object-cover" /><div className="min-w-0 flex-1 py-1"><div className="flex items-start justify-between gap-2"><div><span className="text-xs font-semibold text-[#9a8fc9]">{product.store}</span><h3 className="mt-1 truncate text-sm font-semibold">{product.name}</h3></div><span className="shrink-0 text-xs font-bold text-[#6fa17c]">{product.score}% match</span></div><div className="mt-3 flex items-center justify-between"><span className="font-bold">{money(product.price)} <span className="ml-1 text-xs font-normal text-[#aaa4a6] line-through">{money(product.original)}</span></span><a href={product.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-[#706497]">View deal <ArrowRight className="ml-1 inline" size={12} /></a></div></div></article>)}</div></>}</section>}

      <section id="why" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8"><div className="grid gap-8 rounded-[32px] bg-[#dcd6f7] p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr] lg:p-16"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#716892]">Shopping, simplified</p><h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">A better way to find what&apos;s worth buying.</h2></div><div className="grid gap-6 sm:grid-cols-2">{[['Compare in one place','Skip the endless tabs and see offers side by side.'],['Shop within budget','Find thoughtful alternatives that match your price range.'],['Search your way','Photo, link, or a few words — start wherever inspiration strikes.'],['Shop with confidence','Clear prices, delivery details and retailer links.']].map(([title,text]) => <div key={title} className="border-t border-[#bdb3e7] pt-4"><Tag size={17} className="text-[#716892]" /><h3 className="mt-3 font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-[#716892]">{text}</p></div>)}</div></div></section>

      <footer className="border-t border-[#eee9e3] bg-white"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-10 sm:flex-row lg:px-8"><div><a href="#top" className="flex items-center gap-2 font-semibold"><span className="grid size-7 place-items-center rounded-lg bg-[#dcd6f7] text-[#5f587c]"><Sparkles size={14} /></span>findly<span className="text-[#968acb]">.</span></a><p className="mt-3 max-w-xs text-sm leading-6 text-[#9d989b]">Your friendly shortcut to better shopping across India.</p></div><div className="flex gap-8 text-sm text-[#858087]"><a href="#how">How it works</a><a href="#deals">Explore deals</a><a href="#">Privacy</a><a href="#">Terms</a></div></div><div className="mx-auto max-w-7xl border-t border-[#f1ede8] px-5 py-5 text-xs text-[#aaa4a6] lg:px-8">© 2026 Findly · Demo experience with sample data</div></footer>
    </main>
  )
}
