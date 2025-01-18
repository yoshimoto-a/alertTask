import { Color } from "@prisma/client";

export const getColor = (colorName: Color) => {
  switch (colorName) {
    case Color.RED:
      return "calendar_red";
    case Color.PINK:
      return "calendar_pink";
    case Color.BLUE:
      return "calendar_blue";
    case Color.GREEN:
      return "calendar_green";
    case Color.YELLOW:
      return "calendar_yellow";
    case Color.PURPLE:
      return "calendar_purple";
  }
};
