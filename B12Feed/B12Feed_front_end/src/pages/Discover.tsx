import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { 
  FiSearch, 
  FiMapPin, 
  FiBell, 
  FiChevronDown, 
  FiFilter,
  FiClock
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import Logo from "../components/Logo";

const Discover: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <Sidebar />

      <main className="flex-1 ml-0 md:ml-[260px] bg-white pb-32 md:pb-10">
        
        {/* HEADER */}
        <header className="h-20 md:h-24 px-6 md:px-10 flex items-center justify-between bg-white sticky top-0 z-30 border-b border-gray-50/50">
          
          {/* LEFT AREA: Logo (Mobile) or Search (Desktop) */}
          <div className="flex items-center flex-1 h-full">
            {/* Mobile Logo: Nudged down with mt-1.5 for perfect icon alignment */}
            <div className="md:hidden scale-75 origin-left mr-4 transform translate-y-2">
              <Logo /> 
            </div>

            {/* Desktop Search Bar */}
            <div className="relative w-full max-w-md hidden md:block">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 size-5" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-[#058177]/5 outline-none transition-all"
              />
            </div>
          </div>

          {/* RIGHT AREA: Location and Notification */}
          <div className="flex items-center gap-3 h-full">
            {/* Location: Circle on mobile, Pill on desktop */}
            <div className="flex items-center justify-center bg-[#F0FDF4] w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2.5 rounded-full md:rounded-2xl text-[#058177]">
              <FiMapPin size={20} />
              <span className="hidden md:block ml-2 font-bold text-sm whitespace-nowrap">
                Downtown Toronto
              </span>
            </div>

            {/* Notification Bell */}
            <button className="p-2.5 md:p-3 rounded-xl border border-gray-100 bg-gray-50/30 text-neutral-600 relative flex items-center justify-center">
              <FiBell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="px-6 md:px-10 py-2">
          
          {/* Mobile Search (Shown below header on phones) */}
          <div className="relative mb-6 md:hidden mt-4">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 size-5" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50/50"
            />
          </div>

          {/* Filter Row */}
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar mt-4 md:mt-6">
            <FilterPill label="Near me" />
            <FilterPill label="Expiring soon" />
            <FilterPill label="Filters" icon={<FiFilter className="ml-2" />} />
          </div>

          {/* Grid Section */}
          <section className="mt-4">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Available food
              </h2>
              <button className="hidden md:flex items-center gap-2 text-sm font-bold border border-gray-100 rounded-xl px-4 py-2 hover:bg-gray-50">
                Sort by: <span className="text-neutral-500 font-semibold">Urgency</span>
                <FiChevronDown />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <FoodCard key={i} index={i} onClick={() => navigate(`/resource/${i}`)} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Nav Bar */}
      <MobileNav />
    </div>
  );
};

/* --- Sub-Components --- */

const FoodCard = ({ index, onClick }: { index: number; onClick: () => void }) => {
  const isPending = index === 2 || index === 5;
  const isUrgent = index === 3;
  return (
    <div onClick={onClick} className="group cursor-pointer bg-white rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative h-48 md:h-52 m-2 rounded-[20px] overflow-hidden">
        <div className="absolute top-3 left-3 z-10">
          <StatusPill type={isPending ? "pending" : "available"} />
        </div>
        <img src={`https://picsum.photos/seed/${index + 123}/600/400`} alt="Food" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5 pt-3">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-neutral-800 leading-tight">Assorted Fruits & Veg</h3>
          <UrgencyPill urgent={isUrgent} timeLeft={isUrgent ? "4H LEFT" : "23H LEFT"} />
        </div>
        <p className="text-sm font-medium text-neutral-400 mb-5">15 crates • 2.1 km away</p>
        <div className="flex justify-between items-center border-t border-gray-50 pt-4">
          <div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-0.5">Location</p>
            <p className="text-sm font-bold text-neutral-700">Downtown Food Hub</p>
          </div>
          <button className="bg-[#058177] hover:bg-[#046c64] text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors">Claim Now</button>
        </div>
      </div>
    </div>
  );
};

const FilterPill = ({ label, icon }: { label: string; icon?: React.ReactNode }) => (
  <button className="flex items-center bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-bold text-neutral-700 hover:border-[#058177] hover:text-[#058177] transition-all whitespace-nowrap">
    {label}{icon}
  </button>
);

const StatusPill = ({ type }: { type: "available" | "pending" }) => (
  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold ${type === "available" ? "bg-white/90 backdrop-blur-sm text-[#058177]" : "bg-orange-50/90 backdrop-blur-sm text-orange-700"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${type === "available" ? "bg-[#058177]" : "bg-orange-600"}`} />
    {type === "available" ? "Available" : "Pending pickup"}
  </span>
);

const UrgencyPill = ({ urgent, timeLeft }: { urgent: boolean; timeLeft: string }) => (
  <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${urgent ? "bg-red-50 text-red-600" : "text-neutral-500"}`}>
    <FiClock size={12} />{timeLeft}
  </div>
);

export default Discover;