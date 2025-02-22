import { ImageResponse } from 'next/og';
import Logo from '@/components/Logo';

export const runtime = 'edge';

export const alt = 'Couraça Digital';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to right, #1E3A8A, #3B82F6)',
          gap: '2rem',
        }}
      >
        <div style={{ width: '150px', height: '150px' }}>
          <Logo className="w-full h-full" />
        </div>
        <div
          style={{
            fontSize: '60px',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          Couraça Digital
        </div>
        <div
          style={{
            fontSize: '32px',
            color: '#E5E7EB',
            textAlign: 'center',
            maxWidth: '800px',
            marginTop: '1rem',
          }}
        >
          Soluções financeiras e proteção veicular com as melhores taxas do mercado
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
} 