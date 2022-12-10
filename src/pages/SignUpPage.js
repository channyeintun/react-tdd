import { useState } from "react";

const SignUpPage = () => {
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangeRepeatPassword = (e) => {
        setPasswordRepeat(e.target.value);
    };

    let disabled = true;

    if (password && passwordRepeat) {
        disabled = password !== passwordRepeat;
    }
    
    return (
        <div>
            <h1>Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" />
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={onChangePassword} />
            <label htmlFor="passwordRepeat">Password Repeat</label>
            <input
                id="passwordRepeat"
                type="password"
                onChange={onChangeRepeatPassword}
            />
            <button type="button" disabled={disabled}>
                Sign Up
            </button>
        </div>
    );
};

export default SignUpPage;
