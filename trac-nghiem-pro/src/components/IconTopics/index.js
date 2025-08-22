import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import * as GrIcons from "react-icons/gr";
import * as RiIcons from "react-icons/ri";

const iconLibraries = {
  fa: FaIcons,
  io: IoIcons,
  gr: GrIcons,
  ri: RiIcons,
};

const IconTopics = ({iconName}) => {
  const library = iconLibraries[iconName.slice(0, 2).toLowerCase()];

  if (!library) {
    return <FaIcons.FaFire />;
  }

  const IconComponent = library[iconName];
  
  if (!IconComponent) {
    return <FaIcons.FaFire />;
  }
  return <IconComponent />;
};

export default IconTopics;