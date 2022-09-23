import * as esbuild from 'esbuild-wasm';

import { useEffect, useRef, useState } from 'react';
import './App.css';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

const App = () => {
  const [input, setInput] = useState(`const App =()=> <div>hi there!</div>`);
  const [code, setCode] = useState('');
  const ref = useRef<any>()

  const startService = async () => {

    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm'
    })


  }

  useEffect(() => {
    startService();
  }, [])



  const onClick = async() => {
    if (!ref.current) return;

    // const result = await ref.current.transform(input, {
    //   loader: "jsx",
    //   target: "es2015"
    // })

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin()],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      }
    })


    console.log(result);
    setCode(result.outputFiles[0].text);
  }


  return (
    <div>
      <textarea style={{width:800, height:200, fontSize: 33}} value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre style={{fontSize: 33}}>{code}</pre>
    </div>
  );
}

export default App;
