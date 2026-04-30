/* ────────────────────────────────────────────────────────────────────────────
   Legacy Co — Lead Capture Modal
   Reusable, self-injecting modal for the Formational Habits Guide.

   USAGE on any page:
     1. Add a trigger element with attribute:  data-lead-capture
        e.g. <button data-lead-capture>Get the Free Guide</button>
     2. Include this script: <script src="/lead-capture.js" defer></script>

   Submits to: https://crm.legacycreative.co/widget/form/IzcUrjDFAf311FX48e52
   Field names (must match your GHL form fields):
     - full_name
     - email
     - newsletter_optin   ("yes" if checked)

   Guide URL opened on success: /framework/formational-habits
   ──────────────────────────────────────────────────────────────────────────── */
(function(){
  'use strict';

  if (window.__legacyLeadCaptureLoaded) return;
  window.__legacyLeadCaptureLoaded = true;

  var GHL_FORM_URL = 'https://crm.legacycreative.co/widget/form/IzcUrjDFAf311FX48e52';
  var GUIDE_URL    = '/framework/formational-habits';
  var SUBMIT_DELAY = 700; // ms — match newsletter band convention (600ms + buffer)

  /* ─── Inject Styles ──────────────────────────────────────────────────── */
  var css = ''
    + '.lc-overlay{position:fixed;inset:0;z-index:1000;background:rgba(8,8,8,0.78);backdrop-filter:blur(8px);opacity:0;pointer-events:none;transition:opacity .25s ease;}'
    + '.lc-overlay.open{opacity:1;pointer-events:auto;}'
    + '.lc-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-48%) scale(.96);z-index:1001;width:calc(100% - 32px);max-width:480px;max-height:calc(100dvh - 64px);overflow-y:auto;background:var(--black,#080808);border:1px solid rgba(201,168,76,0.22);border-radius:14px;padding:36px 32px;opacity:0;pointer-events:none;transition:opacity .28s ease,transform .28s cubic-bezier(.16,1,.3,1);}'
    + '.lc-modal.open{transform:translate(-50%,-50%) scale(1);opacity:1;pointer-events:auto;}'
    + '.lc-close{position:absolute;top:14px;right:14px;width:32px;height:32px;border:0;background:transparent;color:rgba(245,230,200,0.6);cursor:pointer;border-radius:6px;display:flex;align-items:center;justify-content:center;transition:color .2s ease,background .2s ease;}'
    + '.lc-close:hover{color:var(--cream,#F5E6C8);background:rgba(201,168,76,0.08);}'
    + '.lc-close svg{width:16px;height:16px;}'
    + '.lc-icon-circle{width:64px;height:64px;border-radius:50%;background:rgba(201,168,76,0.10);display:flex;align-items:center;justify-content:center;margin:0 auto 22px;color:var(--gold,#C9A84C);}'
    + '.lc-icon-circle svg{width:30px;height:30px;}'
    + '.lc-title{font-family:var(--font-title,"Archivo Black",sans-serif);font-size:28px;line-height:1;letter-spacing:-.01em;text-transform:uppercase;color:var(--white,#FAFAF8);text-align:center;margin-bottom:10px;}'
    + '.lc-sub{font-family:var(--font-body,"Helvetica Neue",sans-serif);font-size:14px;line-height:1.6;color:rgba(245,230,200,0.7);text-align:center;margin-bottom:28px;}'
    + '.lc-form{display:flex;flex-direction:column;gap:18px;}'
    + '.lc-field label{display:block;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(245,230,200,0.75);margin-bottom:8px;font-family:var(--font-body,"Helvetica Neue",sans-serif);}'
    + '.lc-field input[type="text"],.lc-field input[type="email"]{width:100%;background:rgba(8,8,8,0.55);border:1px solid rgba(201,168,76,0.22);border-radius:8px;padding:12px 14px;color:var(--white,#FAFAF8);font-family:var(--font-body,"Helvetica Neue",sans-serif);font-size:15px;outline:none;transition:border-color .2s ease;}'
    + '.lc-field input[type="text"]::placeholder,.lc-field input[type="email"]::placeholder{color:rgba(136,136,128,0.7);}'
    + '.lc-field input[type="text"]:focus,.lc-field input[type="email"]:focus{border-color:var(--gold,#C9A84C);}'
    + '.lc-consent{display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none;}'
    + '.lc-consent input[type="checkbox"]{appearance:none;-webkit-appearance:none;width:16px;height:16px;border-radius:4px;border:1px solid rgba(201,168,76,0.4);background:transparent;cursor:pointer;position:relative;flex-shrink:0;transition:all .2s ease;margin:0;}'
    + '.lc-consent input[type="checkbox"]:checked{background:var(--gold,#C9A84C);border-color:var(--gold,#C9A84C);}'
    + '.lc-consent input[type="checkbox"]:checked::after{content:"";position:absolute;left:4px;top:1px;width:5px;height:9px;border:solid var(--black,#080808);border-width:0 2px 2px 0;transform:rotate(45deg);}'
    + '.lc-consent span{font-size:13px;line-height:1.5;color:rgba(245,230,200,0.65);font-family:var(--font-body,"Helvetica Neue",sans-serif);}'
    + '.lc-submit{width:100%;padding:14px 20px;border-radius:100px;border:0;cursor:pointer;background:linear-gradient(135deg,#C9A84C,#F5E6C8,#E8C97A,#C9A84C);background-size:300% 300%;animation:shimmer 5s ease infinite;color:var(--black,#080808);font-family:var(--font-body,"Helvetica Neue",sans-serif);font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:transform .25s cubic-bezier(.16,1,.3,1),box-shadow .25s ease;margin-top:6px;}'
    + '.lc-submit:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 8px 24px rgba(201,168,76,0.3);}'
    + '.lc-submit:disabled{opacity:.6;cursor:wait;}'
    + '.lc-privacy{font-size:11px;color:rgba(136,136,128,0.7);text-align:center;margin-top:14px;font-family:var(--font-body,"Helvetica Neue",sans-serif);letter-spacing:.02em;}'
    + '.lc-success{text-align:center;}'
    + '.lc-success .lc-title{margin-bottom:14px;}'
    + '.lc-success-body{font-size:15px;line-height:1.6;color:rgba(245,230,200,0.75);margin-bottom:24px;font-family:var(--font-body,"Helvetica Neue",sans-serif);}'
    + '.lc-open-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 32px;border-radius:100px;border:0;cursor:pointer;background:linear-gradient(135deg,#C9A84C,#F5E6C8,#E8C97A,#C9A84C);background-size:300% 300%;animation:shimmer 5s ease infinite;color:var(--black,#080808);font-family:var(--font-body,"Helvetica Neue",sans-serif);font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;transition:transform .25s ease,box-shadow .25s ease;}'
    + '.lc-open-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(201,168,76,0.3);}'
    + '.lc-open-btn svg{width:14px;height:14px;}'
    + '.lc-frame{position:absolute;width:0;height:0;border:0;left:-9999px;top:0;}'
    + 'body.lc-locked{overflow:hidden;}'
    /* ── Trigger Section (drop-in block on any page) ─────────────────── */
    + '.lc-trigger{padding:100px 0;background:var(--dark,#0F0F0F);border-top:1px solid rgba(201,168,76,0.10);border-bottom:1px solid rgba(201,168,76,0.10);}'
    + '.lc-trigger-inner{max-width:1100px;margin:0 auto;padding:0 48px;display:grid;grid-template-columns:1.4fr 1fr;gap:64px;align-items:center;}'
    + '.lc-trigger-eyebrow{font-size:11px;font-weight:600;letter-spacing:.28em;text-transform:uppercase;color:var(--gold,#C9A84C);margin-bottom:20px;font-family:var(--font-body,"Helvetica Neue",sans-serif);}'
    + '.lc-trigger-headline{font-family:var(--font-title,"Archivo Black",sans-serif);font-size:clamp(34px,4.6vw,56px);line-height:1;letter-spacing:-.02em;text-transform:uppercase;color:var(--white,#FAFAF8);margin-bottom:24px;}'
    + '.lc-trigger-sub{font-size:16px;line-height:1.75;color:rgba(250,250,248,0.65);max-width:520px;margin-bottom:32px;font-family:var(--font-body,"Helvetica Neue",sans-serif);}'
    + '.lc-trigger-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 32px;border-radius:100px;border:0;cursor:pointer;background:linear-gradient(135deg,#C9A84C,#F5E6C8,#E8C97A,#C9A84C);background-size:300% 300%;animation:shimmer 5s ease infinite;color:var(--black,#080808);font-family:var(--font-body,"Helvetica Neue",sans-serif);font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;transition:transform .25s ease,box-shadow .25s ease;}'
    + '.lc-trigger-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(201,168,76,0.3);}'
    + '.lc-trigger-btn svg{width:14px;height:14px;}'
    + '.lc-trigger-art{display:flex;justify-content:center;align-items:center;}'
    + '.lc-trigger-circle{width:240px;height:240px;border-radius:50%;border:1px solid rgba(201,168,76,0.4);background:radial-gradient(circle at 50% 50%,rgba(201,168,76,0.08) 0%,rgba(201,168,76,0.02) 60%,transparent 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--gold,#C9A84C);}'
    + '.lc-trigger-circle svg{width:42px;height:42px;margin-bottom:14px;}'
    + '.lc-trigger-circle .lc-pill-label{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(245,230,200,0.6);}'
    + '@media (max-width:860px){.lc-trigger{padding:72px 0;}.lc-trigger-inner{grid-template-columns:1fr;gap:48px;padding:0 24px;text-align:center;}.lc-trigger-sub{margin-left:auto;margin-right:auto;}.lc-trigger-circle{width:180px;height:180px;}.lc-trigger-circle svg{width:32px;height:32px;}}'
    + '@media (prefers-reduced-motion: reduce){.lc-modal,.lc-overlay{transition:none;}.lc-submit,.lc-open-btn,.lc-trigger-btn{animation:none;}}'
    + '@keyframes shimmer{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}';

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ─── Inject Markup ──────────────────────────────────────────────────── */
  var iconBook = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';
  var iconDownload = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>';
  var iconClose = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  var overlay = document.createElement('div');
  overlay.className = 'lc-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  var modal = document.createElement('div');
  modal.className = 'lc-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'lc-title');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = ''
    + '<button class="lc-close" type="button" aria-label="Close">' + iconClose + '</button>'
    + '<div class="lc-form-state">'
    +   '<div class="lc-icon-circle">' + iconBook + '</div>'
    +   '<h2 class="lc-title" id="lc-title">The Formational Habits Guide</h2>'
    +   '<p class="lc-sub">A daily rhythm for founders building brands rooted in identity, calling, and surrender.</p>'
    +   '<form class="lc-form" id="lc-form" action="' + GHL_FORM_URL + '" method="POST" target="lc-frame" novalidate>'
    +     '<div class="lc-field">'
    +       '<label for="lc-name">Full Name</label>'
    +       '<input type="text" id="lc-name" name="full_name" placeholder="Your name" required autocomplete="name" />'
    +     '</div>'
    +     '<div class="lc-field">'
    +       '<label for="lc-email">Email Address</label>'
    +       '<input type="email" id="lc-email" name="email" placeholder="you@email.com" required autocomplete="email" />'
    +     '</div>'
    +     '<label class="lc-consent">'
    +       '<input type="checkbox" name="newsletter_optin" value="yes" checked />'
    +       '<span>Keep me updated on Brand Discipleship resources</span>'
    +     '</label>'
    +     '<button type="submit" class="lc-submit">Get Instant Access</button>'
    +     '<p class="lc-privacy">We respect your privacy and won\'t share your information.</p>'
    +   '</form>'
    + '</div>'
    + '<div class="lc-success" style="display:none;">'
    +   '<div class="lc-icon-circle">' + iconDownload + '</div>'
    +   '<h2 class="lc-title">You\'re All Set!</h2>'
    +   '<p class="lc-success-body">Your guide is opening in a new tab. If it doesn\'t open automatically:</p>'
    +   '<a href="' + GUIDE_URL + '" class="lc-open-btn" target="_blank" rel="noopener">' + iconDownload + ' Open Guide</a>'
    + '</div>'
    + '<iframe name="lc-frame" class="lc-frame" aria-hidden="true" tabindex="-1"></iframe>';

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  /* ─── State + Behavior ───────────────────────────────────────────────── */
  var formState = modal.querySelector('.lc-form-state');
  var successState = modal.querySelector('.lc-success');
  var form = modal.querySelector('#lc-form');
  var closeBtn = modal.querySelector('.lc-close');
  var firstInput = modal.querySelector('#lc-name');
  var lastFocused = null;

  function open(){
    lastFocused = document.activeElement;
    overlay.classList.add('open');
    modal.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lc-locked');
    setTimeout(function(){ firstInput && firstInput.focus(); }, 80);
  }

  function close(){
    overlay.classList.remove('open');
    modal.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lc-locked');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
    // Reset to form state after a delay so users see clean state on reopen
    setTimeout(function(){
      formState.style.display = '';
      successState.style.display = 'none';
    }, 400);
  }

  function showSuccess(){
    formState.style.display = 'none';
    successState.style.display = 'block';
    // Auto-open the guide in a new tab (popup may be blocked; the button is the fallback)
    var opened = window.open(GUIDE_URL, '_blank', 'noopener');
    if (opened) opened.opener = null;
  }

  // Open triggers
  document.addEventListener('click', function(e){
    var trigger = e.target.closest('[data-lead-capture]');
    if (trigger){
      e.preventDefault();
      open();
    }
  });

  // Close: X button, overlay click, ESC
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  // Submit handler — POST goes to hidden iframe; we swap UI after delay
  form.addEventListener('submit', function(){
    var btn = form.querySelector('.lc-submit');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    setTimeout(showSuccess, SUBMIT_DELAY);
  });

})();
