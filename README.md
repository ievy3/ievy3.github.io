# Noctil Patchworks

개인적으로 제작한 게임 한국어 번역 패치를 정리하고 배포하는 공개 허브입니다.

## Public Hub

이 저장소와 [Noctil Patchworks](https://ievy3.github.io/) 사이트를 모든 공개 프로젝트의 단일 진입점으로 사용합니다.

- 프로젝트 소개와 진행 현황
- 날짜별 작업일지
- 패치 적용 안내
- 공개 검수판 및 배포 이력
- GitHub Releases를 통한 패처 배포

게임별로 별도의 공개 소스 저장소를 운영하는 것을 기본 방식으로 삼지 않습니다. 개발용 도구, 역공학 자료, 원본 파생 데이터, 내부 번역 작업 파일과 중간 산출물은 로컬 개발 작업 공간에서 관리하며 공개 허브에는 필요한 결과와 기록만 선별해 반영합니다.

## Projects

현재 공개 허브에서 관리하는 프로젝트는 **14개**입니다. 아래 버전은 공개된 최신 베타 배포본을 기준으로 합니다.

- [내 여동생이 이렇게 귀여울 리가 없어, 포터블이 계속될 리가 없어](https://ievy3.github.io/projects/oreimo-portable-tsuzuku/) (PSP) — **v1.0.0** · 베타 공개
- [사키 아치가편 포터블](https://ievy3.github.io/projects/saki-achiga-portable/) (PSP) — **v0.9.0-rc7** · 베타 공개
- [탐정 진구지 사부로: 재와 다이아몬드](https://ievy3.github.io/projects/jinguji-ashes-and-diamonds/) (PSP) — **v0.9.0** · 베타 공개
- [사키 포터블](https://ievy3.github.io/projects/saki-portable/) (PSP) — **v0.9.5** · 베타 공개
- [Hexyz Force](https://ievy3.github.io/projects/hexyz-force/) (PSP) — **v0.9.3-beta.1** · 베타 공개
- [환상수호전 이어지는 백 년의 시간](https://ievy3.github.io/projects/genso-suikoden-100-years/) (PSP) — **v0.9.0** · 베타 공개
- [Generation of Chaos 6](https://ievy3.github.io/projects/generation-of-chaos-6/) (PSP) — **v0.9.0** · 베타 공개
- [Summon Night 5](https://ievy3.github.io/projects/summon-night-5/) (PSP) — **v0.9.0** · 베타 공개
- [Sol Trigger](https://ievy3.github.io/projects/sol-trigger/) (PSP) — **v0.9.3** · 베타 공개
- [Gungnir](https://ievy3.github.io/projects/gungnir/) (PSP) — **v0.9.0** · 베타 공개
- [매지컬 베케이션 (Magical Vacation)](https://ievy3.github.io/projects/magical-vacation/) (GBA) — 개발 중 · 4단계 화면 한글화
- [Never 7: The End of Infinity](https://ievy3.github.io/projects/never7/) (PSP) — 개발 중 · 3단계 대사 번역
- [바케모노가타리 포터블](https://ievy3.github.io/projects/bakemonogatari-portable/) (PSP) — 개발 중 · 2단계 번역 준비
- [Shadow of Memories](https://ievy3.github.io/projects/shadow-of-memories/) (PSP) — 개발 중 · 2단계 번역 준비

최신 다운로드 링크와 패치 이력, 적용 안내, 작업 기록은 각 프로젝트 페이지에서 확인할 수 있습니다.

## Patch Distribution

공개 패치는 이 저장소의 GitHub Releases를 통해 배포합니다.

패치 적용에는 사용자가 직접 보유한 지원 버전의 원본 게임 데이터가 필요합니다.

게임 ROM, ISO 및 기타 원본 게임 데이터나 패치 적용이 완료된 게임 이미지는 제공하지 않습니다.

## Site Automation

`main` 브랜치에 페이지가 추가·수정되면 GitHub Actions가 다음 작업을 자동으로 수행합니다.

- `scripts/generate-projects.mjs` — Release 정보를 모아 홈페이지 프로젝트 목록(`assets/data/projects.generated.json`) 갱신
- `scripts/build-site-files.mjs` — 각 페이지의 공유 미리보기(Open Graph)·canonical 태그 보강, 공용 CSS/JS 캐시 버전 통일, `sitemap.xml`과 작업일지 피드(`feed.xml`) 생성

각 프로젝트의 현재 제작 단계(1~6단계)는 `assets/data/projects.config.json`의 `stage` 값으로 지정하며, 대문 프로젝트 카드에 표시됩니다.

작업일지 새 소식은 [Atom 피드](https://ievy3.github.io/feed.xml)로 구독할 수 있습니다.

## Repository Scope

이 공개 저장소의 목적은 배포와 기록입니다.

공개 대상은 프로젝트 페이지, 작업일지, 직접 제작한 사이트 자산, 배포 안내 및 검증된 Release 자료를 중심으로 합니다. 내부 개발 도구나 분석 데이터의 공개가 필요한 경우에는 별도 검토 후 선별적으로 추가합니다.

## Disclaimer

본 프로젝트는 개인이 제작하는 비공식·비영리 팬 번역 프로젝트입니다.

각 게임 및 관련 콘텐츠의 저작권과 상표권은 해당 권리자에게 있습니다.

본 프로젝트는 각 게임의 개발사, 퍼블리셔 또는 기타 권리자와 공식적인 관련이 없습니다.

권리자의 정당한 요청이 있을 경우 관련 콘텐츠의 공개 또는 배포가 중단될 수 있습니다.

---

Unofficial Korean game translation projects by Noctil Patchworks.

Original game files, ROMs, and ISOs are not distributed through this project.

## Site navigation and visitor statistics

All HTML pages load the shared `assets/css/site-ui.css` and `assets/js/site-ui.js`. The quick dock provides home, latest published patch, patch archive, a current project's download section (where available), issue reporting, and back-to-top navigation. The latest patch is selected from `assets/data/projects.generated.json` by `releasePublishedAt` (not by worklog date). The homepage also shows the newest released project in a highlighted banner and marks its archive card.

GoatCounter integration is **prepared but disabled** until an actual site code is configured. No third-party analytics request is sent while the code is blank.

1. Register a site at https://www.goatcounter.com/ and set its website to `https://ievy3.github.io/`.
2. Set `goatcounterSiteCode` in `assets/data/analytics.config.json` to the real allocated code (the `MYCODE` in `https://MYCODE.goatcounter.com`). Never use a guessed code.
3. Under GoatCounter site settings, enable **Allow adding visitor counts on your website** to allow public homepage counts.
4. Commit the configuration update. The script runs only on `trackingHostnames`; pageviews from all site pages are tracked, while public today/all-time counters appear only on the homepage. GoatCounter public counters may be cached for up to four hours.

These numbers are **pageviews**, not unique visitors. Aggregation begins once the real account code is enabled. Do not commit API tokens or other secrets into a public GitHub Pages repository.
