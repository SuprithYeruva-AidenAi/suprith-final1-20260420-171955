import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardService, type DashboardModel, type DashboardCard } from '@/services/dashboardService';
import { UOITimeoutError, UOIUnavailableError, UOIUpstreamError } from '@/api/uoi';

type CardState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'loaded'; card: DashboardCard };

function StatusBadge({ label }: { label: string }) {
  const color =
    label === 'In Force'
      ? 'bg-[#d8ffe2] text-[#38A169]'
      : label === 'Expired'
      ? 'bg-[#fff3cd] text-[#856404]'
      : 'bg-[#f0f0f0] text-[#6e6e6e]';
  return (
    <span className={`inline-flex items-center px-[8px] py-[4px] rounded-[4px] text-[12px] font-medium leading-[16.8px] ${color}`}>
      {label}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-[16px] p-[24px] bg-white rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-[20px] w-[120px] bg-[#e0e0e0] rounded" />
        <div className="h-[24px] w-[64px] bg-[#e0e0e0] rounded-[4px]" />
      </div>
      <div className="h-[14px] w-[180px] bg-[#e0e0e0] rounded" />
      <div className="h-[14px] w-[140px] bg-[#e0e0e0] rounded" />
      <div className="h-[14px] w-[160px] bg-[#e0e0e0] rounded" />
      <div className="h-[14px] w-[100px] bg-[#e0e0e0] rounded" />
    </div>
  );
}

function ErrorCard({ productCode, message, onRetry }: { productCode: string; message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col gap-[16px] p-[24px] bg-white rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] border border-[#dc3545]">
      <div className="flex items-center gap-[8px]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#dc3545" />
          <text x="10" y="15" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">!</text>
        </svg>
        <span className="text-[16px] font-bold leading-[24px] text-[#212121]">{productCode}</span>
      </div>
      <p className="text-[14px] leading-[21px] text-[#6e6e6e]">{message}</p>
      <button
        onClick={onRetry}
        className="self-start flex items-center justify-center px-[16px] py-[8px] bg-[#005eb8] rounded-[8px] text-[14px] font-medium leading-[21px] text-white cursor-pointer hover:opacity-90 transition-opacity"
      >
        Retry
      </button>
    </div>
  );
}

function PolicyCardLoaded({ card }: { card: DashboardCard }) {
  const hasCoverage = card.hasCoverage;

  const productLabel: Record<string, string> = {
    TR01: 'Travel Insurance',
    HM01: 'Home Insurance',
    MO01: 'Motor Insurance',
    DH01: 'Domestic Helper',
    PA01: 'Personal Accident',
  };

  return (
    <div className="flex flex-col gap-[16px] p-[24px] bg-white rounded-[16px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)]">
      {/* Card header */}
      <div className="flex items-center justify-between">
        <span className="text-[16px] font-bold leading-[24px] text-[#212121]">
          {card.productName || productLabel[card.productCode] || card.productCode}
        </span>
        <StatusBadge label={hasCoverage ? 'In Force' : 'Not Covered'} />
      </div>

      {card.errorMessage ? (
        <p className="text-[14px] leading-[21px] text-[#dc3545]">{card.errorMessage}</p>
      ) : !hasCoverage ? (
        <>
          <p className="text-[14px] leading-[21px] text-[#6e6e6e]">
            You are not currently covered under this product.
          </p>
          <button
            className="self-start flex items-center justify-center px-[16px] py-[8px] bg-white rounded-[8px] border border-[#005eb8] text-[14px] font-medium leading-[21px] text-[#005eb8] cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => {}}
          >
            Get a quote
          </button>
        </>
      ) : (
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <span className="text-[12px] leading-[16.8px] text-[#8d8d8d] w-[110px] shrink-0">Total Policies</span>
            <span className="text-[13px] leading-[19.5px] text-[#212121] font-medium">{card.totalPolicies}</span>
          </div>
          {card.recentItems.length > 0 && (
            <div className="flex flex-col gap-[6px] mt-[4px]">
              <span className="text-[12px] leading-[16.8px] text-[#8d8d8d]">Recent</span>
              {card.recentItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-[8px] py-[6px] border-b border-[#f0f0f0] last:border-0">
                  <span className="text-[13px] leading-[19.5px] text-[#212121] truncate">{item.title}</span>
                  {item.status && <StatusBadge label={item.status} />}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PolicyCard({
  productCode,
  cardState,
  onRetry,
}: {
  productCode: string;
  cardState: CardState;
  onRetry: () => void;
}) {
  if (cardState.status === 'loading') return <SkeletonCard />;
  if (cardState.status === 'error') {
    return (
      <ErrorCard
        productCode={productCode}
        message={cardState.message}
        onRetry={onRetry}
      />
    );
  }
  return <PolicyCardLoaded card={cardState.card} />;
}

const PRODUCT_CODES = ['TR01', 'HM01', 'MO01', 'DH01'] as const;
type ProductCode = (typeof PRODUCT_CODES)[number];

export default function PolicyDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<DashboardModel | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    DashboardService.getSummary()
      .then((data) => {
        if (!cancelled) {
          setModel(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          if (err instanceof UOITimeoutError) {
            setError('Request timed out. Please try again.');
          } else if (err instanceof UOIUnavailableError) {
            setError('Service is currently unavailable. Please try again later.');
          } else if (err instanceof UOIUpstreamError) {
            setError('An upstream error occurred. Please try again.');
          } else if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('An unexpected error occurred.');
          }
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount((c) => c + 1);
  };

  const getCardState = (productCode: ProductCode): CardState => {
    if (loading) return { status: 'loading' };
    if (error || !model) return { status: 'error', message: error ?? 'Failed to load policy data.' };
    const card = model.cards.find((c) => c.productCode === productCode);
    if (!card) return { status: 'error', message: 'No data available for this product.' };
    return { status: 'loaded', card };
  };

  const productLabel: Record<ProductCode, string> = {
    TR01: 'Travel Insurance',
    HM01: 'Home Insurance',
    MO01: 'Motor Insurance',
    DH01: 'Domestic Helper',
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-[Noto_Sans] bg-[#f5f7fa]">
      {/* Top nav */}
      <header className="w-full flex items-center justify-between px-[24px] md:px-[48px] py-[16px] bg-white shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)]">
        <img
          src="https://s3-alpha-sig.figma.com/img/26ec/3ab4/0588c7482da725dcdeb68b2897f9bde2?Expires=1777248000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=PSA09KnD8BDeEeZZ6cI~VtwcDg22Moj9P1AO5xeTXiY2OJx-KvohRLWP4pKNn82Yr9ydUl6NcjVgbc1hOwTD-Rywd-d1OnxemrSTgf0-pXlYz2parVqr49Sw1Gd3dnsRg-BLI3dWeI-TMa4dM1GVL74lZlH3ygrKx6Pyviq5vT9DPYqXEAmP0yu0I2USnzJAuFiD3vJXUmm2IbHEPc~ku69IKXveWcnCROgUSCdGQACnO4zfr-rq1g5~bkr-vOTF8SXKiVIeC8AwGjYJngONCgc41BfkoJhM1VotERpKTJfol4vxIaO~zccPFywRiKydECQS7nU0gULQlDtMU-VHFw__"
          alt="UOI Logo"
          className="w-[80px] h-[40px] object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
        <button
          onClick={() => navigate('/')}
          className="text-[14px] leading-[21px] text-[#005eb8] underline cursor-pointer bg-transparent border-none"
        >
          Log out
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-[24px] md:px-[48px] py-[40px]">
        <div className="flex flex-col gap-[8px] mb-[32px]">
          <h1 className="text-[32px] font-bold leading-[38.4px] text-[#212121]">My Policies</h1>
          <p className="text-[16px] leading-[24px] text-[#6e6e6e]">Overview of your current insurance coverage.</p>
        </div>

        {/* Top-level error state */}
        {!loading && error && (
          <div className="flex flex-col items-center gap-[16px] py-[48px]">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="#dc3545" fillOpacity="0.1" />
              <circle cx="24" cy="24" r="16" fill="#dc3545" />
              <text x="24" y="30" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">!</text>
            </svg>
            <p className="text-[16px] leading-[24px] text-[#212121] text-center">{error}</p>
            <button
              onClick={handleRetry}
              className="flex items-center justify-center px-[24px] py-[12px] bg-[#005eb8] rounded-[8px] text-[16px] font-medium leading-[24px] text-white cursor-pointer hover:opacity-90 transition-opacity"
            >
              Retry
            </button>
          </div>
        )}

        {/* Cards grid */}
        {(!error || loading) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-[24px]">
            {PRODUCT_CODES.map((code) => (
              <div key={code} className="flex flex-col gap-[8px]">
                <h2 className="text-[14px] font-medium leading-[21px] text-[#8d8d8d] uppercase tracking-wider">
                  {productLabel[code]}
                </h2>
                <PolicyCard
                  productCode={code}
                  cardState={getCardState(code)}
                  onRetry={handleRetry}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-row items-center justify-between px-[24px] py-[16px] bg-[#005eb8] shrink-0">
        <span className="text-[14px] leading-[21px] text-white">
          Copyright &copy; 2026 United Overseas Insurance Limited Co. Reg. No. 197100152R.
        </span>
        <span className="text-[14px] leading-[21px] text-right text-white">All Rights Reserved.</span>
      </footer>
    </div>
  );
}
