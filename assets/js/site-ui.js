/* Site-wide quick dock and opt-in GoatCounter integration. */
(function () {
  'use strict';
  var projectMatch = location.pathname.match(/^\/projects\/([^/]+)(?:\/|$)/);
  var projectBase = projectMatch ? '/projects/' + projectMatch[1] + '/' : '';
  var isHome = location.pathname === '/' || location.pathname === '/index.html';

  var shapes = {
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    star:'<path d="m12 2 3.1 6.3 7 1-5 4.9 1.2 6.9L12 17.8 5.7 21l1.2-6.8-5-4.9 7-1Z"/>',
    game:'<path d="M6 12h5M8.5 9.5v5M16 11h.01M19 14h.01"/><path d="M7 5h10a4 4 0 0 1 3.9 3.1l1 6a4 4 0 0 1-6.4 4L14 17h-4l-1.5 1.1a4 4 0 0 1-6.4-4l1-6A4 4 0 0 1 7 5Z"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4"/>',
    report:'<path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-4.4-1.2L3 21l1.7-4.7A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8 11h8M8 14h5"/>',
    top:'<path d="m6 14 6-6 6 6M12 8v13M5 3h14"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    close:'<path d="M5 5l14 14M19 5 5 19"/>'
  };
  function icon(name) {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + shapes[name] + '</svg>';
  }
  function dockItem(nav, iconName, label, href) {
    var item = document.createElement(href ? 'a' : 'button');
    item.className = 'np-dock-action';
    item.setAttribute('aria-label', label);
    item.title = label;
    if (href) item.href = href;
    else item.type = 'button';
    var glyph = document.createElement('span');
    glyph.className = 'np-dock-icon';
    glyph.innerHTML = icon(iconName);
    var caption = document.createElement('span');
    caption.className = 'np-dock-text';
    caption.textContent = label;
    item.append(glyph, caption);
    nav.appendChild(item);
    return item;
  }
  var dock = document.createElement('aside');
  dock.className = 'np-quickdock';
  dock.dataset.open = 'false';
  dock.setAttribute('aria-label', '빠른 이동 메뉴');
  var toggle = document.createElement('button');
  toggle.className = 'np-dock-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'np-dock-nav');
  toggle.setAttribute('aria-label', '빠른 이동 메뉴 펼치기');
  toggle.innerHTML = '<span class="np-dock-icon">' + icon('menu') + '</span><span class="np-dock-text">메뉴</span>';
  var nav = document.createElement('nav');
  nav.className = 'np-dock-nav';
  nav.id = 'np-dock-nav';
  nav.setAttribute('aria-label', '페이지 바로가기');
  dockItem(nav,'home','홈','/');
  var latestLink = dockItem(nav,'star','최신 패치','/#patches');
  latestLink.classList.add('np-dock-featured');
  dockItem(nav,'game','패치 목록','/#patches');
  var downloadLink = dockItem(nav,'download','다운로드','/#patches');
  downloadLink.hidden = true;
  var reportLink = dockItem(nav,'report','오류 제보',
    projectBase ? projectBase + '#support' : 'https://github.com/ievy3/ievy3.github.io/issues/new');
  if (!projectBase) {reportLink.target='_blank';reportLink.rel='noopener noreferrer';}
  var topButton = dockItem(nav,'top','맨 위로',null);
  topButton.hidden = true;
  dock.append(toggle,nav);
  document.body.appendChild(dock);

  function closeDock() {
    dock.dataset.open='false';
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','빠른 이동 메뉴 펼치기');
    toggle.innerHTML='<span class="np-dock-icon">'+icon('menu')+'</span><span class="np-dock-text">메뉴</span>';
  }
  toggle.addEventListener('click',function () {
    var expanded=dock.dataset.open!=='true';
    dock.dataset.open=String(expanded);
    toggle.setAttribute('aria-expanded',String(expanded));
    toggle.setAttribute('aria-label',expanded?'빠른 이동 메뉴 접기':'빠른 이동 메뉴 펼치기');
    toggle.innerHTML='<span class="np-dock-icon">'+icon(expanded?'close':'menu')+
      '</span><span class="np-dock-text">'+(expanded?'닫기':'메뉴')+'</span>';
  });
  nav.addEventListener('click',function (event) {
    if (event.target.closest('a')) closeDock();
  });
  document.addEventListener('keydown',function (event) {
    if (event.key==='Escape' && dock.dataset.open==='true') {closeDock();toggle.focus();}
  });
  topButton.addEventListener('click',function () {
    window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    closeDock();
  });
  function updateTopButton() {topButton.hidden=window.scrollY<350;}
  window.addEventListener('scroll',updateTopButton,{passive:true});
  updateTopButton();

  function newestPublicProject(projects) {
    return projects.filter(function (p) {
      return p.status==='public' && p.download && p.releasePublishedAt;
    }).sort(function (a,b) {
      return b.releasePublishedAt.localeCompare(a.releasePublishedAt);
    })[0] || null;
  }
  function addSpotlight(latest) {
    var recent=document.querySelector('.latest-updates');
    if (!recent || !latest || document.getElementById('latest-patch-highlight')) return;
    var section=document.createElement('section');
    section.id='latest-patch-highlight';
    section.className='latest-patch-highlight';
    section.setAttribute('aria-label','가장 최근 공개된 한국어 패치');
    var heading=document.createElement('div');
    heading.className='np-latest-head';
    var eyebrow=document.createElement('span');
    eyebrow.textContent='LATEST PATCH';
    var label=document.createElement('span');
    label.className='np-latest-tag';
    var isRecent=Date.now()-Date.parse(latest.releasePublishedAt) < 14*24*60*60*1000;
    label.textContent=isRecent?'NEW RELEASE':'LATEST RELEASE';
    heading.append(eyebrow,label);
    var link=document.createElement('a');
    link.className='np-latest-link';
    link.href=latest.href+'#release';
    var info=document.createElement('span');
    info.className='np-latest-info';
    var title=document.createElement('strong');
    title.textContent=latest.title;
    var subtitle=document.createElement('small');
    subtitle.textContent=latest.version+' · '+latest.releasePublishedAt.slice(0,10).replaceAll('-','.')+' 공개';
    info.append(title,subtitle);
    var action=document.createElement('span');
    action.className='np-latest-cta';
    action.textContent='최신 패치 받기 →';
    link.append(info,action);
    section.append(heading,link);
    recent.before(section);
  }
  function markNewestCard(latest) {
    var grid=document.getElementById('project-grid');
    if (!grid || !latest) return;
    function update() {
      grid.querySelectorAll('.project-card').forEach(function (card) {
        var cover=card.querySelector('.project-cover');
        var active=Boolean(cover && cover.getAttribute('href')===latest.href);
        card.classList.toggle('project-card--latest',active);
        var flag=card.querySelector('.np-latest-project-badge');
        if (active && !flag) {
          var kicker=card.querySelector('.project-kicker');
          if (!kicker) return;
          flag=document.createElement('span');
          flag.className='np-latest-project-badge';
          flag.textContent=Date.now()-Date.parse(latest.releasePublishedAt) < 14*24*60*60*1000?'NEW':'LATEST';
          kicker.appendChild(flag);
        } else if (!active && flag) flag.remove();
      });
    }
    new MutationObserver(update).observe(grid,{childList:true});
    update();
  }
  async function configureSiteLinks() {
    try {
      var r=await fetch('/assets/data/projects.generated.json',{cache:'no-store'});
      if (!r.ok) return;
      var payload=await r.json();
      if (!Array.isArray(payload.projects)) return;
      var latest=newestPublicProject(payload.projects);
      var current=payload.projects.find(function (p) {return p.href===projectBase;});
      if (latest) {
        latestLink.href=latest.href+'#release';
        latestLink.title='최신 공개: '+latest.title+' '+latest.version;
        if (isHome) {addSpotlight(latest);markNewestCard(latest);}
      }
      if (projectBase && current && current.download) {
        downloadLink.href=projectBase+'#release';
        downloadLink.hidden=false;
      } else if (!projectBase && latest) {
        downloadLink.href=latest.href+'#release';
        downloadLink.hidden=false;
      }
    } catch (error) {
      console.warn('Site navigation metadata unavailable.',error);
    }
  }
  configureSiteLinks();

  function insertVisitorPanel() {
    var section=document.createElement('section');
    section.className='np-visitor-stats';
    section.setAttribute('aria-label','사이트 방문 통계');
    section.innerHTML=
      '<div class="np-visitor-title"><strong>VISITOR STATISTICS</strong><small>GoatCounter 페이지 조회수 · 최대 약 4시간 지연</small></div>'+
      '<div class="np-visitor-numbers">'+
      '<div class="np-visitor-number"><span>오늘 조회</span><strong data-np-views-today aria-live="polite">—</strong></div>'+
      '<div class="np-visitor-number"><span>누적 조회</span><strong data-np-views-total aria-live="polite">—</strong></div></div>';
    var footer=document.querySelector('body > footer');
    if (footer) footer.before(section);
    else document.body.appendChild(section);
    return section;
  }
  async function loadCount(url,target) {
    try {
      var response=await fetch(url,{cache:'no-store'});
      if (!response.ok) throw new Error('Counter HTTP '+response.status);
      var data=await response.json();
      if (typeof data.count!=='string' && typeof data.count!=='number') throw new Error('Invalid count');
      target.textContent=String(data.count);
    } catch (error) {
      target.textContent='—';
      target.title='조회수를 불러올 수 없습니다.';
    }
  }
  async function configureAnalytics() {
    try {
      var response=await fetch('/assets/data/analytics.config.json',{cache:'no-store'});
      if (!response.ok) return;
      var settings=await response.json();
      var code=typeof settings.goatcounterSiteCode==='string'?settings.goatcounterSiteCode.trim().toLowerCase():'';
      if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(code)) return;
      if (!Array.isArray(settings.trackingHostnames) || !settings.trackingHostnames.includes(location.hostname)) return;
      // Do not send pageviews to an arbitrary or unconfigured GoatCounter account.
      var script=document.createElement('script');
      script.async=true;
      script.src='https://gc.zgo.at/count.js';
      script.setAttribute('data-goatcounter','https://'+code+'.goatcounter.com/count');
      document.body.appendChild(script);
      // Track all pages, display public pageviews on homepage only.
      if (isHome && settings.showPublicCounter===true) {
        var panel=insertVisitorPanel();
        var endpoint='https://'+code+'.goatcounter.com/counter/TOTAL.json';
        var day=new Intl.DateTimeFormat('sv-SE',{
          timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'
        }).format(new Date());
        // Open-ended end includes today's traffic; equal start/end could select an empty interval.
        var dailyUrl=endpoint+'?start='+encodeURIComponent(day);
        await Promise.all([
          loadCount(dailyUrl,panel.querySelector('[data-np-views-today]')),
          loadCount(endpoint,panel.querySelector('[data-np-views-total]'))
        ]);
      }
    } catch (error) {console.warn('GoatCounter configuration unavailable.',error);}
  }
  configureAnalytics();
})();
