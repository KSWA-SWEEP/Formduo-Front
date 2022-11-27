import {atom} from "recoil";
import { v1 } from 'uuid';

export const glbSvyContentsState = atom({
    key: `glbSvyContentsState/${v1()}`,
    default: [],
});