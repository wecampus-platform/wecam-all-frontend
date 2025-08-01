# WeCam 프론트엔드 실행 가이드 (Docker)

디자이너/기획자도 로컬 환경에서 WeCam 프론트를 바로 확인할 수 있도록 Docker 기반 실행 환경을 제공합니다.  
Node.js, npm, Next.js 설치 없이 **Docker만 설치**되어 있으면 됩니다.

---

## ✅ 사전 준비

- [Docker Desktop 설치](https://www.docker.com/products/docker-desktop)

## 🔐 환경변수 설정 (.env.local)

프론트 실행을 위해 다음 파일이 필요합니다:

- `.env.local` ← 제공된 파일을 프로젝트 루트에 만드세요.
NEXT_PUBLIC_API_BASE_URL = ~~~
주소는 따로 받으세용.


---

## 🚀 실행 방법 (3단계)

```bash
git clone https://github.com/wecampus-platform/wecam-all-frontend.git
cd wecam-frontend
./run-frontend.sh


