import { useState } from 'react';

export default function Admin() {
  const [formData, setFormData] = useState({ id: '', name: '', oldResult: '', newResult: '', time: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) alert("Data Updated Successfully!");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Update Live Result</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="ID (e.g. 1)" onChange={e => setFormData({...formData, id: e.target.value})} required style={{padding:'8px'}}/>
        <input placeholder="Game Name (e.g. GALI)" onChange={e => setFormData({...formData, name: e.target.value})} required style={{padding:'8px'}}/>
        <input placeholder="Old Result" onChange={e => setFormData({...formData, oldResult: e.target.value})} style={{padding:'8px'}}/>
        <input placeholder="New Result" onChange={e => setFormData({...formData, newResult: e.target.value})} style={{padding:'8px'}}/>
        <input placeholder="Time" onChange={e => setFormData({...formData, time: e.target.value})} style={{padding:'8px'}}/>
        <button type="submit" style={{ background: 'blue', color: 'white', padding: '10px' }}>Update Now</button>
      </form>
    </div>
  );
}
