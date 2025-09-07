import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  Download,
  Share2,
  ArrowLeft,
  Lightbulb,
  Phone,
  Mail,
  Star
} from 'lucide-react';
import { CartItem } from '../../types';

interface OrderCompleteScreenProps {
  orderNumber: string;
  orderItems: CartItem[];
  orderTotal: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  estimatedDelivery: string;
  onBackToHome: () => void;
  onTrackOrder: () => void;
  onDownloadReceipt: () => void;
}

export const OrderCompleteScreen: React.FC<OrderCompleteScreenProps> = ({
  orderNumber,
  orderItems,
  orderTotal,
  customerInfo,
  estimatedDelivery,
  onBackToHome,
  onTrackOrder,
  onDownloadReceipt
}) => {
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  // 성공 애니메이션 제어
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccessAnimation(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 진행 단계 애니메이션
  useEffect(() => {
    const steps = [0, 1, 2];
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const orderSteps = [
    { icon: CheckCircle, label: '주문 확인', status: 'completed' },
    { icon: Package, label: '포장 준비', status: currentStep >= 1 ? 'active' : 'pending' },
    { icon: Truck, label: '배송 중', status: currentStep >= 2 ? 'active' : 'pending' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* 성공 애니메이션 오버레이 */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 bg-green-600 flex items-center justify-center z-50">
          <div className="text-center text-white">
            <div className="relative">
              <CheckCircle className="w-24 h-24 mx-auto mb-4 animate-bounce" />
              <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-white/30 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2">주문 완료!</h2>
            <p className="text-green-100">결제가 성공적으로 처리되었습니다</p>
          </div>
        </div>
      )}

      {/* 메인 컨텐츠 */}
      <div className="max-w-4xl mx-auto p-6">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>홈으로 돌아가기</span>
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">주문이 완료되었습니다!</h1>
            <p className="text-gray-600">주문번호: <span className="font-mono font-semibold">#{orderNumber}</span></p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 왼쪽: 주문 정보 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 주문 진행 상태 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-green-600" />
                주문 진행 상태
              </h3>
              
              <div className="flex items-center justify-between">
                {orderSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = step.status === 'active';
                  const isCompleted = step.status === 'completed';
                  
                  return (
                    <React.Fragment key={index}>
                      <div className="flex flex-col items-center">
                        <div className={`
                          w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500
                          ${isCompleted ? 'bg-green-600 text-white' : 
                            isActive ? 'bg-blue-600 text-white animate-pulse' : 
                            'bg-gray-200 text-gray-400'}
                        `}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`mt-2 text-sm font-medium ${
                          isCompleted || isActive ? 'text-gray-900' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      
                      {index < orderSteps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-4 transition-all duration-500 ${
                          index === 0 ? 'bg-green-600' : 
                          currentStep > index ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* 주문 상품 목록 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">주문 상품</h3>
              
              <div className="space-y-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">수량: {item.quantity}</span>
                        <span className="text-sm font-semibold text-gray-900">${item.price}</span>
                      </div>
                    </div>
                    
                    {/* 설치 가이드 미리보기 */}
                    <button className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
                      <Lightbulb className="w-3 h-3" />
                      설치 가이드
                    </button>
                  </div>
                ))}
              </div>

              {/* 주문 총계 */}
              <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">총 결제 금액</span>
                  <span className="text-2xl font-bold text-green-600">${orderTotal}</span>
                </div>
              </div>
            </div>

            {/* 배송 정보 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-green-600" />
                배송 정보
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">배송 주소</h4>
                  <div className="text-gray-600 space-y-1">
                    <p className="font-medium">{customerInfo.name}</p>
                    <p>{customerInfo.address.street}</p>
                    <p>{customerInfo.address.city}, {customerInfo.address.state} {customerInfo.address.zipCode}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">예상 도착일</h4>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>{estimatedDelivery}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    평일 오전 9시-오후 6시 배송
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 액션 카드들 */}
          <div className="space-y-6">
            {/* 주요 액션 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold mb-4">다음 단계</h3>
              
              <div className="space-y-3">
                <button
                  onClick={onTrackOrder}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Truck className="w-5 h-5" />
                  주문 추적하기
                </button>
                
                <button
                  onClick={onDownloadReceipt}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  영수증 다운로드
                </button>
                
                <button className="w-full flex items-center justify-center gap-2 bg-blue-100 text-blue-700 py-3 px-4 rounded-lg hover:bg-blue-200 transition-colors">
                  <Share2 className="w-5 h-5" />
                  주문 공유하기
                </button>
              </div>
            </div>

            {/* 고객 지원 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">도움이 필요하신가요?</h3>
              <p className="text-sm text-gray-600 mb-4">
                설치나 제품에 대한 문의사항이 있으시면 언제든 연락주세요.
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">1588-1234 (평일 9시-6시)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">support@lightspace.com</span>
                </div>
              </div>
            </div>

            {/* 리뷰 요청 */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">만족스러우셨나요?</h3>
                <p className="text-sm text-gray-600 mb-3">
                  제품 설치 후 리뷰를 남겨주시면 다음 주문 시 10% 할인 쿠폰을 드려요!
                </p>
                <button className="w-full bg-yellow-400 text-gray-900 py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors font-medium">
                  리뷰 작성하고 할인받기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};