import { useState } from 'react';

export default function Admin() {
    const [form, setForm] = useState({ id: 'sg', oldResult: '', newResult: '', date: new Date().toISOString().split('T')[0] });
    const games = [{id:'sg',name:'SHREE GANESH'},{id:'fb',name:'FARIDABAD'},{id:'gb',name:'GAZIYABAD'},{id:'gl',name:'GALI'},{id:'l7',name:'LUCKY 7 NIGHT'},{id:'ds',name:'DISAWAR'}];

    const update = async () => {
        const name = games.find(g => g.id === form.id).name;
        const res = await fetch('/api/results', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...form, name })
        });
        if (res.ok) alert("Website Updated!");
    };

    return (
        <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#eee', minHeight: '100vh' }}>
            <div style={{ backgroundColor: 'white', padding: '20px', display: 'inline-block', border: '5px solid maroon' }}>
                <h2>Update Results</h2>
                <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '10px'}} /><br/>
                <select onChange={e => setForm({...form, id: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '10px'}}>
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select><br/>
                <input placeholder="Old (Left)" onChange={e => setForm({...form, oldResult: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '10px'}} /><br/>
                <input placeholder="New (Right)" onChange={e => setForm({...form, newResult: e.target.value})} style={{width: '100%', padding: '10px', marginBottom: '10px', fontSize: '20px', fontWeight: 'bold'}} /><br/>
                <button onClick={update} style={{ padding: '15px', width: '100%', backgroundColor: 'maroon', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>UPDATE LIVE & CHART</button>
            </div>
        </div>
    );
}
