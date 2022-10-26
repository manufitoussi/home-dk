import './Air.scss';
import NightsStayIcon from '@mui/icons-material/NightsStay';

const Air = (props: any) => {
  function getForce() {
    const rate = parseFloat(props.f_rate);
    if (isNaN(rate)) return 0;
    return rate - 2;
  }

  function getColor() {
    return props.color || 'currentColor';
  }

  function getPictoForce(force: number, color: string) {
    return (
      <span
        className="air-rectangle"
        key={`${force}_rect`}
        style={{
          height: `${0.3 + force * 0.3}em`,
          backgroundColor: color,
        }}
      />
    );
  }

  if (props.f_rate === Rate.A) {
    return <span style={{ color: getColor() }}>auto</span>;
  }
  if (props.f_rate === Rate.B) {
    return <NightsStayIcon sx={{ color: getColor() }} />;
  }
  return (
    <span>
      {[...Array(getForce()).keys()].map((i) => getPictoForce(i, getColor()))}
    </span>
  );
};
enum Rate {
  A = 'A',
  B = 'B',
  V1 = '3',
  V2 = '4',
  V3 = '5',
  V4 = '6',
  V5 = '7',
}

enum RateText {
  A = 'Automatique',
  B = 'Silencieux',
  V1 = 'Vitesse 1',
  V2 = 'Vitesse 2',
  V3 = 'Vitesse 3',
  V4 = 'Vitesse 4',
  V5 = 'Vitesse 5',
}

interface EnumType {
  [key: string]: string;
}

Air.Rate = Rate;
Air.RateText = RateText;
Air.getRateText = (rate:string) => (RateText as EnumType)[rate]; 
Air.getValueText = (value: string) => {
  const [rate] = Object.entries(Rate).find(([, v]) => v === value) as [string, string];
  return Air.getRateText(rate);
};

export default Air;
