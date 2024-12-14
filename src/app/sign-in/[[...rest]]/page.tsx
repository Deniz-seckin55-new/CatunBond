import { SignIn } from '@clerk/nextjs'
import styles from './page.module.css'

export default function Page() {
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          <SignIn routing='path' path='/sign-in' fallbackRedirectUrl={'/app'} />
        </div>
      </div>
    </>
  );
}