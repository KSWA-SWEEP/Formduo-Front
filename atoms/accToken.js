import {atom} from "recoil";
import {getCookie} from "cookies-next";
import { v1 } from 'uuid';

export const accToken = atom({
    key: `accToken/${v1()}`,
    default: "",
});