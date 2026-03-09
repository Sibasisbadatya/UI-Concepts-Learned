import styles from "./Other.module.css";

console.log("STYLES OTHER", styles);

export function Other() {
  const el = document.createElement("h1");
  el.className = styles?.title;
  el.innerText = "Other Component";
  return el;
}

export function sayHello() {
  return "Hello World Duniya";
}