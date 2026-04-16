"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Instagram,
  ArrowUpRight,
  Send,
} from "lucide-react";
import Section from "./Section";

type Branch = {
  name: string;
  area: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: { label: string; value: string }[];
  mapEmbedUrl: string;
  mapUrl: string;
};

const HOURS_ALL_DAYS = [{ label: "Daily", value: "11:30 AM — 1:30 AM" }];

const branches: Branch[] = [
  {
    name: "MUWAILAH",
    area: "Sharjah, UAE",
    address: "8F52+3PF - Muwaileh Commercial - Industrial Area - Sharjah",
    phone: "06 534 3034",
    whatsapp: "97165343034",
    hours: HOURS_ALL_DAYS,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.351239618037!2d55.4590463!3d25.3091917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f4f5f5f5f5f%3A0xdeadbeefdeadbeef!2sCut%20In%20Half%20-%20Sharjah!5e0!3m2!1sen!2sae!4v1713280000000!5m2!1sen!2sae",
    mapUrl: "https://maps.app.goo.gl/hBshKSTf2D6ZkXp89",
  },
  {
    name: "AL KHAWANEEJ",
    area: "Dubai, UAE",
    address: "Wadi Alamardi - Al Khawaneej - Dubai",
    phone: "04 665 8353",
    whatsapp: "97146658353",
    hours: HOURS_ALL_DAYS,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.123456789!2d55.4512345!3d25.2123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f4f5f5f5f5f%3A0xdeadbeefdeadbeef!2sCut%20In%20Half%20-%20Al%20Khawaneej!5e0!3m2!1sen!2sae!4v1713280000001!5m2!1sen!2sae",
    mapUrl: "https://maps.app.goo.gl/3fC5p7y9KjZ2R9Wq7",
  },
  {
    name: "MAJAN",
    area: "Dubai, UAE",
    address: "38Q9+PP - Wadi Al Safa 3 - Majan - Dubai",
    phone: "050 925 5220",
    whatsapp: "971509255220",
    hours: HOURS_ALL_DAYS,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.456789012!2d55.3512345!3d25.1123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f4f5f5f5f5f%3A0xdeadbeefdeadbeef!2sCut%20In%20Half%20-%20Majan!5e0!3m2!1sen!2sae!4v1713280000002!5m2!1sen!2sae",
    mapUrl: "https://maps.app.goo.gl/6mN4p8L2XjY3T7Kz5",
  },
  {
    name: "UMM SUQEIM",
    area: "Dubai, UAE",
    address: "78 26th St - Umm Suqeim Third - Umm Suqeim 3 - Dubai",
    phone: "050 925 5366",
    whatsapp: "971509255366",
    hours: HOURS_ALL_DAYS,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.123456789!2d55.2123456!3d25.1323456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5f4f5f5f5f5f%3A0xdeadbeefdeadbeef!2sCut%20In%20Half%20-%20Umm%20Suqeim!5e0!3m2!1sen!2sae!4v1713280000003!5m2!1sen!2sae",
    mapUrl: "https://maps.app.goo.gl/1vP4n8M9LzY5R2Tq4",
  },
];

const deliveryApps = [
  { id: "talabat", name: "Talabat", url: "https://www.talabat.com/uae/cut-in-half" },
  { id: "noonfood", name: "Noon Food", url: "https://food.noon.com/uae-en/outlet/CTNHLFS43J/" },
  { id: "zomato", name: "Zomato", url: "https://www.zomato.com/dubai/restoran/cut-in-half" },
];

const EyebrowLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.45em] uppercase font-body text-white/40">
    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block" />
    {children}
  </span>
);

