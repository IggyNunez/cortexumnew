import React, { useEffect, useState } from 'react';

const ImageTest = () => {
  const [assetsChecked, setAssetsChecked] = useState<{[key: string]: boolean}>({});
  
  const assetPaths = [
    '/assets/christian-colgate.webp',
    './assets/christian-colgate.webp',
    'assets/christian-colgate.webp',
    '../assets/christian-colgate.webp',
    '../../assets/christian-colgate.webp',
    '/public/assets/christian-colgate.webp',
    './public/assets/christian-colgate.webp',
    '../public/assets/christian-colgate.webp',
    '/assets/cortexuum-logo.png',
    './assets/cortexuum-logo.png',
    'assets/cortexuum-logo.png',
    '/assets/cortexuum-logo-full.svg',
    './assets/cortexuum-logo-full.svg', 
    'assets/cortexuum-logo-full.svg'
  ];
  
  useEffect(() => {
    // Check each asset
    assetPaths.forEach(path => {
      const img = new Image();
      img.onload = () => {
        setAssetsChecked(prev => ({ ...prev, [path]: true }));
      };
      img.onerror = () => {
        setAssetsChecked(prev => ({ ...prev, [path]: false }));
      };
      img.src = path;
    });
  }, []);
  
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Image Path Testing</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Asset Check Results:</h3>
        <ul className="space-y-2">
          {Object.entries(assetsChecked).map(([path, loaded]) => (
            <li key={path} className="flex items-center">
              <span className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${loaded ? 'bg-green-500' : 'bg-red-500'}`}>
                {loaded ? '✓' : '✗'}
              </span>
              <span className="font-mono text-sm">{path}</span>
              <span className="ml-3 text-sm font-medium">{loaded ? 'Loaded' : 'Failed'}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Christian's Image Tests:</h3>
        <div className="grid grid-cols-2 gap-4">
          {assetPaths.filter(path => path.includes('christian')).map(path => (
            <div key={path} className="border p-2">
              <p className="text-xs mb-1 font-mono">{path}</p>
              <img 
                src={path} 
                alt={`Test with ${path}`} 
                className="h-24 object-cover" 
                onError={(e) => {
                  e.currentTarget.style.border = '2px solid red';
                  e.currentTarget.alt = 'Failed to load';
                }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Logo Tests:</h3>
        <div className="grid grid-cols-2 gap-4">
          {assetPaths.filter(path => path.includes('logo')).map(path => (
            <div key={path} className="border p-2">
              <p className="text-xs mb-1 font-mono">{path}</p>
              <img 
                src={path} 
                alt={`Test with ${path}`} 
                className="h-16 object-contain" 
                onError={(e) => {
                  e.currentTarget.style.border = '2px solid red';
                  e.currentTarget.alt = 'Failed to load';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageTest;