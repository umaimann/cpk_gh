(function () {
  'use strict';

  var ROOT = 'https://www.cho-kaguyahime.com/';
  var ID = 'cho-kaguyahime-gnav-ext';

  if (document.getElementById(ID)) return;

  var OVERLAYS = {
    movie: {
      url: 'https://raw.githubusercontent.com/umaimann/cpk_gh/refs/heads/main/site/pages/movie-page.html',
      base: 'https://raw.githubusercontent.com/umaimann/cpk_gh/refs/heads/main/site/pages/',
      title: '映像'
    },
    introduction: {
      url: 'https://raw.githubusercontent.com/umaimann/cpk_gh/refs/heads/main/html/introduction.html',
      base: 'https://raw.githubusercontent.com/umaimann/cpk_gh/refs/heads/main/html/',
      title: 'イントロダクション'
    },
    story: {
      url: 'https://raw.githubusercontent.com/umaimann/cpk_gh/refs/heads/main/html/story.html',
      base: 'https://raw.githubusercontent.com/umaimann/cpk_gh/refs/heads/main/html/',
      title: 'あらすじ'
    },
    character: {
      url: 'https://raw.githubusercontent.com/umaimann/cpk_gh/refs/heads/main/html/character.html',
      base: 'https://raw.githubusercontent.com/umaimann/cpk_gh/refs/heads/main/html/',
      title: '登場人物'
    }
  };

  var GNAV_HTML = `
<div id="fullWrap">
  <div class="gnav">
    <div class="gnav__inner">
      <p class="gnav__logo"><a href="#top" class="gnav__logoLink js-anchor"><span class="hd">超かぐや姫！</span></a></p>
      <div class="gnav__menuBtn"><a href="javascript:;" class="gnav__menuBtnLink js-menu"><span class="gnav__menuBtnBox"><span class="gnav__menuLine gnav__menuLine--top"></span><span class="gnav__menuLine gnav__menuLine--bottom"></span><span class="gnav__menuLabel" id="js-gnavMenuLabel">MENU</span></span></a></div>
      <div class="gnav__content">
        <div class="gnav__contentInner">
          <nav class="gnav__nav">
            <ul class="gnav__lists" id="js-gnav">
              <li class="gnav__item"><a href="#news" class="gnav__itemLink gnav__itemLink--news js-anchor"><span class="gnav__itemLink--text">最新情報</span></a></li>
              <li class="gnav__item"><a href="#movie" class="gnav__itemLink gnav__itemLink--movie js-anchor"><span class="gnav__itemLink--text">映像</span></a></li>
              <li class="gnav__item"><a href="#introduction" class="gnav__itemLink gnav__itemLink--introduction js-anchor"><span class="gnav__itemLink--text">イントロダクション</span></a></li>
              <li class="gnav__item"><a href="#story" class="gnav__itemLink gnav__itemLink--story js-anchor"><span class="gnav__itemLink--text">あらすじ</span></a></li>
              <li class="gnav__item"><a href="#music" class="gnav__itemLink gnav__itemLink--music js-anchor"><span class="gnav__itemLink--text">音楽</span></a></li>
              <li class="gnav__item"><a href="#character" class="gnav__itemLink gnav__itemLink--character js-anchor"><span class="gnav__itemLink--text">登場人物</span></a></li>
              <li class="gnav__item"><a href="#staffcast" class="gnav__itemLink gnav__itemLink--staffcast js-anchor"><span class="gnav__itemLink--text">スタッフ・キャスト</span></a></li>
              <li class="gnav__item"><a href="https://www.cho-kaguyahime.com/blu-ray" class="gnav__itemLink gnav__itemLink--blu-ray"><span class="gnav__itemLink--text">ブルーレイ</span></a></li>
              <li class="gnav__item"><a href="https://www.cho-kaguyahime.com/theater" class="gnav__itemLink gnav__itemLink--theater"><span class="gnav__itemLink--text">劇場情報</span></a></li>
              <li class="gnav__item"><a href="https://www.cho-kaguyahime.com/goods" class="gnav__itemLink gnav__itemLink--goods"><span class="gnav__itemLink--text">関連商品</span></a></li>
              <li class="gnav__item"><a href="https://www.cho-kaguyahime.com/special" class="gnav__itemLink gnav__itemLink--special"><span class="gnav__itemLink--text">スペシャル</span></a></li>
            </ul>
          </nav>
          <div class="gnav__official">
            <dl class="gnav__officialLists" id="js-gsns">
              <dt class="gnav__officialTitle">OFFICIAL</dt>
              <dd class="gnav__officialItem"><a href="https://x.com/Cho_KaguyaHime" target="_blank" class="gnav__officialLink gnav__officialLink--x" rel="noopener noreferrer"><span class="hd">X</span></a></dd>
              <dd class="gnav__officialItem"><a href="https://www.tiktok.com/@cho_kaguyahime_pr" target="_blank" class="gnav__officialLink gnav__officialLink--tiktok" rel="noopener noreferrer"><span class="hd">TikTok</span></a></dd>
              <dd class="gnav__officialItem"><a href="https://www.youtube.com/@Cho-KaguyaHime-PR" target="_blank" class="gnav__officialLink gnav__officialLink--youtube" rel="noopener noreferrer"><span class="hd">YouTube</span></a></dd>
              <dd class="gnav__officialItem"><a href="https://www.instagram.com/cho_kaguyahime_pr/" target="_blank" class="gnav__officialLink gnav__officialLink--instagram" rel="noopener noreferrer"><span class="hd">Instagram</span></a></dd>
              <dd class="gnav__officialItem"><a href="https://www.nicovideo.jp/user/141907929" target="_blank" class="gnav__officialLink gnav__officialLink--niconico" rel="noopener noreferrer"><span class="hd">Niconico</span></a></dd>
              <dd class="gnav__officialItem"><a href="https://line.me/R/ti/p/@468weicp" target="_blank" class="gnav__officialLink gnav__officialLink--line" rel="noopener noreferrer"><span class="hd">Line</span></a></dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

  var htmlCache = {};
  var overlay = null;

  function addCSS(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  function addJS(src) {
    return new Promise(function (resolve) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = s.onerror = function () { resolve(); };
      document.head.appendChild(s);
    });
  }

  function addExtCSS() {
    var st = document.createElement('style');
    st.textContent =
      '#' + ID + ' .gnav__logoLink{transition:opacity .2s;}' +
      '#' + ID + ' .gnav__logoLink.is-hidden{opacity:0;}' +
      '#' + ID + '-ov{position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.75);display:none;align-items:center;justify-content:center;}' +
      '#' + ID + '-ov.is-open{display:flex;}' +
      '#' + ID + '-ov .cg-box{position:relative;width:min(1100px,94vw);height:90vh;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.5);}' +
      '#' + ID + '-ov iframe{width:100%;height:100%;border:0;display:block;background:#fff;}' +
      '#' + ID + '-ov .cg-close{position:absolute;top:8px;right:8px;z-index:2;width:40px;height:40px;border:0;border-radius:50%;background:rgba(0,0,0,.7);color:#fff;font-size:26px;line-height:40px;text-align:center;cursor:pointer;padding:0;}' +
      '#' + ID + '-ov .cg-close:hover{background:#000;}' +
      '#' + ID + '-ov .cg-msg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#666;font-size:16px;}';
    document.head.appendChild(st);
  }

  function onKey(e) {
    if (e.key === 'Escape') closeOverlay();
  }

  function closeOverlay() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    var frame = overlay.querySelector('iframe');
    if (frame) {
      frame.srcdoc = '';
      frame.style.display = 'none';
    }
    document.removeEventListener('keydown', onKey, true);
  }

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.id = ID + '-ov';
    overlay.innerHTML =
      '<div class="cg-box">' +
        '<button type="button" class="cg-close" aria-label="閉じる">×</button>' +
        '<div class="cg-msg">読み込み中...</div>' +
        '<iframe style="display:none"></iframe>' +
      '</div>';
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('cg-close')) closeOverlay();
    });
    document.body.appendChild(overlay);
  }

  function openOverlay(key) {
    var cfg = OVERLAYS[key];
    if (!cfg) return;
    if (!overlay) buildOverlay();
    overlay.classList.add('is-open');
    document.addEventListener('keydown', onKey, true);

    var msg = overlay.querySelector('.cg-msg');
    var frame = overlay.querySelector('iframe');
    frame.title = cfg.title;

    function show(html) {
      if (html.indexOf('<base') === -1) {
        html = '<base href="' + cfg.base + '">' + html;
      }
      frame.srcdoc = html;
      frame.style.display = 'block';
      msg.style.display = 'none';
    }

    if (htmlCache[key]) {
      show(htmlCache[key]);
      return;
    }

    msg.textContent = '読み込み中...';
    msg.style.display = 'flex';
    frame.style.display = 'none';

    fetch(cfg.url)
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(function (t) {
        htmlCache[key] = t;
        show(t);
      })
      .catch(function () {
        msg.textContent = '読み込みに失敗しました';
      });
  }

  function hookWrap(wrap) {
    var keys = Object.keys(OVERLAYS);

    keys.forEach(function (key) {
      var a = wrap.querySelector('.gnav__itemLink--' + key);
      if (!a) return;
      a.classList.remove('js-anchor');
      a.setAttribute('href', 'javascript:;');
    });

    var logo = wrap.querySelector('.gnav__logoLink');
    if (logo) {
      logo.classList.remove('js-anchor');
      logo.setAttribute('href', 'javascript:;');
    }

    wrap.addEventListener('click', function (e) {
      if (!e.target.closest) return;

      var l = e.target.closest('.gnav__logoLink');
      if (l) {
        e.preventDefault();
        e.stopPropagation();
        l.classList.toggle('is-hidden');
        return;
      }

      var t = e.target.closest('.gnav__itemLink');
      if (!t) return;
      for (var i = 0; i < keys.length; i++) {
        if (t.classList.contains('gnav__itemLink--' + keys[i])) {
          e.preventDefault();
          e.stopPropagation();
          openOverlay(keys[i]);
          return;
        }
      }
    }, true);
  }

  function inject() {
    addCSS(ROOT + 'assets/css/common.css');
    addCSS(ROOT + 'assets/css/top.css?1202');
    addExtCSS();

    var wrap = document.createElement('div');
    wrap.id = ID;
    wrap.innerHTML = GNAV_HTML;

    if (location.hostname.indexOf('cho-kaguyahime.com') === -1) {
      wrap.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.setAttribute('href', ROOT + a.getAttribute('href'));
        a.classList.remove('js-anchor');
      });
    }

    hookWrap(wrap);

    document.body.insertBefore(wrap, document.body.firstChild);
    if (!document.body.dataset.rt) document.body.dataset.rt = ROOT;

    var chain = Promise.resolve();
    if (!window.jQuery) {
      chain = chain.then(function () {
        return addJS('https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js');
      });
    }
    chain
      .then(function () {
        if (typeof window.cont === 'undefined') window.cont = 'top';
        return addJS(ROOT + 'assets/js/incparts.js');
      })
      .then(function () {
        return addJS(ROOT + 'assets/js/jquery.common.js?1105');
      });
  }

  if (document.body) inject();
  else document.addEventListener('DOMContentLoaded', inject);
})();
