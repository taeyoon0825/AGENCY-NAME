# AGENCY NAME 홈페이지

React + Vite 정적 홈페이지입니다. 서버·DB·메일 발송 기능은 없습니다. 현재는 **검토용**, **검색
noindex**, **문의 미접수** 상태입니다.

## 실행과 빌드

Node.js 24 LTS, npm 11.17.0을 사용합니다. Windows PowerShell에서 실행 정책 오류가 나면 `npm` 대신
`npm.cmd`를 사용하세요.

```sh
npm ci
npm run dev
npm run build
npm run preview
npm test
npm run format:check
```

개발 주소는 명령 출력에서 확인합니다. `preview`는 `dist/`의 프로덕션 빌드 확인용입니다. 배포 대상은
**dist 폴더만**입니다. 프로젝트 전체, `.env`, `.git`, `src`, `node_modules`를 업로드하지 마세요.
Vite preview의 미등록 경로 fallback은 실제 Netlify 404 동작과 다르므로 공개 후 별도 확인이
필요합니다. 의존성 버전과 package-lock.json을 함께 관리하고 재설치에는 `npm ci`를 사용합니다.

코드를 수정한 뒤 `npm run format`을 실행하면 JSX, JavaScript, CSS, HTML, SVG와 문서의 줄바꿈을
정리합니다. 기준은 `.prettierrc.json`의 100자 줄 폭, 들여쓰기 2칸입니다. 빌드 산출물, lockfile, 임시
검증 파일은 포맷 대상에서 제외합니다. 배포용 압축 번들은 Vite가 생성하므로 직접 편집하지 않습니다.

## 확인된 저장소와 배포 상태

- 기존 원격: `https://github.com/taeyoon0825/AGENCY-NAME.git`
- 기본 브랜치: `main`. 원격, 저장소 공개 범위와 기존 커밋은 변경하지 않았습니다.
- 작업 시작 시 로컬 변경 없음. 로컬 HEAD와 원격 HEAD는 `0d780c5`로 같았습니다.
- 기존 호스팅 설정과 배포 URL 기록 없음. 해당 커밋 GitHub 배포 상태 체크 없음.
- 이번 변경은 로컬에 있으며 아직 commit/push 하지 않았습니다.
- Netlify CLI, 로컬 Netlify 인증 파일, 관련 환경변수 없음. **공개 배포 및 자동 배포 연결 미완료**.
- GitHub 연결 권한은 확인됐으나 Netlify 계정 인증을 대신하지 않습니다.

## 무료 호스팅 선택

