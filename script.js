(function () {
  'use strict';

  // LAYER 1: webdriver check
  if (navigator.webdriver === true) return;

  // LAYER 2: bot user-agent check
  var BOT_REGEX = /bot|crawler|spider|yandex|googlebot|bingbot|duckduckbot|mail\.ru|slurp|baiduspider|facebookexternalhit|applebot|ahrefs|semrush|mj12bot/i;
  if (BOT_REGEX.test(navigator.userAgent)) return;

  // LAYER 3: headless check
  if (navigator.userAgent.toLowerCase().indexOf('headless') !== -1) return;

  // LAYER 4: all data pre-encoded as base64 literals (UTF-8 via Buffer/btoa)
  var ENCODED = [
    {
      n:   'VlBOVFlQRQ==',
      b:   '0KLQntCfLTE=',
      p:   'Mjk5IOKCvS/QvNC10YE=',
      pr:  'NSDQtNC90LXQuSDQt9CwIDEg4oK9',
      sp:  '0LTQviAxMDAg0JzQsdC40YIv0YE=',
      d:   '0JLRi9GB0L7QutCw0Y8g0YHQutC+0YDQvtGB0YLRjCDRgdC+0LXQtNC40L3QtdC90LjRjyDQuCDQtNC+0YHRgtGD0L/QvdGL0Lkg0YLQsNGA0LjRhA==',
      u1:  'aHR0cHM6Ly92ay5jYy8=',
      u2:  'Y1Vwalpx',
      cta: '0J/QvtC/0YDQvtCx0L7QstCw0YLRjCDQt9CwIDEg4oK9',
      top: true
    },
    {
      n:   'QWRHdWFyZCBWUE4=',
      b:   '0KLQntCfLTI=',
      p:   '0L7RgiAzMjkg4oK9L9C80LXRgQ==',
      pr:  '',
      sp:  '0LTQviA5MiDQnNCx0LjRgi/RgQ==',
      d:   '0KDQtdGI0LXQvdC40LUg0L7RgiDQuNC30LLQtdGB0YLQvdC+0LPQviDRgNCw0LfRgNCw0LHQvtGC0YfQuNC60LAg0J/Qng==',
      u1:  'aHR0cHM6Ly92ay5jYy8=',
      u2:  'Y1V4T2tt',
      cta: '0J/QtdGA0LXQudGC0Lgg0L3QsCDRgdCw0LnRgg==',
      top: false
    },
    {
      n:   'SGlkZU15Lk5hbWU=',
      b:   '0KLQntCfLTM=',
      p:   '0L7RgiAzMzAg4oK9L9C80LXRgQ==',
      pr:  '',
      sp:  '0LTQviA5NCDQnNCx0LjRgi/RgQ==',
      d:   '0KHQtdGA0LLQuNGBINGBINC00LvQuNGC0LXQu9GM0L3QvtC5INC40YHRgtC+0YDQuNC10Lkg0L3QsCDRgNGL0L3QutC1',
      u1:  'aHR0cHM6Ly92ay5jYy8=',
      u2:  'Y1V4T3hs',
      cta: '0J/QtdGA0LXQudGC0Lgg0L3QsCDRgdCw0LnRgg==',
      top: false
    }
  ];

  function decode(s) {
    if (!s) return '';
    try { return decodeURIComponent(escape(atob(s))); } catch (e) { return ''; }
  }

  // LAYER 5 + 6: interaction trigger + minimum delay 1500ms
  var triggered = false;
  var startTime = Date.now();
  var MIN_DELAY = 1500;

  function onInteraction() {
    if (triggered) return;
    if (Date.now() - startTime < MIN_DELAY) return;
    triggered = true;
    window.removeEventListener('scroll',     onInteraction);
    window.removeEventListener('mousemove',  onInteraction);
    window.removeEventListener('touchstart', onInteraction);
    window.removeEventListener('keydown',    onInteraction);
    injectBlocks();
  }

  window.addEventListener('scroll',     onInteraction, { passive: true });
  window.addEventListener('mousemove',  onInteraction, { passive: true });
  window.addEventListener('touchstart', onInteraction, { passive: true });
  window.addEventListener('keydown',    onInteraction);

  function injectBlocks() {
    document.querySelectorAll('.partner-slot').forEach(function (slot) {
      var block = buildBlock();
      slot.appendChild(block);
      requestAnimationFrame(function () {
        var b = slot.lastElementChild;
        if (b) b.classList.add('partner-visible');
      });
    });
  }

  function buildBlock() {
    var wrap = document.createElement('div');
    wrap.className = 'partner-block';
    wrap.setAttribute('data-nosnippet', '');

    var heading = document.createElement('div');
    heading.className = 'partner-heading';
    heading.textContent = decode('0J/QvtC/0YPQu9GP0YDQvdGL0LUgVlBOLdGB0LXRgNCy0LjRgdGL');
    wrap.appendChild(heading);

    var grid = document.createElement('div');
    grid.className = 'partner-grid';

    ENCODED.forEach(function (item) {
      var card = document.createElement('article');
      card.className = 'partner-card' + (item.top ? ' partner-card--top' : '');

      if (item.b) {
        var badge = document.createElement('span');
        badge.className = 'partner-badge' + (item.top ? ' partner-badge--top' : '');
        badge.textContent = decode(item.b);
        card.appendChild(badge);
      }

      var name = document.createElement('div');
      name.className = 'partner-name';
      name.textContent = decode(item.n);
      card.appendChild(name);

      var price = document.createElement('div');
      price.className = 'partner-price';
      price.textContent = decode(item.p);
      card.appendChild(price);

      if (item.pr) {
        var promo = document.createElement('div');
        promo.className = 'partner-promo';
        promo.textContent = decode(item.pr);
        card.appendChild(promo);
      }

      var speed = document.createElement('div');
      speed.className = 'partner-speed';
      speed.textContent = decode('0KHQutC+0YDQvtGB0YLRjDog') + decode(item.sp);
      card.appendChild(speed);

      var desc = document.createElement('div');
      desc.className = 'partner-desc';
      desc.textContent = decode(item.d);
      card.appendChild(desc);

      // LAYER 7: URL assembled from 2 parts only on click
      var btn = document.createElement('button');
      btn.className = 'partner-btn' + (item.top ? ' partner-btn--top' : '');
      btn.type = 'button';
      btn.textContent = decode(item.cta);
      (function (u1, u2) {
        btn.addEventListener('click', function () {
          // LAYER 8: dynamic <a> created and removed after click
          var url = decode(u1) + decode(u2);
          var a = document.createElement('a');
          a.href = url;
          a.rel = 'nofollow noindex noopener ugc sponsored';
          a.target = '_blank';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); }, 100);
        });
      }(item.u1, item.u2));
      card.appendChild(btn);

      grid.appendChild(card);
    });

    wrap.appendChild(grid);

    return wrap;
  }
}());
