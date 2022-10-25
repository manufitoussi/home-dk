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

  if (props.f_rate === Rates.A) {
    return <span style={{ color: getColor() }}>auto</span>;
  }
  if (props.f_rate === Rates.B) {
    return <NightsStayIcon sx={{ color: getColor() }} />;
  }
  return (
    <span>
      {[...Array(getForce()).keys()].map((i) => getPictoForce(i, getColor()))}
    </span>
  );
};
enum Rates {
  A = 'A',
  B = 'B',
  V1 = '3',
  V2 = '4',
  V3 = '5',
  V4 = '6',
  V5 = '7',
}

Air.Rates = Rates;

export default Air;
