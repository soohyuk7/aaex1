import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import l1 from "@/assets/matterport/property-3.jpg";
import l2 from "@/assets/listing-2.jpg";
import l3 from "@/assets/listing-3.jpg";
import { SiteHeader } from "@/components/site-header";
import { Filter } from "lucide-react";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "지도 — 로커부동산중개법인" },
      { name: "description", content: "지도에서 매물 위치를 확인하세요." },
    ],
  }),
  component: MapPage,
});

const LISTINGS = [
  { id: 1, slug: "teheran-prime-office", img: l1, area: "강남구 · 역삼동", title: "테헤란로 프라임 오피스", price: 48000000000, priceStr: "₩ 480억", spec: "B4 / 15F · 연 6,200㎡ · 대지 760㎡", type: "프라임 오피스", yield: 1.1, landArea: 760, totalArea: 6200, lat: 37.502, lng: 127.039 },
  { id: 2, slug: "dosan-corner", img: l2, area: "강남구 · 신사동", title: "도산대로 코너 빌딩", price: 32000000000, priceStr: "₩ 320억", spec: "B2 / 8F · 연 3,400㎡ · 대지 420㎡", type: "코너 빌딩", yield: 2.1, landArea: 420, totalArea: 3400, lat: 37.522, lng: 127.033 },
  { id: 3, slug: "yeoksam-income", img: l3, area: "강남구 · 역삼동", title: "역삼 수익형 빌딩", price: 21500000000, priceStr: "₩ 215억", spec: "B2 / 7F · 연 2,800㎡ · 대지 360㎡", type: "수익형", yield: 3.1, landArea: 360, totalArea: 2800, lat: 37.498, lng: 127.036 },
  { id: 4, slug: "samsung-hq", img: l1, area: "강남구 · 삼성동", title: "삼성동 사옥형 빌딩", price: 54000000000, priceStr: "₩ 540억", spec: "B4 / 12F · 연 5,400㎡ · 대지 680㎡", type: "사옥형", yield: 4.1, landArea: 680, totalArea: 5400, lat: 37.511, lng: 127.058 },
  { id: 5, slug: "seocho-gangnam", img: l2, area: "서초구 · 서초동", title: "서초 강남대로 빌딩", price: 26000000000, priceStr: "₩ 260억", spec: "B3 / 9F · 연 3,100㎡ · 대지 410㎡", type: "수익형", yield: 4.5, landArea: 410, totalArea: 3100, lat: 37.494, lng: 127.013 },
  { id: 6, slug: "jamsil-main", img: l3, area: "송파구 · 잠실동", title: "잠실 메인 빌딩", price: 41000000000, priceStr: "₩ 410억", spec: "B3 / 11F · 연 4,800㎡ · 대지 590㎡", type: "프라임 오피스", yield: 6.1, landArea: 590, totalArea: 4800, lat: 37.513, lng: 127.100 },
];

