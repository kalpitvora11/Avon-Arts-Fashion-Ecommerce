import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  UserCheck, 
  CreditCard, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { COMPANY_INFO } from '../types';
import { BlueDuckLogo } from './BlueDuckLogo';
import { useStore } from '../context/StoreContext';

interface CompanyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompanyDetailsModal: React.FC<CompanyDetailsModalProps> = ({ isOpen, onClose }) => {
  const { showToast, theme } = useStore();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast(`Copied ${label} to clipboard`, 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const isLight = theme === 'studio-light';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      <div 
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 text-left my-8 ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0b0f19] border-slate-800 text-slate-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            isLight ? 'bg-slate-100 text-slate-500 hover:text-slate-900' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Official Logo */}
        <div className="text-center space-y-3 pb-4 border-b border-slate-800/60">
          <BlueDuckLogo size="md" theme={isLight ? 'light' : 'dark'} showCompanySubtext={false} />
          
          <div>
            <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/30 text-[11px] font-bold tracking-wider uppercase">
              Official Business Verification & Tax Info
            </span>
            <h2 className="text-2xl font-extrabold mt-2 tracking-tight">
              {COMPANY_INFO.legalName}
            </h2>
            <p className="text-xs text-slate-400">
              Manufacturing & Wholesale Distributors of {COMPANY_INFO.brandName}
            </p>
          </div>
        </div>

        {/* Business Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          {/* Proprietor & GSTIN Card */}
          <div className={`p-4 rounded-2xl border space-y-3 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-red-500" /> Proprietor
              </span>
              <span className="font-extrabold text-sm text-red-500">
                {COMPANY_INFO.proprietor}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-800/40">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-amber-500" /> GSTIN Number
                </span>
                <button
                  onClick={() => copyToClipboard(COMPANY_INFO.gstin, 'GSTIN')}
                  className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  {copiedKey === 'GSTIN' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedKey === 'GSTIN' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="font-mono text-sm font-bold tracking-wider text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                {COMPANY_INFO.gstin}
              </div>
            </div>
          </div>

          {/* Registered Factory & Office Address */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
          }`}>
            <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-500" /> Registered Mahim Address
            </span>
            <p className="font-semibold text-xs leading-relaxed">
              {COMPANY_INFO.address.line1},<br />
              {COMPANY_INFO.address.line2},<br />
              <strong className="text-red-400">{COMPANY_INFO.address.city} - {COMPANY_INFO.address.pincode}</strong>,<br />
              {COMPANY_INFO.address.state}
            </p>
          </div>

          {/* Contact Numbers & WhatsApp */}
          <div className={`p-4 rounded-2xl border space-y-2.5 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
          }`}>
            <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-500" /> Direct Calling & WhatsApp
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Head Office Lines:</span>
                <div className="flex gap-2">
                  <a href="tel:9322231024" className="font-mono font-bold text-slate-200 hover:text-red-400">9322231024</a>
                  <span>/</span>
                  <a href="tel:9833441691" className="font-mono font-bold text-slate-200 hover:text-red-400">9833441691</a>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800/40">
                <span className="text-slate-400">Customer Helpline:</span>
                <a 
                  href="https://wa.me/919323130275" 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-mono font-bold text-emerald-400 hover:underline flex items-center gap-1"
                >
                  +91 93231 30275 <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Bank Account Details */}
          <div className={`p-4 rounded-2xl border space-y-2.5 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 uppercase font-bold text-[10px] tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-blue-400" /> Banking Partner (RTGS/NEFT)
              </span>
              <button
                onClick={() => copyToClipboard(`${COMPANY_INFO.bankDetails.accountNumber} IFSC: ${COMPANY_INFO.bankDetails.ifscCode}`, 'Bank Info')}
                className="text-[10px] text-blue-400 hover:underline flex items-center gap-1 font-semibold"
              >
                {copiedKey === 'Bank Info' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedKey === 'Bank Info' ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Bank:</span>
                <span className="font-bold text-white">{COMPANY_INFO.bankDetails.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">Branch:</span>
                <span>{COMPANY_INFO.bankDetails.branch}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">A/C No:</span>
                <span className="font-bold text-blue-400">{COMPANY_INFO.bankDetails.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-sans">IFSC Code:</span>
                <span className="font-bold text-amber-400">{COMPANY_INFO.bankDetails.ifscCode}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Genuine Certified Blue Duck® Garments from Mahim, Mumbai</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="mailto:avonarts70@gmail.com?subject=Wholesale%20%26%20Retail%20Enquiry%20-%20Avon%20Arts%20Blue%20Duck"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-950/40"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Wholesale Enquiry</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
