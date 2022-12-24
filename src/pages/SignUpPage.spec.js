import SignUpPage from "./SignUpPage";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Sign Up Page", () => {
    describe("Layout", () => {
        it("has header", () => {
            render(<SignUpPage />);
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).toBeInTheDocument();
        });
        it("has username input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Username");
            expect(input).toBeInTheDocument();
        });
        it("has email input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("E-mail");
            expect(input).toBeInTheDocument();
        });
        it("has password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input).toBeInTheDocument();
        });
        it("has password type for password input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input.type).toBe("password");
        });
        it("has password repeat input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password Repeat");
            expect(input).toBeInTheDocument();
        });
        it("has password type for password repeat input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password Repeat");
            expect(input.type).toBe("password");
        });
        it("has Sign Up button", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeInTheDocument();
        });
        it("disables the button initially", () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeDisabled();
        });
    });
    describe("Interactions", () => {
        let button;
        const setup = () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("E-mail");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput =
                screen.getByLabelText("Password Repeat");
            userEvent.type(usernameInput, "user1");
            userEvent.type(emailInput, "user1@mail.com");
            userEvent.type(passwordInput, "P4ssword");
            userEvent.type(passwordRepeatInput, "P4ssword");
            button = screen.queryByRole("button", { name: "Sign Up" });
        };
        it("enables the button when password and password repeat fields have same value", () => {
            setup();
            expect(button).toBeEnabled();
        });
        it("sends username, email and password to backend after clicking the button", async () => {
            let requestBody;
            const server = setupServer(
                rest.post("/api/1.0/users", async (req, res, ctx) => {
                    requestBody = await req.json();
                    return res(ctx.status(200));
                })
            );
            server.listen();
            setup();

            userEvent.click(button);

            await new Promise((resolve) => setTimeout(resolve, 300));

            expect(requestBody).toEqual({
                username: "user1",
                email: "user1@mail.com",
                password: "P4ssword",
            });
        });
        it("displays spinner after clicking", async () => {
            const server = setupServer(
                rest.post("/api/1.0/users", async (req, res, ctx) => {
                    return res(ctx.status(200));
                })
            );
            server.listen();
            setup();
            let spinner = screen.queryByRole("status", { hidden: true });
            expect(spinner).not.toBeInTheDocument();
            userEvent.click(button);
            spinner = screen.getByRole("status", { hidden: true });
            expect(spinner).toBeInTheDocument();
        });
    });
});
