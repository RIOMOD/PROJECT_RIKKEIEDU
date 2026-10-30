import logoRikkeiedu from '../assets/logorikkeiedu.png';

interface BtecLogoProps {
  className?: string;
  height?: number | string;
}

export const BtecLogo = ({ className, height = 50 }: BtecLogoProps) => {
  const numHeight = typeof height === 'number' ? height : parseInt(height as string) || 50;
  return (
    <div className={className} style={{ 
      display: 'inline-block', 
      height: numHeight, 
      width: numHeight * 2.8, 
      overflow: 'hidden', 
      position: 'relative' 
    }}>
      <img
        src={logoRikkeiedu}
        alt="Rikkei Edu Logo"
        style={{
          height: '100%',
          width: 'auto',
          maxWidth: 'none',
          position: 'absolute',
          left: 0,
          top: 0
        }}
      />
    </div>
  );
};