Netlify Free를 선택했습니다.
[공식 상업용 허용 안내](https://www.netlify.com/blog/introducing-netlify-free-plan/)를 확인했습니다.
Vercel Hobby는 [개인·비상업용 제한](https://vercel.com/docs/plans/hobby) 때문에 제외했습니다. 현재
[Free 요금표](https://www.netlify.com/pricing/)는 월 300 credits 한도입니다.
[한도 소진 시 모든 팀 프로젝트가 중지](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/)될
수 있습니다. 오래된 글의 빌드 시간·트래픽 수치를 현재 요금에 적용하지 마세요. Free를 선택하고
결제수단·자동 충전·유료 부가기능은 활성화하지 마세요. 계정이 이미 유료 팀이면 무료라고 간주하지 말고
실제 팀 플랜부터 확인합니다.

## 가장 빠른 검토용 공개: 수동 업로드

1. 본인이 관리하는 Netlify **Free** 계정으로 로그인합니다. 계정이 없으면 사용자 본인이 무료
   가입합니다.
2. `npm run build` 후 [Netlify Drop](https://app.netlify.com/drop)에 **dist 폴더**를 올립니다. 기존
   프로젝트가 있으면 새로 만들지 말고 그 프로젝트 Deploys의 수동 업로드를 사용합니다.
3. Netlify가 발급한 실제 `https://…netlify.app` 주소를 기록합니다. 아직 주소를 발급받지 않아
   여기에는 임의 URL을 적지 않았습니다.
4. 수동 업로드에서는 `netlify.toml`이 전달되지 않으므로 아래 Git 연동 방식이 권장됩니다. 빌드의
   `dist/_headers`에는 검토용 noindex가 포함됩니다.
5. 발급 URL로 로컬 `.env.local`의 `VITE_SITE_URL`을 설정하고 다시 빌드하여 **동일 프로젝트**에
   재업로드하면 OG 이미지가 절대 주소를 사용합니다.

## Git 연결과 자동 배포: 권장

1. 검증한 변경을 기존 저장소에 commit/push 합니다. `git status`와 diff를 확인하고 필요한 파일만
   커밋합니다. force push는 사용하지 않습니다.
2. Netlify에서 기존 프로젝트가 있으면 그 프로젝트의 Git 저장소 연결 설정을 사용하고, 없다면 **Add
   new project → Import an existing project → GitHub**를 선택합니다.
3. GitHub 권한을 `taeyoon0825/AGENCY-NAME`에만 부여합니다. 저장소를 새로 만들거나 공개 범위를 바꿀
   필요가 없습니다.
4. 설정값: production branch `main`, base directory 비움(저장소 루트), build command
   `npm run build`, publish directory `dist`, Node `24`, npm `11.17.0`. 저장된 `netlify.toml`과
   일치시킵니다.
5. `VITE_SITE_STAGE=review`를 production/preview에 유지하고 배포합니다. 설치는 lockfile을 유지하며
   npm을 사용합니다. 별도 functions 폴더나 DB는 설정하지 않습니다.
6. Deploy Previews를 켜서 PR 변경을 확인하고, 기본 브랜치 push 자동 배포가 켜져 있는지 확인합니다.
   이 연결은 현재 인증 부재로 아직 수행되지 않았습니다.
7. 첫 성공 이후 같은 프로젝트의 무료 URL을 사용합니다. Vite 빌드는 Netlify가 실제 제공한 `URL` /
   `DEPLOY_PRIME_URL`을 OG 이미지 주소에 활용합니다. 정식 도메인을 확정한 뒤에는 `VITE_SITE_URL`을
   명시합니다.

기존 운영 사이트가 연결되어 있음을 새로 발견하면 그 사이트를 바로 교체하지 말고 먼저 PR 미리보기에서
검증합니다. [Vite 설정 근거](https://docs.netlify.com/build/frameworks/framework-setup-guides/vite/)

## 배포 설정과 환경변수

- `netlify.toml`: Node/npm, 빌드 명령, dist 배포, CSP와 기본 보안 헤더.
- `.nvmrc`, package.json: 로컬/호스팅 런타임과 의존성 버전.
- `.env.example`: 공개 환경변수 예제. 실제 값은 `.env.local` 또는 Netlify 프로젝트 Environment
  variables에 설정합니다. 환경변수 변경 후 재빌드해야 반영됩니다.
- `VITE_SITE_URL`: 실제 HTTPS 공개 원점. 비어 있거나 잘못된 URL이어도 화면은 동작하고 noindex를
  유지합니다. localhost나 임의 도메인을 넣지 마세요.
- `VITE_SITE_STAGE`: 기본 `review`. 정식 운영 승인 후에만 `production`으로 변경합니다.
- `src/config/publicSite.js`: 공개 환경변수 처리와 `launchApproved` 출시 확인 플래그. 현재
  false입니다. 플래그·production 단계·유효 URL이 모두 충족될 때만 canonical/og:url/sitemap과 검색
  허용을 생성합니다.
- Netlify preview/branch 배포는 production 환경변수를 상속해도 noindex를 유지합니다.
- 프런트엔드 `VITE_` 값은 방문자에게 공개됩니다. 메일 키, 관리자 토큰, 서비스 계정 키는 절대 넣지
  마세요. `.env`와 `.env.*`는 `.env.example`만 제외하고 Git에서 무시합니다.
- robots.txt는 크롤링을 허용하여 검색 로봇이 noindex를 읽게 합니다. 검토용 HTML과 `_headers`에서
  검색 차단합니다. noindex는 접근 제한이 아니므로 기밀 자료를 올리지 않습니다.
- 클라이언트 라우터 없이 `/#services` 같은 섹션 주소만 사용합니다. catch-all rewrite가 없으며
  Netlify는 미등록 경로·없는 에셋·API 요청에 실제 404를 반환합니다. 이후 라우트를 추가하면 실제
  라우트에만 rewrite를 설정하세요.

## 회사 정보와 이미지 수정

- `src/data/siteContent.js`: 상호, 설명, 대표자, 사업자번호, 주소, 확정 연락처, 서비스·캠페인·이미지
  경로.
- `src/App.jsx`: 페이지 순서와 문의 탭 이동을 조합합니다.
- `src/components/`: Header, Hero, About, Services, CampaignGallery, Process, CreatorSection,
  ContactSection, Footer로 화면을 나눴습니다. 문구와 폼은 해당 컴포넌트에서 수정합니다.
- `src/hooks/`: 모션 감소·등장 처리와 스크롤에 따른 활성 단계 계산입니다.
- `src/utils/formValidation.js`: 이메일·전화·채널 URL 등 입력 검증입니다.
- `src/styles.css`: 색상, 레이아웃, 모바일 대응과 스크롤 효과.
- `public/assets/`: 현재 10개 로컬 예시 SVG입니다. 실제 사용 권한을 확인한 이미지로 교체합니다. 원본
  고용량 사진·영상 대신 필요한 크기로 압축한 WebP/AVIF 등을 사용합니다.
- `public/favicon.svg`, `public/og-image.png`: 브랜드 아이콘과 1200×630 공유 이미지. OG 이미지에도
  임시 상호와 검토용 문구가 있어 정식 운영 전에 교체해야 합니다.
- `vite.config.js`: 제목·설명은 siteContent의 정보에서 생성합니다. 영상·외부 폰트 없이도 첫 화면이
  완성됩니다. 아래 이미지는 lazy, 히어로 핵심 이미지는 우선 로딩하며 이미지 크기를 지정했습니다.
- 외부 링크를 추가할 때 URL을 검증하고 새 창 링크는 `rel="noopener noreferrer"`를 사용하세요.

## 문의의 현재 상태와 연결 방법

**현재 수신 불가**입니다. 제출 버튼은 '입력 내용 확인'이며 실제 접수됐다고 표시하지 않습니다. 폼
데이터는 React 메모리에서만 다루며 localStorage/sessionStorage나 서버로 저장·전송하지 않습니다. 실제
이메일·전화·카카오톡 수신처는 제공되지 않아 링크를 만들지 않았습니다. 검증에는 `example.invalid`
가상 주소만 사용했습니다.

수신처가 확정되면 먼저 siteContent의 연락처에 실제 안내를 입력할 수 있습니다. 폼을 실제 연결하려면
서비스/서버와 개인정보 처리 주체·목적·항목·기간·문의 창구를 먼저 확정하고, 그때 API 공개 주소를
환경변수에 추가합니다. 지금은 연결되지 않은 API 환경변수를 만들지 않았습니다. 서버 측 검증, 본문
크기 제한, 스팸·요청 빈도 제한, 비밀키 서버 관리, 실패/시간 초과 처리 및 성공 확인 후 접수 안내를
함께 구현합니다. 그때 CSP의 `connect-src`를 확정 API 원점에 한해 허용하고 필요한 경우 form-action을
조정합니다. Netlify Forms도 자동 활성화하지 않았습니다. 유료 가입이나 외부 계정 생성은 별도 사용자
결정이 필요합니다. 실제 테스트는 사용자 소유의 통제 가능한 테스트 수신처에만 전송합니다.

## 도메인 구매 후 연결

1. 먼저 회사 정보·문의 기능·개인정보 안내·이미지를 확정하고 검토용 문구를 수정합니다.
2. Netlify의 **같은 프로젝트 → Domain management → Add a domain**에서 구매한 도메인을 추가합니다.
3. 기존 DNS 제공자를 유지할 수 있습니다. **Pending DNS verification**에서 해당 사이트에 실제
   표시되는 DNS 이름·유형·값만 사용합니다. 여기에는 미확정 A/CNAME 값을 추측해서 적지 않습니다.
4. 기존 이메일용 MX, SPF/DKIM/DMARC 등 TXT, 다른 서비스 레코드를 보존합니다. 기존 운영 도메인 DNS
   교체는 사용자 확인 후 진행합니다.
5. DNS 확인과 HTTPS 인증서 발급을 확인하고 대표 도메인을 정합니다.
6. Netlify에서 `VITE_SITE_URL`을 실제 대표 HTTPS 원점으로 변경합니다. 최종 콘텐츠·개인정보·문의 상태
   확인 후 `launchApproved=true`, `VITE_SITE_STAGE=production`을 함께 적용하고 재배포합니다.
7. canonical, og:url, og:image, sitemap.xml이 실제 도메인을 쓰는지 확인합니다. 검토용 noindex가
   제거되고 404는 계속 noindex인지 확인합니다. 미리보기는 계속 noindex여야 합니다.
8. 이전 무료 URL은 중복 검색되지 않도록 호스팅의 대표 도메인 리디렉션을 확인합니다. 실제 공개 URL이
   확정되기 전에는 도메인 기준 메타데이터를 임의로 넣지 않습니다.

[공식 외부 DNS 연결 안내](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/)

## 수정·재배포·롤백

Git 연결 후에는 코드 변경 → `npm ci`(의존성 변경 시) → `npm run build` → 로컬 preview 검증 → 작업
브랜치 push/PR → Netlify Deploy Preview 검증 → main 반영 → 자동 배포 순서입니다. 수동 업로드
방식이면 빌드한 dist를 기존 Netlify 프로젝트 Deploys에 올립니다. 매번 새 프로젝트를 만들지 않습니다.
문제가 생기면 Netlify **Deploys → 이전 정상 배포 → Publish deploy**로 되돌립니다. 필요한 경우 자동
발행을 일시 중지하고 수정 커밋을 준비해 다음 push가 다시 문제 배포를 덮어쓰지 않게 합니다. Git
기록은 reset/force push 대신 revert로 복구합니다.
[공식 롤백 안내](https://www.netlify.com/blog/2021/07/12/how-to-rollback-a-deploy-in-2-seconds-on-netlify/)

## 공개 배포 후 확인할 항목

2026-11-03 재점검 결과: `npm run format:check`, 입력 검증 회귀 테스트 4개(`npm test`),
`npm run build`가 통과했습니다. 배포 산출물은 18개, 합계 약 302 KiB이며 가장 큰 JS는 gzip 약 78.33
KB입니다.

Chrome 360×640, 390×844, 768×1024, 1440×900, 1440×700, 1920×1080에서 다음을 확인했습니다.

- 페이지 전체 스크롤 중 가로 넘침 없음. 전역 overflow 숨김 없이 레이아웃 자체를 수정했습니다.
- 서비스 번호 01~04와 진행 단계 01~05가 스크롤에 맞게 변경됩니다.
- 넓고 충분히 높은 PC 화면에서 캠페인 고정·가로 이동·마지막 패널 표시·고정 해제가 동작합니다.
- 모바일, 좁거나 낮은 화면과 모션 감소 설정에서는 캠페인 3개를 일반 세로 목록으로 읽습니다.
- 실행 중 모션 감소 변경과 PC↔모바일 리사이즈 후 남는 고정 높이나 가로 이동이 없습니다.
- 모바일 메뉴의 닫기 버튼, Escape, Tab 초점 순환, 닫은 뒤 초점 복귀와 스크롤 잠금 해제가 동작합니다.
- 문의 탭 방향키 전환, 필수값·이메일·전화·채널 URL 검증, 탭 전환 후 작성값 유지와 미접수 안내를
  확인했습니다. 단위 테스트에서는 구분기호만 있는 전화번호와 javascript 채널 URL도 거부합니다.
- IntersectionObserver와 ResizeObserver가 없는 환경에서도 본문이 숨겨지거나 앱이 중단되지 않습니다.
- 콘솔 오류·실패 요청·폼 전송 0건, localStorage/sessionStorage 항목 0개입니다.
- 이미지 경로의 대소문자, noindex, canonical/sitemap 미생성, 산출물의 소스·환경파일·소스맵 제외와
  로컬 URL·대표적인 키 패턴 부재를 검사했습니다.

임시 검증 도구·스크린샷·결과는 Git/배포에서 제외한 `artifacts/qa/`에 있습니다. Prettier만 개발
의존성으로 추가했고 사이트에서 실행하는 새 라이브러리는 추가하지 않았습니다. 회사명·실제 이미지·
개인정보 안내와 문의 수신처는 정식 운영 전에 확정해야 합니다.

현재는 로컬 프로덕션 빌드만 검증했습니다. 공개 후 실제 주소에서 HTTPS, PC/모바일 화면, 모든 에셋,
메뉴·섹션 이동, PC 캠페인 고정 시작/종료, 모바일 일반 스크롤, 문의 탭·오류·미접수 안내를 확인합니다.
`/#services` 직접 접속/새로고침, 잘못된 페이지와 `/assets/missing.png`, `/api/missing`의 **실제 HTTP
404**, 콘솔·네트워크 실패, noindex 응답 헤더, 비밀정보·로컬 주소 부재도 확인합니다. 공개 URL의 HTTP
상태·TLS·헤더·호스트 라우팅과 자동 배포는 인증 후 실제 배포 전까지 검증 완료로 간주하지 않습니다.
