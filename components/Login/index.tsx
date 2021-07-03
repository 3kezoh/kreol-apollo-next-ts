import { useEffect } from "react";
import { Button, Modal } from "react-bulma-components";
import { useAuth } from "../Auth/useAuth";

export const Login = () => {
  const { close, show, user, withGoogle } = useAuth();

  useEffect(() => {
    if (user.isAuthenticated) close();
  }, [close, user]);

  return (
    <>
      <Modal show={show} onClose={close}>
        <Modal.Card>
          <Button onClick={withGoogle}>CONTINUER AVEC GOOGLE</Button>
        </Modal.Card>
      </Modal>
    </>
  );
};