export default function Footer() {
  const [activeBranch, setActiveBranch] = useState(0);
  const branch = branches[activeBranch];
  const chips = useMemo(() => branches.map((b) => b.name), []);

  return (
    <footer id="contact" className="relative bg-black overflow-hidden pt-24">
      <Section className="pb-0 relative z-10">
        {/* Contact Form Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-32"
        >
          <div className="text-center mb-12">
            <EyebrowLabel>Message Us</EyebrowLabel>
            <h2 className="mt-4 text-4xl md:text-5xl font-heading font-medium text-white tracking-[0.1em] uppercase">
              HAVE A <span className="text-brand-yellow">QUESTION?</span>
            </h2>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.02] border border-white/[0.05] p-8 md:p-12 rounded-[2.5rem] backdrop-blur-sm">
            <div className="space-y-6">
              <input 
                type="text" 
                placeholder="YOUR NAME" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[11px] tracking-[0.2em] text-white focus:outline-none focus:border-brand-yellow transition-colors placeholder:text-white/20 font-medium"
              />
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[11px] tracking-[0.2em] text-white focus:outline-none focus:border-brand-yellow transition-colors placeholder:text-white/20 font-medium"
              />
            </div>
            <div className="space-y-6">
              <textarea 
                placeholder="HOW CAN WE HELP?" 
                rows={4}
                className="w-full h-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[11px] tracking-[0.2em] text-white focus:outline-none focus:border-brand-yellow transition-colors placeholder:text-white/20 font-medium resize-none"
              />
            </div>
            <div className="md:col-span-2 flex justify-center pt-4">
              <button type="button" className="flex items-center gap-4 bg-brand-yellow px-10 py-5 rounded-full text-[11px] tracking-[0.4em] font-bold text-black uppercase hover:bg-white transition-all group">
                Send Message <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </form>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          <div className="flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12">
              <EyebrowLabel>Connect</EyebrowLabel>
              <h2 className="mt-4 text-6xl md:text-[5.5rem] font-heading font-medium text-white tracking-[0.05em] uppercase">
                GET IN <span className="text-brand-yellow">TOUCH</span>
              </h2>
            </motion.div>

            <div className="mb-10 space-y-6">
              <EyebrowLabel>Our Locations</EyebrowLabel>
              <div className="flex flex-wrap gap-3">
                {chips.map((name, i) => (
                  <button
                    key={name}
                    onClick={() => setActiveBranch(i)}
                    className={`px-6 py-2 rounded-full border text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                      i === activeBranch ? "bg-brand-yellow border-brand-yellow text-black" : "border-white/10 text-white/40 hover:border-white/30"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={branch.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-brand-yellow font-heading tracking-[0.1em] text-sm uppercase">{branch.area}</p>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-brand-yellow mt-0.5 shrink-0" />
                      <p className="text-white/50 text-xs tracking-wider leading-relaxed">{branch.address}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                      <Phone className="w-4 h-4 text-brand-yellow" />
                      <span className="text-xs tracking-[0.1em] font-medium">{branch.phone}</span>
                    </a>
                    <a href="mailto:hello@cutinhalf.com" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
                      <Mail className="w-4 h-4 text-brand-yellow" />
                      <span className="text-xs tracking-[0.1em] font-medium uppercase">HELLO@CUTINHALF.COM</span>
                    </a>
                  </div>
                  <div className="flex gap-4 pt-2">
                    <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase py-3 px-5 bg-white/5 rounded-xl hover:bg-white/10 transition-all font-medium">
                      Location <ArrowUpRight className="w-3 h-3" />
                    </a>
                    <a href={`https://wa.me/${branch.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase py-3 px-5 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500/20 transition-all font-medium">
                      WhatsApp <MessageCircle className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="md:border-l border-white/5 md:pl-8 space-y-6">
                   <div className="flex items-center gap-3 text-white/30 uppercase tracking-[0.3em] text-[10px]">
                      <Clock className="w-4 h-4" /> <span>Hours</span>
                   </div>
                   {branch.hours.map((h) => (
                     <div key={h.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                       <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">{h.label}</span>
                       <span className="text-xs text-white/80 font-medium">{h.value}</span>
                     </div>
                   ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dynamic Map Section */}
          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 h-[500px] lg:h-full relative group">
            <iframe 
              src={branch.mapEmbedUrl} 
              width="100%" 
              height="100%" 
              className="grayscale contrast-[1.2] invert-[0.9] opacity-40 group-hover:opacity-100 transition-opacity duration-1000" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
            />
          </div>
        </div>

        {/* Delivery Partners */}
        <div className="py-24 border-t border-white/5 flex flex-col items-center gap-16">
          <div className="text-center space-y-4">
            <EyebrowLabel>Order Online</EyebrowLabel>
            <h3 className="text-3xl font-heading font-medium text-white tracking-[0.3em] uppercase">Delivery Partners</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
            {deliveryApps.map((app) => (
              <a key={app.id} href={app.url} target="_blank" rel="noopener noreferrer" className="grayscale opacity-30 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-700">
                <Image src={`/images/${app.id}.png`} alt={app.name} width={260} height={90} className="h-10 md:h-14 w-auto object-contain" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom / Socials */}
        <div className="py-16 border-t border-white/5 flex flex-col items-center gap-10">
          <a href="https://www.instagram.com/cutinhalf.ae/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4">
            <div className="p-5 rounded-full border border-white/10 group-hover:border-brand-yellow group-hover:bg-brand-yellow/5 transition-all duration-500">
              <Instagram className="w-7 h-7 text-white group-hover:text-brand-yellow transition-colors" />
            </div>
            <span className="text-[11px] tracking-[0.6em] uppercase text-white/40 group-hover:text-white transition-colors">@cutinhalf.ae</span>
          </a>
          <div className="text-center space-y-4">
            <p className="text-[12px] tracking-[0.8em] uppercase text-white font-medium">
              © {new Date().getFullYear()} CUT IN HALF • ALL RIGHTS RESERVED
            </p>
            <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase font-body">
              Engineered Flavor • Precision Dining
            </p>
          </div>
        </div>
      </Section>
    </footer>
  );
}