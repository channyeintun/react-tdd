import { useState } from "react";

const SignUpPage = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [apiProgress, setApiProgress] = useState(false);

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

    const submit = async (e) => {
        e.preventDefault();
        setApiProgress(true);
        await fetch("/api/1.0/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                email,
            }),
        });
        setApiProgress(false);
    };

    return (
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-10">
            <form onSubmit={submit} className="card mt-5">
                <div className="card-header">
                    <h1 className="text-center">Sign Up</h1>
                </div>
                <div className="card-body p-3">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            className="form-control"
                            id="username"
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            E-mail
                        </label>
                        <input
                            className="form-control"
                            id="email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            className="form-control"
                            id="password"
                            type="password"
                            onChange={onChangePassword}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordRepeat" className="form-label">
                            Password Repeat
                        </label>
                        <input
                            className="form-control"
                            id="passwordRepeat"
                            type="password"
                            onChange={onChangeRepeatPassword}
                        />
                    </div>
                    <div className="text-center">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={disabled || apiProgress}
                        >
                            {apiProgress && (
                                <span
                                    className="spinner-border spinner-border-sm"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                            Sign Up
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
