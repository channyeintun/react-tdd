import { useState } from "react";

const SignUpPage = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
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

    const submit = (e) => {
        e.preventDefault();
        fetch("/api/1.0/users", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username,
                password,
                email,
            }),
        });
    };

    return (
        <form onSubmit={submit}>
            <h1>Sign Up</h1>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">E-mail</label>
            <input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input id="password" type="password" onChange={onChangePassword} />
            <label htmlFor="passwordRepeat">Password Repeat</label>
            <input
                id="passwordRepeat"
                type="password"
                onChange={onChangeRepeatPassword}
            />
            <button type="submit" disabled={disabled}>
                Sign Up
            </button>
        </form>
    );
};

export default SignUpPage;
