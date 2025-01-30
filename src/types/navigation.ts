import { SvgIconComponent } from '@mui/icons-material';

export interface NavItem {
  text: string;
  url: string;
  className?: string;
  icon?: SvgIconComponent;
  children?: NavItem[];
}
