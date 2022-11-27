import {atom} from "recoil";
import { v1 } from 'uuid';

export const subjAnsState = atom({
    key: `subjAnsState/${v1()}`,
    default: [{}, ],
});