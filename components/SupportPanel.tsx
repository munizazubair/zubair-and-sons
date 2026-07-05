import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Headset, Send, MessageSquare, Search, ChevronDown, 
  HelpCircle, Sparkles, Mail, ShieldAlert, CheckCircle 
} from 'lucide-react';

interface Message {
  sender: 'user' | 'agent';
  text: string;
  time: string;
}

export default function SupportPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Chat simulator states
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'agent', text: 'Welcome to Zubair & Sons support. I am your custom AI Concierge. How can I assist you with our Device Collection today?', time: '10:00 AM' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Offline ticket form states
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', message: '' });

  const faqs = [
    {
      q: 'Do you ship Zubair & Sons devices worldwide?',
      a: 'Yes! We offer insured express shipping to over 150 countries. All orders are packed in our bio-recyclable suspension padding to ensure safe transit.'
    },
    {
      q: 'What is the standard warranty on the Device Collection?',
      a: 'Every device in our catalog includes a 3-Year comprehensive hardware warranty. This covers any functional anomalies, panel burn-in, or mechanical failures.'
    },
    {
      q: 'Are custom finishes and colors available for individual pre-orders?',
      a: 'Absolutely. Clicking "Configure & Order" on any product opens our customization bay. You can select between Satin Obsidian, Satin Slate, and custom seasonal releases.'
    },
    {
      q: 'Can I cancel or alter my pre-order details?',
      a: 'Yes, pre-orders can be fully cancelled or altered for a 100% refund at any point prior to the shipping processing status.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const predefinedQuestions = [
    'How do I customize my order?',
    'What is your return policy?',
    'Tell me about the titanium casing.'
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const userMsg: Message = { sender: 'user', text: textToSend, time: currentTime };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate Agent Reply after 1.2s
    setTimeout(() => {
      let replyText = "Thank you for reaching out! A representative from Zubair & Sons will review your query shortly. For immediate checkout queries, please configure your device and select 'Proceed with Pre-Order'.";
      
      const lowerText = textToSend.toLowerCase();
      if (lowerText.includes('customize') || lowerText.includes('configure')) {
        replyText = "To customize a device, select any device on our product grid and click the 'Configure' eye icon. This loads our swatch config module where you can choose finishes like Satin Slate or Matte Obsidian and modify quantities.";
      } else if (lowerText.includes('return') || lowerText.includes('refund')) {
        replyText = "We offer a 30-day hassle-free return window. If you are not fully satisfied with your device, you can trigger a secure return label directly via this Support console or by emailing concierge@zubair-sons.com.";
      } else if (lowerText.includes('titanium') || lowerText.includes('material') || lowerText.includes('finish')) {
        replyText = "Our wearables and mobile chassis are sculpted in Aerospace Grade-5 Titanium. This delivers ten times the structural hardness of traditional aluminum, wrapped in a luxury anti-reflective satin finish.";
      } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
        replyText = "Hello! I am your AI concierge. Feel free to ask about our warranties, custom colors, shipping times, or details about any specific device.";
      }

      const agentMsg: Message = { sender: 'agent', text: replyText, time: currentTime };
      setMessages(prev => [...prev, agentMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleTicketSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ticketForm.name || !ticketForm.email || !ticketForm.message) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="support" className="py-24 max-w-7xl mx-auto px-6 space-y-20 scroll-mt-20">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-[11px] font-mono tracking-wider font-semibold uppercase">
          Client Support Hub
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
          Dedicated Concierge Services
        </h2>
        <p className="text-white/50 text-sm sm:text-base leading-relaxed">
          Need help with custom colors, bulk pre-orders, or technical specs? Get immediate assistance via our live AI specialist or search our FAQs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Side: Accordion FAQs & Offline Ticket */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className="space-y-5">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-400" />
              Frequently Answered Questions
            </h3>

            {/* Search FAQ */}
            <div className="relative">
              <Search className="w-4 h-4 text-white/30 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search queries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/5 rounded-2xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500/30 transition-all"
              />
            </div>

            {/* FAQs List */}
            <div className="space-y-3">
              {filteredFaqs.length === 0 ? (
                <p className="text-white/40 text-xs text-center py-4">No matching queries found.</p>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div key={idx} className="border border-white/5 rounded-2xl bg-white/5 overflow-hidden transition-all duration-300">
                      <button
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                        className="w-full px-5 py-4 text-left flex justify-between items-center text-sm font-semibold text-white/90 cursor-pointer hover:bg-white/[0.03]"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-white/40 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 text-xs text-white/55 leading-relaxed border-t border-white/5 pt-3 bg-black/10">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Ticket Submission Form */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
            <h4 className="font-display font-bold text-sm text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              Submit Offline Inquiry Ticket
            </h4>
            
            {ticketSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 text-center space-y-2"
              >
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h5 className="font-bold text-sm text-white">Ticket Filed Successfully</h5>
                <p className="text-xs text-white/40">Zubair & Sons specialists will reply to your inbox within 12 hours.</p>
                <button
                  onClick={() => setTicketSubmitted(false)}
                  className="text-[10px] text-blue-400 hover:underline mt-2 font-mono"
                >
                  File another ticket
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={ticketForm.name}
                    onChange={e => setTicketForm({...ticketForm, name: e.target.value})}
                    className="w-full px-4 py-2.5 bg-[#150917] border border-white/5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-500/20"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={ticketForm.email}
                    onChange={e => setTicketForm({...ticketForm, email: e.target.value})}
                    className="w-full px-4 py-2.5 bg-[#150917] border border-white/5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-500/20"
                  />
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Your inquiry message..."
                  value={ticketForm.message}
                  onChange={e => setTicketForm({...ticketForm, message: e.target.value})}
                  className="w-full px-4 py-2.5 bg-[#150917] border border-white/5 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-500/20 resize-none"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold border border-blue-500/20 text-xs transition-all cursor-pointer"
                >
                  File Inquiry Ticket
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: Live Chat Concierge Simulator */}
        <div className="lg:col-span-7 bg-[#150917]/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-between h-[600px] relative">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/5 rounded-full blur-[80px]" />
          
          {/* Active status bar */}
          <div className="flex justify-between items-center border-b border-white/10 pb-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-blue-500/15 flex items-center justify-center border border-blue-500/30 text-blue-400">
                  <Headset className="w-5 h-5" />
                </div>
                <span className="w-2.5 h-2.5 bg-emerald-500 border border-[#150917] rounded-full absolute bottom-0 right-0 animate-pulse" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                  Zubair & Sons AI Concierge
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="text-[10px] font-semibold text-emerald-400 font-mono tracking-wider uppercase">Active Agent Offline Sync</span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-white/30 px-3 py-1 bg-white/5 rounded-full border border-white/15 uppercase">
              Secure
            </div>
          </div>

          {/* Messages stream area */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1 scrollbar-thin">
            {messages.map((msg, idx) => {
              const isAgent = msg.sender === 'agent';
              return (
                <div 
                  key={idx} 
                  className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-1 ${
                    isAgent 
                      ? 'bg-white/5 border border-white/5 text-white/90 rounded-tl-none' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-tr-none shadow-md shadow-blue-500/10'
                  }`}>
                    <p>{msg.text}</p>
                    <span className={`text-[9px] block text-right font-mono ${isAgent ? 'text-white/30' : 'text-white/60'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/5 text-white/90 rounded-2xl rounded-tl-none p-4 space-y-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {/* Preset Questions Rail & Message Sender Input */}
          <div className="pt-4 border-t border-white/10 space-y-4 shrink-0">
            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {predefinedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[11px] font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input form */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                className="flex-1 px-4 py-3 bg-[#1c0c1e] border border-white/5 rounded-2xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-blue-500/20"
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
