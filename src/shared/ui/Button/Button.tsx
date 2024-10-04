import s from "./Button.module.css";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
}

const Button = ({ children, ...props }: Props) => {
    return (
        <button className={s.button} role="button" {...props}>{children}</button>
    )
};

export default Button;