import React, { useState } from "react";

function renderTree(obj, path = "") {
  if (obj === null || typeof obj !== "object") {
    return <div style={{marginLeft: 16}}><strong>{path}</strong>: {String(obj)}</div>;
  }

  if (Array.isArray(obj)) {
    return (
      <div style={{marginLeft: 16}}>
        <strong>{path} [array]</strong>
        {obj.map((item, i) => (
          <div key={i}>{renderTree(item, `${path}[${i}]`)}</div>
        ))}
      </div>
    );
  }

  return (
    <div style={{marginLeft: 16}}>
      <strong>{path} {"{object}"}</strong>
      {Object.keys(obj).map((k) => (
        <div key={k}>{renderTree(obj[k], path ? `${path}.${k}` : k)}</div>
      ))}
    </div>
  );
}

export default function App() {
  const [text, setText] = useState(`{
  "user": {
    "id": 1,
    "name": "John Doe",
    "address": {"city": "New York", "country": "USA"},
    "items": [{"name":"item1"}, {"name":"item2"}]
  }
}`);
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  const handleGenerate = () => {
    try {
      const parsed = JSON.parse(text);
      setData(parsed);
      setErr("");
    } catch (e) {
      setErr("Invalid JSON: " + e.message);
      setData(null);
    }
  };

  const handleClear = () => {
    setText("");
    setData(null);
    setErr("");
  };

  return (
    <div style={{fontFamily:"Arial, sans-serif", padding:20, maxWidth:980, margin:"auto"}}>
      <h1>JSON Tree Visualizer — Bonny</h1>

      <div style={{display:"flex", gap:20}}>
        <div style={{flex:1}}>
          <label><strong>Paste or type JSON</strong></label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={14}
            style={{width:"100%", padding:10, fontFamily:"monospace"}}
          />
          <div style={{marginTop:10}}>
            <button onClick={handleGenerate} style={{marginRight:8}}>Generate Tree</button>
            <button onClick={handleClear}>Clear</button>
          </div>
          {err && <div style={{color:"red", marginTop:8}}>{err}</div>}
        </div>

        <div style={{flex:1, background:"#fbfbfb", padding:12, borderRadius:6, minHeight:260, overflow:"auto"}}>
          <label><strong>Tree View</strong></label>
          <div style={{marginTop:8}}>
            {data ? renderTree(data) : <div style={{color:"#666"}}>No tree — click Generate Tree</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
