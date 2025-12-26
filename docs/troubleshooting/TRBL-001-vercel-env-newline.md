# TRBL-001: Vercel 환경 변수 개행 문자 문제

> 등록일: 2025-12-26

---

## 증상

- **로컬 개발 서버**: 비밀번호 `1234`로 어드민 로그인 **성공**
- **Vercel 배포 사이트**: 동일한 비밀번호 `1234`로 로그인 **실패**
- 에러 메시지: "Invalid password"
- 환경 변수 `NEXT_PUBLIC_ADMIN_PASSWORD`가 Vercel에 설정되어 있음 확인됨

## 디버깅 과정

1. Vercel 환경 변수 존재 확인 (`vercel env ls`) → 존재함
2. 여러 환경(Production, Preview, Development) 모두 추가 → 여전히 실패
3. 강제 재배포 (`vercel --prod`) → 여전히 실패
4. **환경 변수 실제 값 확인** (`vercel env pull`) → **원인 발견**

## 원인

```bash
# 잘못된 방법
echo "1234" | vercel env add NEXT_PUBLIC_ADMIN_PASSWORD production
```

`echo` 명령어는 기본적으로 **개행 문자(`\n`)를 추가**함.

```
저장된 값: "1234\n"  (5글자)
입력한 값: "1234"    (4글자)
비교 결과: 불일치 → 로그인 실패
```

## 해결

```bash
# 1. 기존 환경 변수 삭제
vercel env rm NEXT_PUBLIC_ADMIN_PASSWORD production -y
vercel env rm NEXT_PUBLIC_ADMIN_PASSWORD preview -y
vercel env rm NEXT_PUBLIC_ADMIN_PASSWORD development -y

# 2. printf 사용하여 개행 없이 추가
printf '1234' | vercel env add NEXT_PUBLIC_ADMIN_PASSWORD production
printf '1234' | vercel env add NEXT_PUBLIC_ADMIN_PASSWORD preview
printf '1234' | vercel env add NEXT_PUBLIC_ADMIN_PASSWORD development

# 3. 값 검증
vercel env pull .env.check.local --yes
cat .env.check.local | grep ADMIN
# 출력: NEXT_PUBLIC_ADMIN_PASSWORD="1234"  (개행 없음 확인)
rm .env.check.local

# 4. 재배포
vercel --prod --yes
```

## 소요 시간

- 이번 세션: 약 30분~1시간
- 과거 삽질 포함: 수일

## 교훈

### 1. 환경 변수 설정 시 `printf` 사용
```bash
# ❌ 잘못된 방법
echo "값" | vercel env add ...

# ✅ 올바른 방법
printf '값' | vercel env add ...
```

### 2. 환경 변수 설정 후 반드시 검증
```bash
vercel env pull .env.check.local --yes
cat .env.check.local
rm .env.check.local
```

### 3. "로컬은 되는데 배포는 안 됨" 패턴
- 환경 변수 값 차이를 의심할 것
- 특히 **공백, 개행, 따옴표** 문제

### 4. 집합론적 디버깅 접근법
문제 발생 시 가설 집합을 세우고 하나씩 검증:
- A. 환경 변수 문제 (값, 주입 시점, 이름)
- B. 배포 문제 (도메인 연결, 캐시)
- C. 코드 문제 (로컬/배포 코드 차이)

## 관련 파일

- `/src/app/admin/layout.tsx` - 비밀번호 검증 로직 (line 44-51)
- `.env.local` - 로컬 환경 변수

## 참고

- `echo` vs `printf` 차이: https://stackoverflow.com/questions/8467424/echo-newline-in-bash-prints-literal-n
- Vercel CLI 환경 변수 문서: https://vercel.com/docs/cli/env

---

*해결일: 2025-12-26*
