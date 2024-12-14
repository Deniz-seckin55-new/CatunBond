import { SignUp } from '@clerk/nextjs'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.main_content}>
          <SignUp routing='path' path='/sign-up' fallbackRedirectUrl={'/app'} />
        </div>
      </div>
    </>
  );
}