import { useState, useEffect } from 'react';

export default function Admin() {
    // === Login State ===
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ user: '', pass: '' });
    
    // === Tabs State (New) ===
    const [activeTab, setActiveTab] = useState('update'); // 'update' या 'manage'

    // === Form State for Results ===
    const [form, setForm] = useState({ id: 'sg', oldResult: '', newResult: '', date: new Date().toISOString().split('T')[0] });
    const [loading, setLoading] = useState(false);

    // === Chart Management State (New) ===
    const [chartMonth, setChartMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
    const [chartData, setChartData] = useState([]);
    const [fetchingChart, setFetchingChart] = useState(false);

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

    // रिजल्ट अपडेट फंक्शन (Add/Edit दोनों के लिए काम करेगा)
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
                alert("✅ Website & Chart Updated Successfully!");
                if(activeTab === 'manage') fetchMonthChart(); // अगर चार्ट टैब में हैं तो रिफ्रेश करें
            } else {
                alert("❌ Error: Database not responding");
            }
        } catch (err) {
            alert("❌ Connection Error");
        }
        setLoading(false);
    };

    // === NEW: चार्ट का डेटा मँगवाने का फंक्शन ===
    const fetchMonthChart = async () => {
        setFetchingChart(true);
        try {
            const res = await fetch(`/api/results?month=${chartMonth}`);
            const data = await res.json();
            // डेटा को तारीख के हिसाब से सेट करें
            setChartData(data);
        } catch (err) {
            alert("❌ Chart load karne me error aayi");
        }
        setFetchingChart(false);
    };

    // === NEW: किसी एंट्री को Delete/Remove करने का फंक्शन ===
    const deleteRecord = async (recordDate, recordId) => {
        if (!window.confirm("क्या आप सच में इस नंबर को डिलीट करना चाहते हैं?")) return;
        try {
            // नोट: इसके लिए आपके बैकएंड /api/results में DELETE मेथड हैंडल होना चाहिए
            const res = await fetch(`/api/results?date=${recordDate}&id=${recordId}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                alert("✅ Record Deleted");
                fetchMonthChart(); // चार्ट फिर से लोड करें
            } else {
                alert("❌ Delete fail ho gaya");
            }
        } catch (err) {
            alert("❌ Connection Error in Delete");
        }
    };

    // === NEW: चार्ट से Edit बटन दबाने पर फॉर्म में डेटा भरने का फंक्शन ===
    const editRecord = (record) => {
        setForm({
            id: record.id,
            oldResult: record.oldResult || '',
            newResult: record.newResult || '',
            date: record.date
        });
        setActiveTab('update'); // वापस अपडेट टैब पर भेज दें
        window.scrollTo(0, 0);
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
        <div style={{ padding: '30px 10px', textAlign: 'center', backgroundColor: '#f4f4f4', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', display: 'inline-block', border: '5px solid #800000', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', maxWidth: '600px', width: '100%' }}>
                
                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <h2 style={{ color: '#800000', margin: 0 }}>SATTA NET PANEL</h2>
                    <button onClick={handleLogout} style={{ backgroundColor: '#000', color: '#fff', padding: '5px 10px', fontSize: '10px', cursor: 'pointer', border: 'none', borderRadius: '3px' }}>LOGOUT</button>
                </div>

                {/* === NEW: Navigation Tabs === */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <button 
                        onClick={() => setActiveTab('update')} 
                        style={{ flex: 1, padding: '10px', backgroundColor: activeTab === 'update' ? '#800000' : '#ddd', color: activeTab === 'update' ? '#fff' : '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Update/Add Result
                    </button>
                    <button 
                        onClick={() => { setActiveTab('manage'); fetchMonthChart(); }} 
                        style={{ flex: 1, padding: '10px', backgroundColor: activeTab === 'manage' ? '#800000' : '#ddd', color: activeTab === 'manage' ? '#fff' : '#000', fontWeight: 'bold', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Manage Chart
                    </button>
                </div>

                {/* ========================================= */}
                {/* TAB 1: UPDATE / ADD RESULTS (आपका पुराना कोड) */}
                {/* ========================================= */}
                {activeTab === 'update' && (
                    <div>
                        <p style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>तारीख चुनें (किस दिन का रिजल्ट डालना/बदलना है):</p>
                        <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '15px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px'}} />
                        
                        <p style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>गेम चुनें:</p>
                        <select value={form.id} onChange={e => setForm({...form, id: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px'}}>
                            {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                        </select>

                        <input placeholder="Old Result (Left) - Optional" value={form.oldResult} onChange={e => setForm({...form, oldResult: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '15px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px'}} />
                        <input placeholder="New Result (Right)" value={form.newResult} onChange={e => setForm({...form, newResult: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '20px', fontSize: '22px', fontWeight: 'bold', boxSizing: 'border-box', border: '2px solid #800000', borderRadius: '5px'}} />
                        
                        <button onClick={updateResult} disabled={loading} style={{ padding: '15px', width: '100%', backgroundColor: '#800000', color: 'white', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px', fontSize: '16px' }}>
                            {loading ? "Updating..." : "UPDATE WEBSITE & CHART"}
                        </button>
                    </div>
                )}

                {/* ========================================= */}
                {/* TAB 2: MANAGE CHART (नया फीचर) */}
                {/* ========================================= */}
                {activeTab === 'manage' && (
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <input 
                                type="month" 
                                value={chartMonth} 
                                onChange={e => setChartMonth(e.target.value)} 
                                style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} 
                            />
                            <button onClick={fetchMonthChart} style={{ padding: '10px 15px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                                Load Data
                            </button>
                        </div>

                        {fetchingChart ? <p>Loading chart data...</p> : (
                            <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #eee' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#800000', color: '#fff' }}>
                                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Date</th>
                                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Game</th>
                                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Result</th>
                                            <th style={{ padding: '8px', border: '1px solid #ddd' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chartData.length === 0 ? (
                                            <tr><td colSpan="4" style={{ textAlign: 'center', padding: '15px' }}>No Data Found</td></tr>
                                        ) : (
                                            chartData.map((record, idx) => (
                                                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff', textAlign: 'center' }}>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>{record.date}</td>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd', fontWeight: 'bold' }}>{record.name || record.id?.toUpperCase()}</td>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd', color: '#800000', fontWeight: 'bold' }}>{record.newResult}</td>
                                                    <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                                                        <button onClick={() => editRecord(record)} style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '4px 8px', marginRight: '5px', cursor: 'pointer', borderRadius: '3px' }}>Edit</button>
                                                        <button onClick={() => deleteRecord(record.date, record.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '4px 8px', cursor: 'pointer', borderRadius: '3px' }}>Del</button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>*किसी नंबर को ठीक करने के लिए Edit दबाएं। यह आपको वापस Update फॉर्म पर ले जाएगा।</p>
                    </div>
                )}
            </div>
        </div>
    );
                            }
                                                                                                                                                                      
