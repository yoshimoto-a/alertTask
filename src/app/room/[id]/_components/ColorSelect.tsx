import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Color } from "@prisma/client";

interface Props {
  color: Color;
  setColor: (childId: Color) => void;
}
export const ColorSelect: React.FC<Props> = ({ color, setColor }) => {
  const handleChange = (e: SelectChangeEvent<Color>) => {
    setColor(e.target.value as Color);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>カレンダーの色</InputLabel>
        <Select value={color} onChange={handleChange}>
          <MenuItem value={Color.BLUE}>
            <div className="w-5 h-5 rounded-full bg-calendar_blue">
              <span className="ml-7 block">青</span>
            </div>
          </MenuItem>
          <MenuItem value={Color.RED}>
            <div className="w-5 h-5 rounded-full bg-calendar_red">
              <span className="ml-7 block">赤</span>
            </div>
          </MenuItem>
          <MenuItem value={Color.GREEN}>
            <div className="w-5 h-5 rounded-full bg-calendar_green">
              <span className="ml-7 block">緑</span>
            </div>
          </MenuItem>
          <MenuItem value={Color.PINK}>
            <div className="w-5 h-5 rounded-full bg-calendar_pink">
              <span className="ml-7 block">ピンク</span>
            </div>
          </MenuItem>
          <MenuItem value={Color.PURPLE}>
            <div className="w-5 h-5 rounded-full bg-calendar_purple">
              <span className="ml-7 block">紫</span>
            </div>
          </MenuItem>
          <MenuItem value={Color.YELLOW}>
            <div className="w-5 h-5 rounded-full bg-calendar_yellow">
              <span className="ml-7 block">黄</span>
            </div>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