function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [clustererInstance, setClustererInstance] = useState<any>(null);
  
  const [priceFilter, setPriceFilter] = useState("전체");
  const [landAreaFilter, setLandAreaFilter] = useState("전체");
  const [totalAreaFilter, setTotalAreaFilter] = useState("전체");
  const [yieldFilter, setYieldFilter] = useState("전체");

  const filteredListings = LISTINGS.filter((l) => {
    if (priceFilter !== "전체") {
      const limit = parseInt(priceFilter.replace(/[^0-9]/g, "")) * 100000000;
      if (l.price > limit) return false;
    }
    if (landAreaFilter !== "전체") {
      const limit = parseInt(landAreaFilter.replace(/[^0-9]/g, ""));
      if (l.landArea < limit) return false;
    }
    if (totalAreaFilter !== "전체") {
      const limit = parseInt(totalAreaFilter.replace(/[^0-9]/g, ""));
      if (l.totalArea < limit) return false;
    }
    if (yieldFilter !== "전체") {
      const limit = parseInt(yieldFilter.replace(/[^0-9]/g, ""));
      if (l.yield < limit) return false;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // @ts-ignore
    if (window.kakao && window.kakao.maps) {
      initMap();
      return;
    }

    const script = document.createElement("script");
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=57f311a217c25fabbd88c50ecfb75751&libraries=clusterer&autoload=false";
    document.head.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      window.kakao.maps.load(() => {
        initMap();
      });
    };
  }, []);

  const initMap = () => {
    if (typeof window === "undefined") return;
    // @ts-ignore
    if (!mapRef.current || !window.kakao) return;
    
    const options = {
      // @ts-ignore
      center: new window.kakao.maps.LatLng(37.505, 127.050),
      level: 6,
    };
    // @ts-ignore
    const map = new window.kakao.maps.Map(mapRef.current, options);
    setMapInstance(map);
    
    // @ts-ignore
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 5,
      calculator: [10, 30, 50],
      texts: (count: number) => count.toString(),
      styles: [{
        width: '30px', height: '30px',
        background: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '15px',
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        lineHeight: '30px'
      }]
    });
    setClustererInstance(clusterer);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    // @ts-ignore
    if (!mapInstance || !clustererInstance || !window.kakao) return;

    clustererInstance.clear();

    const newMarkers = filteredListings.map(l => {
      // @ts-ignore
      const marker = new window.kakao.maps.Marker({
        // @ts-ignore
        position: new window.kakao.maps.LatLng(l.lat, l.lng),
        title: l.title
      });

      // @ts-ignore
      window.kakao.maps.event.addListener(marker, 'click', function() {
        const el = document.getElementById(`listing-${l.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('bg-secondary');
          setTimeout(() => el.classList.remove('bg-secondary'), 1500);
        }
      });

      return marker;
    });

    clustererInstance.addMarkers(newMarkers);
    
    if (newMarkers.length > 0) {
      // @ts-ignore
      const bounds = new window.kakao.maps.LatLngBounds();
      newMarkers.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      mapInstance.setBounds(bounds);
    }
  }, [mapInstance, clustererInstance, filteredListings.map(l => l.id).join(",")]);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <SiteHeader />
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden border-t border-border mt-20">
        <div className="w-full lg:w-[45%] flex flex-col h-full border-r border-border bg-background z-10 shadow-xl">
          
          <div className="p-4 border-b border-border flex flex-wrap items-center gap-2 bg-secondary/10 shrink-0">
            <div className="flex items-center gap-2 mr-2">
              <Filter size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">필터</span>
            </div>
            
            <select 
              className="px-3 py-1.5 border border-border rounded-full bg-background text-sm cursor-pointer outline-none focus:ring-1 focus:ring-foreground transition-colors hover:border-foreground/50"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="전체">가격 (전체)</option>
              <option value="300억 이하">300억 이하</option>
              <option value="400억 이하">400억 이하</option>
              <option value="500억 이하">500억 이하</option>
            </select>

            <select 
              className="px-3 py-1.5 border border-border rounded-full bg-background text-sm cursor-pointer outline-none focus:ring-1 focus:ring-foreground transition-colors hover:border-foreground/50"
              value={landAreaFilter}
              onChange={(e) => setLandAreaFilter(e.target.value)}
            >
              <option value="전체">토지면적 (전체)</option>
              <option value="400㎡ 이상">400㎡ 이상</option>
              <option value="500㎡ 이상">500㎡ 이상</option>
              <option value="600㎡ 이상">600㎡ 이상</option>
            </select>

            <select 
              className="px-3 py-1.5 border border-border rounded-full bg-background text-sm cursor-pointer outline-none focus:ring-1 focus:ring-foreground transition-colors hover:border-foreground/50"
              value={totalAreaFilter}
              onChange={(e) => setTotalAreaFilter(e.target.value)}
            >
              <option value="전체">연면적 (전체)</option>
              <option value="3000㎡ 이상">3000㎡ 이상</option>
              <option value="4000㎡ 이상">4000㎡ 이상</option>
              <option value="5000㎡ 이상">5000㎡ 이상</option>
            </select>

            <select 
              className="px-3 py-1.5 border border-border rounded-full bg-background text-sm cursor-pointer outline-none focus:ring-1 focus:ring-foreground transition-colors hover:border-foreground/50"
              value={yieldFilter}
              onChange={(e) => setYieldFilter(e.target.value)}
            >
              <option value="전체">수익률 (전체)</option>
              <option value="3% 이상">3% 이상</option>
              <option value="4% 이상">4% 이상</option>
              <option value="5% 이상">5% 이상</option>
            </select>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
            <div className="text-sm font-medium text-foreground pb-2 border-b border-border">
              총 {filteredListings.length}개의 매물이 있습니다
            </div>
            {filteredListings.map(l => (
              <Link 
                key={l.id} 
                to={l.id === 1 ? "/listings/teheran-prime-office" : "/listings"}
                id={`listing-${l.id}`}
                className="flex flex-col sm:flex-row gap-5 group cursor-pointer p-3 -mx-3 rounded-xl transition-all hover:bg-secondary/40 block"
              >
                <div className="w-full sm:w-[200px] h-36 shrink-0 overflow-hidden rounded-lg relative bg-muted">
                  <img 
                    src={l.img} 
                    alt={l.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute top-2 left-2 bg-background/95 px-2 py-0.5 text-[10px] tracking-wider uppercase rounded-sm shadow-sm font-medium">
                    {l.type}
                  </div>
                </div>
                <div className="flex flex-col justify-center flex-1 py-1">
                  <span className="text-xs text-muted-foreground">{l.area}</span>
                  <h3 className="text-xl font-medium mt-1 font-display group-hover:underline underline-offset-4">{l.title}</h3>
                  <div className="mt-1.5 text-2xl font-bold tracking-tight" style={{ color: "#446fe7" }}>{l.priceStr}</div>
                  <div className="mt-auto pt-3 text-xs text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="bg-foreground text-background px-2 py-1 rounded-sm font-medium">수익률 {l.yield}%</span>
                    <span className="opacity-70">{l.spec}</span>
                  </div>
                </div>
              </Link>
            ))}
            
            {filteredListings.length === 0 && (
              <div className="py-24 text-center">
                <div className="text-muted-foreground mb-4">조건에 맞는 매물이 없습니다.</div>
                <button 
                  onClick={() => {
                    setPriceFilter("전체");
                    setLandAreaFilter("전체");
                    setTotalAreaFilter("전체");
                    setYieldFilter("전체");
                  }}
                  className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  필터 초기화
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="w-full h-[350px] lg:h-auto lg:w-[55%] relative shrink-0">
          <div ref={mapRef} className="w-full h-full bg-secondary" />
        </div>
      </div>
    </div>
  );
}