import { useState, useEffect } from 'react';

export default function Admin() {
    // Login State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ user: '', pass: '' });
    
    // Form State for Results
    const [form, setForm] = useState({ id: 'sg', oldResult: '', newResult: '', date: new Date().toISOString().split('T')[0] });
    const [loading, setLoading] = useState(false);

    const games = [
        { id: 'sg', name: 'SHREE GANESH' }, { id: 'fb', name: 'FARIDABAD' },
        { id: 'gb', name: 'GAZIYABAD' }, { id: 'gl', name: 'GALI CHOR' },
        { id: 'l7', name: 'LUCKY 7 NIGHT' }, { id: 'ds', name: 'DISAWAR' }
    ];

    // चेक करें कि क्या यूजर पहले से लॉग इन है (Session)
    useEffect(() => {
        const savedAuth = localStorage.getItem('satta_admin_auth');
        if (savedAuth === 'true') setIsLoggedIn(true);
    }, []);

    // लॉगिन फंक्शन
    const handleLogin = (e) => {
        e.preventDefault();
        if (loginData.user === 'satta1714' && loginData.pass === 'satta7714') {
            setIsLoggedIn(true);
            localStorage.setItem('satta_admin_auth', 'true');
        } else {
            alert("गलत Username या Password!");
        }
    };

    // लॉगआउट फंक्शन
    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('satta_admin_auth');
    };

    // रिजल्ट अपडेट फंक्शन
    const updateResult = async () => {
        setLoading(true);
        try {
            const name = games.find(g => g.id === form.id).name;
            const res = await fetch('/api/results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, name })
            });
            if (res.ok) {
                alert("✅ Website Updated Successfully!");
            } else {
                alert("❌ Error: Database not responding");
            }
        } catch (err) {
            alert("❌ Connection Error");
        }
        setLoading(false);
    };

    // अगर लॉग इन नहीं है, तो लॉगिन फॉर्म दिखाओ
    if (!isLoggedIn) {
        return (
            <div style={{ padding: '100px 20px', textAlign: 'center', backgroundColor: '#000', minHeight: '100vh', fontFamily: 'sans-serif' }}>
                <div style={{ backgroundColor: '#fff', padding: '40px 20px', display: 'inline-block', borderRadius: '15px', border: '4px solid #800000', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}>
                    <h2 style={{ color: '#800000', marginBottom: '20px' }}>🔐 ADMIN LOGIN</h2>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            onChange={(e) => setLoginData({...loginData, user: e.target.value})}
                            style={{ width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setLoginData({...loginData, pass: e.target.value})}
                            style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
                            required
                        />
                        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#800000', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                            LOGIN NOW
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // अगर लॉग इन है, तो एडमिन पैनल दिखाओ
    return (
        <div style={{ padding: '50px 10px', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <div style={{ backgroundColor: 'white', padding: '30px', display: 'inline-block', border: '5px solid #800000', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h2 style={{ color: '#800000', margin: 0 }}>SATTA NET PANEL</h2>
                    <button onClick={handleLogout} style={{ backgroundColor: '#000', color: '#fff', padding: '5px 10px', fontSize: '10px', cursor: 'pointer', border: 'none', borderRadius: '3px' }}>LOGOUT</button>
                </div>

                <p style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '5px' }}>तारीख चुनें:</p>
                <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '15px', boxSizing: 'border-box'}} />
                
                <p style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '5px' }}>गेम चुनें:</p>
                <select onChange={e => setForm({...form, id: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '15px'}}>
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>

                <input placeholder="Old Result (Left)" onChange={e => setForm({...form, oldResult: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '15px', boxSizing: 'border-box'}} />
                <input placeholder="New Result (Right)" onChange={e => setForm({...form, newResult: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '20px', fontSize: '22px', fontWeight: 'bold', boxSizing: 'border-box', border: '2px solid #800000'}} />
                
                <button onClick={updateResult} disabled={loading} style={{ padding: '15px', width: '100%', backgroundColor: '#800000', color: 'white', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px', fontSize: '16px' }}>
                    {loading ? "Updating..." : "UPDATE WEBSITE"}
                </button>
            </div>
        </div>
    );
}
