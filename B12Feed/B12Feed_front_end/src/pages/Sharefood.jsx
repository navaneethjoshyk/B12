import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Assuming your Sidebar is in components folder

const ShareFood = (
    
    // { user}
    ) => {
  const [formData, setFormData] = useState({
    foodTitle: '',
    category: '',
    description: '',
    quantity: '',
    unit: '',
    condition: 'Fresh',
    handling: '',
    fromTime: '',
    fromPeriod: 'AM',
    toTime: '',
    toPeriod: 'PM',
    pickupAddress: '',
    expiryDate: '',
    urgency: 'Medium'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
    // Add your fetch call here like we did for login!
  };
  
  const [user, setUser] = useState({
    firstName: 'Navaneeth',
    lastName: 'Kumar',
    email: 'navaneeth.kumar@example.com',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* 1. SIDEBAR COMPONENT */}
      <Sidebar user={user} />

      {/* 2. MAIN CONTENT AREA */}
      <main style={{ marginLeft: '260px', flex: 1, padding: '40px 60px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0' }}>Share Food</h1>
          <p style={{ color: '#6B7280', margin: 0 }}>Share surplus food with partner organizations.</p>
        </header>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '60px' }}>
          
          {/* LEFT COLUMN: FORM FIELDS */}
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <section>
              <h3 style={sectionHeaderStyle}>FOOD DETAILS</h3>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Food Title*</label>
                <input 
                  type="text" 
                  name="foodTitle" 
                  placeholder="e.g. Assorted fruits & vegetables" 
                  style={inputStyle} 
                  onChange={handleChange} 
                />
              </div>

              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Category*</label>
                <select name="category" style={inputStyle} onChange={handleChange}>
                  <option value="">Select a category</option>
                  <option value="produce">Produce</option>
                  <option value="bakery">Bakery</option>
                  <option value="dairy">Dairy</option>
                </select>
              </div>

              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Description*</label>
                <textarea 
                  name="description" 
                  placeholder="Any notes about packaging, quality, allergens..." 
                  style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }} 
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Quantity*</label>
                  <input type="text" name="quantity" placeholder="e.g. 15" style={inputStyle} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Unit*</label>
                  <select name="unit" style={inputStyle} onChange={handleChange}>
                    <option value="">Select a unit</option>
                    <option value="kg">kg</option>
                    <option value="lbs">lbs</option>
                    <option value="items">items</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <label style={labelStyle}>Condition*</label>
              <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                {['Fresh', 'Frozen', 'Shelf-stable', 'Prepared'].map((cond) => (
                  <label key={cond} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="condition" value={cond} checked={formData.condition === cond} onChange={handleChange} />
                    {cond}
                  </label>
                ))}
              </div>
            </section>

            {/* PICKUP WINDOW SECTION */}
            <section>
              <h3 style={sectionHeaderStyle}>PICKUP WINDOW</h3>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>From*</label>
                  <div style={timePickerContainerStyle}>
                    <input type="text" name="fromTime" placeholder="00:00" style={timeInputStyle} onChange={handleChange} />
                    <select name="fromPeriod" style={periodSelectStyle} onChange={handleChange}>
                      <option>AM</option><option>PM</option>
                    </select>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>To*</label>
                  <div style={timePickerContainerStyle}>
                    <input type="text" name="toTime" placeholder="00:00" style={timeInputStyle} onChange={handleChange} />
                    <select name="toPeriod" style={periodSelectStyle} onChange={handleChange}>
                      <option>PM</option><option>AM</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <label style={labelStyle}>Pickup Address*</label>
              <input type="text" name="pickupAddress" placeholder="e.g. (416) 555-0123" style={inputStyle} onChange={handleChange} />
            </section>

            {/* URGENCY SECTION */}
            <section>
              <h3 style={sectionHeaderStyle}>URGENCY</h3>
              <label style={labelStyle}>Expiry*</label>
              <input type="date" name="expiryDate" style={inputStyle} onChange={handleChange} />
              
              <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
                {['Low', 'Medium', 'High'].map((level) => (
                  <label key={level} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="radio" name="urgency" value={level} checked={formData.urgency === level} onChange={handleChange} />
                    {level}
                  </label>
                ))}
              </div>
            </section>

            <button type="submit" style={submitButtonStyle}>Post Food →</button>
          </div>

          {/* RIGHT COLUMN: UPLOAD BOX */}
          <div style={{ flex: 1 }}>
            <div style={uploadBoxStyle}>
              <div style={{ fontSize: '48px', color: '#9CA3AF', marginBottom: '10px' }}>📤</div>
              <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#00796B' }}>Click to upload</p>
              <p style={{ fontSize: '12px', color: '#9CA3AF' }}>PNG or JPG (Keep photos clear and close-up)</p>
            </div>
          </div>

        </form>
      </main>
    </div>
  );
};

// --- STYLES ---
const sectionHeaderStyle = { fontSize: '12px', letterSpacing: '1px', color: '#374151', marginBottom: '15px' };
const labelStyle = { display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px' };
const fieldGroupStyle = { marginBottom: '15px' };
const inputStyle = { 
  width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '14px', outline: 'none' 
};
const timePickerContainerStyle = { display: 'flex', border: '1px solid #D1D5DB', borderRadius: '8px', overflow: 'hidden' };
const timeInputStyle = { flex: 1, padding: '12px', border: 'none', outline: 'none' };
const periodSelectStyle = { border: 'none', borderLeft: '1px solid #D1D5DB', padding: '0 10px', background: '#F9FAFB' };
const uploadBoxStyle = {
  marginTop: '80px', height: '300px', border: '2px dashed #D1D5DB', borderRadius: '12px',
  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer'
};
const submitButtonStyle = {
  backgroundColor: '#00796B', color: '#fff', padding: '16px', borderRadius: '8px', border: 'none', 
  fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '20px'
};

export default ShareFood;