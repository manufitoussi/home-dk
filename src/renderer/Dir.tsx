import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import './Air.scss';

const Dir = (props: any) => {
  function getDir() {
    return props.f_dir;
  }

  switch (getDir()) {
    case DirEnum.None:
      return <NotInterestedIcon />;
    case DirEnum.Vertical:
      return <SwapVertIcon />;
    case DirEnum.Horizontal:
      return <SwapHorizIcon />;
    case DirEnum.All:
      return <ThreeDRotationIcon />;
    default:
      return <NotInterestedIcon />;
  }
};
enum DirEnum {
  None = '0',
  Vertical = '1',
  Horizontal = '2',
  All = '3',
}

enum DirText {
  None = 'Immobile',
  Vertical = 'Mouvements verticaux',
  Horizontal = 'Mouvements horizontaux',
  All = 'Mouvements dans les deux directions',
}

interface EnumType {
  [key: string]: string;
}

Dir.DirEnum = DirEnum;
Dir.DirTexts = DirText;

Dir.getDirText = (dir: string) => (DirText as EnumType)[dir];
Dir.getValueText = (value: string) => {
  const [dir] = Object.entries(DirEnum).find(([, v]) => v === value) as [string, string];
  return Dir.getDirText(dir);
};

export default Dir;
