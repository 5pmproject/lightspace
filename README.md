LightSpace App 현재 상태
��️ 프로젝트 구조
프로젝트명: LightSpace App (v0.1.0)
기술 스택: React 18.3.1 + TypeScript + Vite 6.3.5
UI 라이브러리: Radix UI 컴포넌트들 + Tailwind CSS
상태 관리: React Hooks (useState, useCallback, useMemo)
�� 주요 기능
쇼핑몰 앱 - 조명 제품 판매
화면 구성:
홈 화면 (상품 목록, 검색, 카테고리 필터)
상품 상세 화면
장바구니 화면
주문 완료 화면
핵심 기능:
상품 검색 및 카테고리 필터링
장바구니 관리 (추가/제거)
위시리스트 기능
주문 처리 및 완료
알림 시스템
📁 프로젝트 구조
�� 개발 환경
개발 서버: npm run dev (포트 3000)
빌드: npm run build (build 폴더에 출력)
의존성: 48개의 패키지 (주로 Radix UI 컴포넌트들)
�� 앱 특징
모바일 우선 설계: 최대 너비 제한 (max-w-md ~ max-w-xl)
반응형 디자인: 다양한 화면 크기 지원
접근성: ARIA 레이블 및 역할 속성 포함
성능 최적화: useMemo, useCallback을 통한 리렌더링 최적화
