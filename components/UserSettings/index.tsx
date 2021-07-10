import styles from "./UserSettings.module.css";

type Props = { user: { isAuthenticated: boolean; id?: string; name?: string } };

export const UserSettings = ({ user }: Props) => {
  if (user) {
    return (
      <div className={styles.settings}>
        <div className={styles.name}>{user.name}</div>
      </div>
    );
  }
  return null;
};
