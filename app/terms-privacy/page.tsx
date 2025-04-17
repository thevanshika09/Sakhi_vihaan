import Link from "next/link"
import Banner from "@/components/layout/Banner"
import BottomNavigation from "@/components/layout/BottomNavigation"
import styles from "@/styles/TermsPrivacy.module.css"

export default function TermsPrivacyPage() {
  return (
    <main className={styles.main}>
      <Banner />

      <div className={styles.content}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>
            ← Back to Home
          </Link>
          <h1>Terms & Privacy</h1>
        </div>

        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.active}`}>Terms of Service</button>
            <button className={styles.tab}>Privacy Policy</button>
          </div>

          <div className={styles.tabContent}>
            <div className={styles.termsSection}>
              <h2>Terms of Service</h2>
              <p className={styles.lastUpdated}>Last Updated: April 15, 2025</p>

              <div className={styles.section}>
                <h3>1. Acceptance of Terms</h3>
                <p>
                  By accessing or using SakhiPay, you agree to be bound by these Terms of Service. If you do not agree
                  to these terms, please do not use our service.
                </p>
              </div>

              <div className={styles.section}>
                <h3>2. Description of Service</h3>
                <p>
                  SakhiPay provides tools and services to help users identify and avoid online financial scams. Our
                  services include QR code scanning, UPI verification, community alerts, and educational resources.
                </p>
              </div>

              <div className={styles.section}>
                <h3>3. User Accounts</h3>
                <p>
                  To access certain features of SakhiPay, you may need to create an account. You are responsible for
                  maintaining the confidentiality of your account information and for all activities that occur under
                  your account.
                </p>
              </div>

              <div className={styles.section}>
                <h3>4. User Conduct</h3>
                <p>
                  You agree not to use SakhiPay for any illegal purposes or to conduct activities that may damage,
                  disable, or impair SakhiPay's functionality. You also agree not to post false or misleading
                  information.
                </p>
              </div>

              <div className={styles.section}>
                <h3>5. Content Ownership</h3>
                <p>
                  SakhiPay owns all rights to the content provided through our service, including but not limited to
                  text, graphics, logos, and software. Users retain ownership of content they submit, but grant SakhiPay
                  a license to use, modify, and display that content.
                </p>
              </div>

              <div className={styles.section}>
                <h3>6. Limitation of Liability</h3>
                <p>
                  SakhiPay is provided "as is" without warranties of any kind. We are not liable for any damages arising
                  from your use of our service.
                </p>
              </div>

              <div className={styles.section}>
                <h3>7. Changes to Terms</h3>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of SakhiPay after changes
                  constitutes acceptance of the modified terms.
                </p>
              </div>

              <div className={styles.section}>
                <h3>8. Termination</h3>
                <p>
                  We reserve the right to terminate or suspend your account and access to SakhiPay at our sole
                  discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful
                  to other users, us, or third parties, or for any other reason.
                </p>
              </div>
            </div>

            <div className={styles.privacySection} style={{ display: "none" }}>
              <h2>Privacy Policy</h2>
              <p className={styles.lastUpdated}>Last Updated: April 15, 2025</p>

              <div className={styles.section}>
                <h3>1. Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, such as when you create an account, use our
                  services, or communicate with us. This may include your name, email address, phone number, and content
                  you share.
                </p>
              </div>

              <div className={styles.section}>
                <h3>2. How We Use Your Information</h3>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, to develop new
                  services, and to protect SakhiPay and our users.
                </p>
              </div>

              <div className={styles.section}>
                <h3>3. Information Sharing</h3>
                <p>
                  We do not share your personal information with companies, organizations, or individuals outside of
                  SakhiPay except in the following cases:
                </p>
                <ul>
                  <li>With your consent</li>
                  <li>For legal reasons</li>
                  <li>With trusted service providers who work on our behalf</li>
                </ul>
              </div>

              <div className={styles.section}>
                <h3>4. Data Security</h3>
                <p>
                  We work hard to protect SakhiPay and our users from unauthorized access, alteration, disclosure, or
                  destruction of information we hold.
                </p>
              </div>

              <div className={styles.section}>
                <h3>5. Your Choices</h3>
                <p>
                  You can access, update, or delete your account information at any time through your account settings.
                  You can also choose to stop using our services at any time.
                </p>
              </div>

              <div className={styles.section}>
                <h3>6. Changes to This Policy</h3>
                <p>
                  We may change this privacy policy from time to time. We will notify you of any significant changes in
                  the way we treat your personal information.
                </p>
              </div>

              <div className={styles.section}>
                <h3>7. Contact Us</h3>
                <p>If you have any questions about this privacy policy, please contact us at privacy@sakhipay.com.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation activeTab={null} />
    </main>
  )
}
