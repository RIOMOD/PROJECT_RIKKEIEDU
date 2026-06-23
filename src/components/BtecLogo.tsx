import logoRikkeiedu from '../assets/logorikkeiedu.png';

interface BtecLogoProps {
  className?: string;
  height?: number | string;
}

export const BtecLogo = ({ className, height = 50 }: BtecLogoProps) => {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', height }}>
      <img
        src={logoRikkeiedu}
        alt="Rikkei Edu Logo"
        style={{
          height: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block'
        }}
      />
    </div>
  );
};
