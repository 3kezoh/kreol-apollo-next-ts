import styles from "./UserSettings.module.css";

const UserSettings = ({ user }) => (
  <div className={styles.settings}>
    <div className={styles.name}>{user.name}</div>
  </div>
);
export default UserSettings;
