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
    case Dirs.None:
      return <NotInterestedIcon />;
    case Dirs.Vertical:
      return <SwapVertIcon />;
    case Dirs.Horizontal:
      return <SwapHorizIcon />;
    case Dirs.All:
      return <ThreeDRotationIcon />;
    default:
      return <NotInterestedIcon />;
  }
};
enum Dirs {
  None = '0',
  Vertical = '1',
  Horizontal = '2',
  All = '3',
}

Dir.Dirs = Dirs;

export default Dir;
