import { FC } from "react";
import { Display } from "./styles";

interface DisplayMaksProps {
  active: boolean | undefined;
  account: string | null | undefined;
  installed: boolean;
}

const conditionMessage = (
  active: boolean | undefined,
  account: string | null | undefined,
  installed: boolean
) => {
  return !installed ? (
    <span>You don't have the MetaMask plugin installed</span>
  ) : active ? (
    <span>
      Accounts: <b>{account}</b>
    </span>
  ) : (
    <span>No connection</span>
  );
};

export const DisplayMask: FC<DisplayMaksProps> = ({
  active,
  account,
  installed
}) => {
  const message = conditionMessage(active, account, installed);
  return <Display>{message}</Display>;
};
