import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo'; 
import { 
  FiGrid, 
  FiShoppingBag, 
  FiLayers, 
  FiPlus, 
  FiUser,   
} from 'react-icons/fi';

const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  return (
    <div 
      /* className handles the responsive hiding/showing and standard positioning */
      className="hidden md:flex flex-col fixed left-0 top-0 bg-white z-50 border-r border-[#F3F4F6]"
      style={{
        width: '260px',
        height: '100vh',
        padding: '32px 20px',
      }}
    >
      <div style={{ flex: 1 }}>
        <Logo />
        
        <nav style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <SidebarLink icon={<FiGrid />} label="Discover" active onClick={() => navigate('/discover')} />
          <SidebarLink icon={<FiShoppingBag/>} label="My Claims" onClick={() => navigate('/my-claims')} />
          <SidebarLink icon={<FiLayers />} label="My Resources" onClick={() => navigate('/my-resources')} />
        </nav>

        <div style={{ marginTop: '32px' }}>
          <button 
            onClick={() => navigate('/share-food')}
            style={{
              width: '100%',
              backgroundColor: '#058177',
              color: 'white',
              padding: '14px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <FiPlus size={20} /> Share Food
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        padding: '12px',
        backgroundColor: '#F9FAFB',
        borderRadius: '16px'
      }}>
        <div style={{ 
          width: '44px', 
          height: '44px', 
          borderRadius: '50%', 
          backgroundColor: '#E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FiUser size={20} color="#9CA3AF" />
        </div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '14px', color: '#111827' }}>
            {user?.firstName} {user?.lastName}
          </p>
          <p style={{ 
            margin: 0, 
            fontSize: '12px', 
            color: '#6B7280', 
            whiteSpace: 'nowrap', 
            overflow: 'hidden', 
            textOverflow: 'ellipsis' 
          }}>
            {user?.organization || 'Community Member'}
          </p>
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ icon, label, active = false, onClick }: any) => (
  <div 
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      borderRadius: '12px',
      cursor: 'pointer',
      backgroundColor: active ? '#F0FDF4' : 'transparent',
      color: active ? '#058177' : '#6B7280',
      fontWeight: active ? '600' : '500',
    }}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default Sidebar;