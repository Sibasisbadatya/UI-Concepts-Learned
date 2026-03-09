

import './style.css'
import { sayHello } from "./Other";
console.log(sayHello());

import {Other} from "./Other";
import {WebPack} from "./WebPack";

document.body.appendChild(Other());
document.body.appendChild(WebPack());