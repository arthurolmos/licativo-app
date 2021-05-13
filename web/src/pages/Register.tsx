import React from "react";
import { DefaultButton, Input, PublicBodyContainer } from "../components";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import ReactLoading from "react-loading";
import styled from "styled-components";

export function Register() {
  const history = useHistory();

  const { user, login } = React.useContext(AuthContext);

  const [loading, setLoading] = React.useState(true);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleLogin(
    e: React.MouseEvent<HTMLElement> | React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);
    } catch (err) {
      setLoading(false);
      console.log("LOGIN ERROR", err);
    }
  }

  React.useEffect(() => {
    setLoading(true);

    if (user) {
      setLoading(false);
      history.push("/panel");
    } else {
      setLoading(false);
    }
  }, [user, history]);

  return (
    <PublicBodyContainer>
      <>
        <Panel>
          <Logo src="./logo.jpg" />
          <Subtitle>REGISTRE-SE</Subtitle>

          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}
          >
            <Input
              label="Nome"
              placeholder="Nome"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              label="Sobrenome"
              placeholder="Sobrenome"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Input
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              placeholder="Senha"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div
              style={{
                margin: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {loading ? (
                <ReactLoading
                  type="bubbles"
                  color="teal"
                  height={100}
                  width={100}
                />
              ) : (
                <DefaultButton
                  type="submit"
                  text="Login"
                  action={handleLogin}
                />
              )}
            </div>
          </form>
        </Panel>
      </>
    </PublicBodyContainer>
  );
}

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 5px 10px 10px teal;
`;

const Logo = styled.img`
  max-width: 300px;
`;

const Subtitle = styled.h2``;
