import {atom} from "recoil";
import { v1 } from 'uuid';
import {getCookie} from "cookies-next";

export const refToken = atom({
    key: `refToken/${v1()}`,
    default: "",
});