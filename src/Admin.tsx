import React, { useState } from 'react';
import { Copy, Link as LinkIcon, Check } from 'lucide-react';

const prefixes = ["Mr.", "Mrs.", "Miss", "Mr. & Mrs.", "Family", "Dear"];

export default function Admin() {
  const [prefix, setPrefix] = useState(prefixes[0]);
  const [guestName, setGuestName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const generateLink = () => {
    if (!guestName.trim()) {
      alert("Please enter a guest name first.");
      return;
    }
    const url = new URL(window.location.origin);
    url.searchParams.set("p", prefix);
    url.searchParams.set("n", guestName.trim());
    setGeneratedLink(url.toString());
    
    // Reset copy states
    setCopiedLink(false);
    setCopiedMessage(false);
  };

  const getFullMessage = () => {
    if (!generatedLink) return "";
    return `Dear ${prefix} ${guestName} ❤️

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${generatedLink}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ Thilan & Irish`;
  };

  const copyToClipboard = async (text: string, isFullMessage: boolean) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (isFullMessage) {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-theme-50 p-6 md:p-12 pb-24 font-serif text-theme-900 flex justify-center items-start smooth-mobile-scroll">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_20px_50px_-20px_rgba(210,180,185,0.45)] border border-theme-200 p-8 md:p-12 my-auto">
        
        <div className="text-center mb-10">
          <h1 className="font-playball text-4xl text-theme-900 mb-2">Invitation Generator</h1>
          <p className="text-theme-600 font-cinzel text-xs tracking-[0.2em] uppercase">Thilan & Irish</p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Prefix Select */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-theme-600">Prefix</label>
              <select 
                value={prefix} 
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-theme-50 border border-theme-200 rounded-xl px-4 py-3 text-theme-900 focus:outline-none focus:ring-2 focus:ring-theme-400 focus:border-transparent transition-all"
              >
                {prefixes.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Guest Name Input */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-theme-600">Guest Name</label>
              <input 
                type="text" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full bg-theme-50 border border-theme-200 rounded-xl px-4 py-3 text-theme-900 focus:outline-none focus:ring-2 focus:ring-theme-400 focus:border-transparent transition-all placeholder:text-theme-300"
              />
            </div>
          </div>

          <button 
            onClick={generateLink}
            className="w-full bg-theme-900 hover:bg-theme-800 text-white font-cinzel font-bold tracking-[0.2em] uppercase text-sm py-4 rounded-xl transition-all shadow-md active:scale-[0.98]"
          >
            Generate Link
          </button>
        </div>

        {generatedLink && (
          <div className="mt-10 pt-10 border-t border-theme-200 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Link Preview */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-theme-600">Generated Link</label>
              <div className="flex items-center gap-3 bg-theme-50 p-4 rounded-xl border border-theme-200">
                <p className="flex-1 text-sm text-theme-700 truncate font-sans">{generatedLink}</p>
                <button 
                  onClick={() => copyToClipboard(generatedLink, false)}
                  className="shrink-0 flex items-center gap-2 bg-white border border-theme-200 hover:border-theme-400 px-4 py-2 rounded-lg text-theme-900 text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.96]"
                  title="Copy Link Only"
                >
                  {copiedLink ? <Check size={16} className="text-green-600" /> : <LinkIcon size={16} />}
                  {copiedLink ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            {/* Message Preview */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-theme-600 flex justify-between items-end">
                <span>Message Template</span>
                <button 
                  onClick={() => copyToClipboard(getFullMessage(), true)}
                  className="flex items-center gap-2 bg-theme-400 hover:bg-theme-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-[0.96] shadow-sm"
                >
                  {copiedMessage ? <Check size={16} /> : <Copy size={16} />}
                  {copiedMessage ? "Copied Message" : "Copy Full Message"}
                </button>
              </label>
              <div className="bg-theme-50 p-6 rounded-xl border border-theme-200 whitespace-pre-wrap font-sans text-sm text-theme-800 leading-relaxed">
                {getFullMessage()}
              </div>
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}
