import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Smartphone, 
  Download, 
  Share2, 
  Check, 
  Copy, 
  Monitor, 
  ArrowRight,
  ShieldCheck,
  Terminal,
  FileCode2,
  ExternalLink
} from 'lucide-react';

interface AccessMethodsModalProps {
  isOpen: boolean;
  onClose: () => void;
  standaloneUrl: string;
}

export const AccessMethodsModal: React.FC<AccessMethodsModalProps> = ({
  isOpen,
  onClose,
  standaloneUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'QR' | 'INSTALL' | 'SHORTCUT' | 'TERMINAL'>('QR');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  // Encode URL for clean QR code image generation via SVG QR API
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&color=00f2fe&bgcolor=0f131b&data=${encodeURIComponent(
    standaloneUrl
  )}`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2200);
  };

  const handleDownloadDesktopShortcut = () => {
    // Generate a Windows .url file and download it
    const shortcutContent = `[InternetShortcut]\nURL=${standaloneUrl}\nIconIndex=0\nIconFile=${standaloneUrl}/favicon.svg\n`;
    const blob = new Blob([shortcutContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'STOCK_ANALYSER.url';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadHtmlLauncher = () => {
    // Generate a standalone offline HTML launcher
    const htmlLauncher = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Opening STOCK ANALYSER...</title>
  <meta http-equiv="refresh" content="0; url=${standaloneUrl}">
  <style>
    body { background: #0f131b; color: #00f2fe; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
  </style>
</head>
<body>
  <div style="text-align: center;">
    <h2>Launching STOCK ANALYSER...</h2>
    <p><a href="${standaloneUrl}" style="color: #4edea3;">Click here if not redirected automatically</a></p>
  </div>
</body>
</html>`;
    const blob = new Blob([htmlLauncher], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Launch_Stock_Analyser.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const curlCommand = `curl -sSL "${standaloneUrl}"`;
  const chromeAppCommand = `google-chrome --app="${standaloneUrl}"`;
  const edgeAppCommand = `msedge --app="${standaloneUrl}"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="bg-[#141821] border border-[#262a32] rounded-xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#262a32] bg-[#0f131b] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00f2fe] animate-pulse" />
              <h3 className="text-base sm:text-lg font-bold text-[#e0fdff] font-display">
                Alternative Ways to Access Stock Analyser
              </h3>
            </div>
            <p className="text-xs text-[#849495] mt-0.5">
              Access the program beyond typing URLs: Mobile QR Scanner, PWA App, Desktop Shortcut & Terminal
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#849495] hover:text-[#dfe2ed] hover:bg-[#181c23] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 border-b border-[#262a32] bg-[#0f131b]/60 text-xs font-mono">
          <button
            onClick={() => setActiveTab('QR')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'QR'
                ? 'border-[#00f2fe] text-[#00f2fe] bg-[#141821] font-semibold'
                : 'border-transparent text-[#849495] hover:text-[#dfe2ed]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">QR Scan</span>
            <span className="sm:hidden">QR</span>
          </button>

          <button
            onClick={() => setActiveTab('INSTALL')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'INSTALL'
                ? 'border-[#00f2fe] text-[#00f2fe] bg-[#141821] font-semibold'
                : 'border-transparent text-[#849495] hover:text-[#dfe2ed]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home Screen App</span>
            <span className="sm:hidden">PWA App</span>
          </button>

          <button
            onClick={() => setActiveTab('SHORTCUT')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'SHORTCUT'
                ? 'border-[#00f2fe] text-[#00f2fe] bg-[#141821] font-semibold'
                : 'border-transparent text-[#849495] hover:text-[#dfe2ed]'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop Launcher</span>
            <span className="sm:hidden">Launcher</span>
          </button>

          <button
            onClick={() => setActiveTab('TERMINAL')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'TERMINAL'
                ? 'border-[#00f2fe] text-[#00f2fe] bg-[#141821] font-semibold'
                : 'border-transparent text-[#849495] hover:text-[#dfe2ed]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI / Terminal</span>
            <span className="sm:hidden">CLI</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* TAB 1: QR Code Scanner */}
          {activeTab === 'QR' && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* QR Code Container */}
              <div className="p-3 bg-[#0f131b] border-2 border-[#00f2fe]/40 rounded-2xl shadow-[0_0_25px_rgba(0,242,254,0.15)] shrink-0 flex flex-col items-center">
                <img
                  src={qrCodeImageUrl}
                  alt="Stock Analyser Quick Access QR Code"
                  className="w-48 h-48 sm:w-52 sm:h-52 rounded-lg object-contain"
                />
                <span className="mt-2 text-[11px] font-mono text-[#00f2fe] tracking-wider uppercase font-semibold">
                  Instant Mobile Scan
                </span>
              </div>

              {/* Instructions */}
              <div className="space-y-3.5 flex-1 text-xs">
                <h4 className="text-sm font-bold text-[#e0fdff] font-display">
                  Scan with your phone's camera:
                </h4>
                <div className="space-y-2.5 text-[#b9cacb]">
                  <div className="flex items-start gap-2.5 bg-[#0f131b] p-3 rounded-lg border border-[#262a32]">
                    <span className="w-5 h-5 rounded-full bg-[#00f2fe]/10 text-[#00f2fe] font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </span>
                    <p>Open the <strong>Camera App</strong> on your iPhone or Android phone.</p>
                  </div>
                  <div className="flex items-start gap-2.5 bg-[#0f131b] p-3 rounded-lg border border-[#262a32]">
                    <span className="w-5 h-5 rounded-full bg-[#00f2fe]/10 text-[#00f2fe] font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </span>
                    <p>Point the camera at this QR code — no URL typing required.</p>
                  </div>
                  <div className="flex items-start gap-2.5 bg-[#0f131b] p-3 rounded-lg border border-[#262a32]">
                    <span className="w-5 h-5 rounded-full bg-[#00f2fe]/10 text-[#00f2fe] font-mono font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </span>
                    <p>Tap the prompt to launch Stock Analyser full screen on your phone.</p>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    onClick={() => handleCopy(standaloneUrl, 'qr_url')}
                    className="w-full py-2 px-3 rounded-lg bg-[#181c23] hover:bg-[#20252f] border border-[#3a494b] text-[#dfe2ed] hover:text-[#00f2fe] transition-colors flex items-center justify-center gap-1.5 font-mono text-xs"
                  >
                    {copiedCode === 'qr_url' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#4edea3]" />
                        <span className="text-[#4edea3]">URL Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#00f2fe]" />
                        <span>Copy Target Link Instead</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PWA Home Screen Installation */}
          {activeTab === 'INSTALL' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#00f2fe]" />
                <h4 className="text-sm font-bold text-[#e0fdff] font-display">
                  Install as an App (PWA) on Mobile & Desktop
                </h4>
              </div>
              <p className="text-xs text-[#b9cacb] leading-relaxed">
                Stock Analyser includes full Progressive Web App (<code className="text-[#00f2fe]">manifest.json</code>) support. Once installed, it behaves like a native app with an app icon on your home screen or taskbar—no browser address bar or URL needed.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Mobile Android / Chrome */}
                <div className="bg-[#0f131b] p-4 rounded-xl border border-[#262a32] space-y-2">
                  <div className="font-semibold text-[#00f2fe] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4" />
                    <span>Android & Chrome</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-[#b9cacb]">
                    <li>Open the page in Chrome or your mobile browser.</li>
                    <li>Tap the <strong>three dots menu (⋮)</strong> in the top right.</li>
                    <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.</li>
                    <li>Launch directly from your phone's app drawer anytime.</li>
                  </ol>
                </div>

                {/* iPhone / iOS Safari */}
                <div className="bg-[#0f131b] p-4 rounded-xl border border-[#262a32] space-y-2">
                  <div className="font-semibold text-[#4edea3] flex items-center gap-1.5">
                    <Share2 className="w-4 h-4" />
                    <span>iPhone / iPad (iOS Safari)</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-[#b9cacb]">
                    <li>Open this page in Safari.</li>
                    <li>Tap the <strong>Share button (square with arrow ↑)</strong>.</li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
                    <li>Tap <strong>Add</strong> in the top right corner.</li>
                  </ol>
                </div>
              </div>

              {/* Desktop Chrome / Edge */}
              <div className="bg-[#0f131b] p-4 rounded-xl border border-[#262a32] text-xs space-y-1.5">
                <div className="font-semibold text-[#dfe2ed] flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-[#00f2fe]" />
                  <span>On Mac / Windows / Linux (Chrome or Edge)</span>
                </div>
                <p className="text-[#849495]">
                  Look for the <strong>Install Icon (⊕ or computer with arrow)</strong> at the right side of your browser address bar. Click it and select <strong>"Install STOCK ANALYSER"</strong> to run it in its own standalone desktop window.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Desktop Launcher File */}
          {activeTab === 'SHORTCUT' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-[#00f2fe]" />
                <h4 className="text-sm font-bold text-[#e0fdff] font-display">
                  Download 1-Click Desktop Launchers
                </h4>
              </div>
              <p className="text-[#b9cacb]">
                Save a launcher file to your computer desktop, dock, or flash drive. Double-clicking the file opens Stock Analyser instantly without typing anything into a browser.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {/* Shortcut 1: Windows .url file */}
                <div className="bg-[#0f131b] p-4 rounded-xl border border-[#262a32] flex flex-col justify-between gap-3">
                  <div>
                    <div className="font-bold text-[#dfe2ed] flex items-center gap-1.5">
                      <FileCode2 className="w-4 h-4 text-[#00f2fe]" />
                      <span>Windows Shortcut (.url)</span>
                    </div>
                    <p className="text-[#849495] mt-1 text-[11px]">
                      A native Windows internet shortcut file. Save it to your desktop or pin it to Start.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadDesktopShortcut}
                    className="w-full py-2 px-3 rounded-lg bg-[#00f2fe] text-[#00373a] font-bold font-mono text-xs flex items-center justify-center gap-1.5 hover:bg-[#6ff6ff] transition-all shadow-[0_0_12px_rgba(0,242,254,0.2)] active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .URL Shortcut</span>
                  </button>
                </div>

                {/* Shortcut 2: Offline HTML Redirector */}
                <div className="bg-[#0f131b] p-4 rounded-xl border border-[#262a32] flex flex-col justify-between gap-3">
                  <div>
                    <div className="font-bold text-[#dfe2ed] flex items-center gap-1.5">
                      <FileCode2 className="w-4 h-4 text-[#4edea3]" />
                      <span>HTML Web Launcher (.html)</span>
                    </div>
                    <p className="text-[#849495] mt-1 text-[11px]">
                      Works across Mac, Windows, Linux, and Android. Open locally to auto-launch the app.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadHtmlLauncher}
                    className="w-full py-2 px-3 rounded-lg bg-[#181c23] border border-[#4edea3]/50 text-[#4edea3] font-bold font-mono text-xs flex items-center justify-center gap-1.5 hover:bg-[#4edea3]/10 transition-all shadow-sm active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download HTML Launcher</span>
                  </button>
                </div>
              </div>

              {/* Bookmark Drag trick */}
              <div className="bg-[#0f131b] p-3.5 rounded-lg border border-[#3a494b]/60 flex items-center justify-between gap-3 mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#00f2fe] font-bold font-mono">Quick Tip:</span>
                  <span className="text-[#dfe2ed]">Drag this link straight to your Bookmarks Bar:</span>
                </div>
                <a
                  href={standaloneUrl}
                  onClick={(e) => e.preventDefault()}
                  className="px-2.5 py-1 rounded bg-[#181c23] border border-[#00f2fe] text-[#00f2fe] font-mono font-semibold cursor-grab text-xs"
                >
                  📈 Stock Analyser
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: Terminal / Command Line Launch */}
          {activeTab === 'TERMINAL' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#00f2fe]" />
                <h4 className="text-sm font-bold text-[#e0fdff] font-display">
                  Launch from Terminal / Command Prompt
                </h4>
              </div>
              <p className="text-[#b9cacb]">
                For developers, quantitative analysts, and power users who prefer launching apps via terminal or shell scripts:
              </p>

              {/* Command 1: Chrome App Window Mode */}
              <div className="bg-[#0f131b] p-3.5 rounded-xl border border-[#262a32] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#dfe2ed]">
                    Launch as Borderless Standalone App (Chrome):
                  </span>
                  <button
                    onClick={() => handleCopy(chromeAppCommand, 'cmd_chrome')}
                    className="p-1 rounded text-[#849495] hover:text-[#00f2fe] transition-colors flex items-center gap-1 text-[11px] font-mono"
                  >
                    {copiedCode === 'cmd_chrome' ? (
                      <>
                        <Check className="w-3 h-3 text-[#4edea3]" />
                        <span className="text-[#4edea3]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-[#0a0d13] p-2.5 rounded font-mono text-[11px] text-[#00f2fe] overflow-x-auto border border-[#262a32]">
                  {chromeAppCommand}
                </pre>
              </div>

              {/* Command 2: Edge App Window Mode */}
              <div className="bg-[#0f131b] p-3.5 rounded-xl border border-[#262a32] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#dfe2ed]">
                    Launch in Microsoft Edge Standalone Mode (Windows):
                  </span>
                  <button
                    onClick={() => handleCopy(edgeAppCommand, 'cmd_edge')}
                    className="p-1 rounded text-[#849495] hover:text-[#00f2fe] transition-colors flex items-center gap-1 text-[11px] font-mono"
                  >
                    {copiedCode === 'cmd_edge' ? (
                      <>
                        <Check className="w-3 h-3 text-[#4edea3]" />
                        <span className="text-[#4edea3]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-[#0a0d13] p-2.5 rounded font-mono text-[11px] text-[#4edea3] overflow-x-auto border border-[#262a32]">
                  {edgeAppCommand}
                </pre>
              </div>

              {/* Command 3: cURL test */}
              <div className="bg-[#0f131b] p-3.5 rounded-xl border border-[#262a32] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#dfe2ed]">
                    Inspect App Status via cURL:
                  </span>
                  <button
                    onClick={() => handleCopy(curlCommand, 'cmd_curl')}
                    className="p-1 rounded text-[#849495] hover:text-[#00f2fe] transition-colors flex items-center gap-1 text-[11px] font-mono"
                  >
                    {copiedCode === 'cmd_curl' ? (
                      <>
                        <Check className="w-3 h-3 text-[#4edea3]" />
                        <span className="text-[#4edea3]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-[#0a0d13] p-2.5 rounded font-mono text-[11px] text-[#b9cacb] overflow-x-auto border border-[#262a32]">
                  {curlCommand}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-[#262a32] bg-[#0f131b] flex items-center justify-between text-xs text-[#849495]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#4edea3]" />
            <span>Runs directly on Google Cloud Run container</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#181c23] hover:bg-[#20252f] border border-[#3a494b] text-[#dfe2ed] transition-colors font-mono text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
