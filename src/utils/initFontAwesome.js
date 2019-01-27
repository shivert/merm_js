import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faEdit,
  faComments,
  faHeart,
  faArrowAltCircleLeft,
  faArrowAltCircleRight
} from "@fortawesome/free-solid-svg-icons";

function initLibrary() {
  // fontawesome library initialization
  // add icons as needed

  library.add(
    faCog,
    faEdit,
    faComments,
    faHeart,
    faArrowAltCircleLeft,
    faArrowAltCircleRight
  );
}

export { initLibrary };
