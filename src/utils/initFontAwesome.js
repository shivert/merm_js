import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faEdit,
  faComments,
  faHeart,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faEnvelopeOpen
} from "@fortawesome/free-solid-svg-icons";

import { fab } from "@fortawesome/free-brands-svg-icons";

function initLibrary() {
  // fontawesome library initialization
  // add icons as needed

  library.add(
    faCog,
    faEdit,
    faComments,
    faHeart,
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faEnvelopeOpen,
    fab
  );
}

export { initLibrary };
