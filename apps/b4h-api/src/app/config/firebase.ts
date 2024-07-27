import { type App, cert, initializeApp } from 'firebase-admin/app';
import { type Auth, getAuth } from 'firebase-admin/auth';
import { type Firestore, getFirestore } from 'firebase-admin/firestore';
import { type Storage, getStorage } from 'firebase-admin/storage';

const firebaseKey = process.env['FIREBASE_KEY'] as string;
const firebasePrivateKey = process.env['FIREBASE_PRIVATE_KEY_ID'] as string;
const firebaseProjectId = process.env['FIREBASE_PROJECT_ID'] as string;
const firebaseClientEmail = process.env['FIREBASE_CLIENT_EMAIL'] as string;

let firebaseAdminApp: App;
let firebaseAdminFirestore: Firestore;
let firebaseAdminAuth: Auth;
let firebaseAdminStorage: Storage;

export const getFirebaseAdminApp = (): App => {
  firebaseAdminApp ??= initializeApp({
    // credential: cert({
    //   project_id: firebaseProjectId,
    //   client_email: firebaseClientEmail,
    //   private_key_id: firebasePrivateKey,
    //   private_key: firebaseKey.replace(/\\n/g, '\n')
    // } as any),
    credential: cert({
      type: 'service_account',
      project_id: 'lfmachadodasilva-dev',
      private_key_id: 'ffed905d3c8e73ea9f37fa477c994bbc556332c4',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDJEJK2z85AYTUn\niBwTW6RCNjSAa3BNTHz0t/8Ku8cdXCfm8XN4KjCVDxbzVaSFG0qxLamCz7U8jXM6\n3byc+TWS5PiJde8do6KgTHJvFsHHW+dIAE/RqkWgasdo9BidYDXkgyEGkkSddRx7\nceX7M3/EI5Om1Hg9Gv9h3WmmZ8TuYSRuNEyWt/QkvaUraDZyN9LbkkvcSnRFlNiu\nNcwn/u9UpzSg9KBTRG2HDKKZVlKk3MVEFDZ3dh0m3egWR/xlzyiv+upVF52KobDs\n/llM+IyoaWPyoN3SpKIX0AajpgltXrjWYLFYGiaRwttwgvzFNoymV6nvUDs0T/8G\nss+4Yf/VAgMBAAECggEAAjT2XJ9R9ORG6xTUCg+wG9ybHZW6+SjlGOKJdXAI3XT3\nfdIZ9wWvhtNQPdeAzh015//yTlyX8VQ0IZScJLTvi5nhHdEiO2xiX+lhkCqVxz8Q\n/iSoEPW80efvdw1xf7i19A4kZ1K6V2gY/0SJcQUTBUTGssa+PcggFCOUAfQ9oHLX\nhCndaS2yb4T4yhdOQbrTZDZxkqnnroc6mEFrFrY+3He6mANCy41QGqiO4pMaPXBp\nZc2RF84V1aG2w6J8CHBvNs4cCNLO5sU+CgPbnscdKztmETKYHYob2ZvI1RX587KZ\n0a6RXCU2CPoeJenwHLfZXFFMVwDvNMizh+OEiOq6wQKBgQD01ImxCMf4JeidAZ25\neq/adP8IE3rIIpiA74BbHEVsAldcoaOVXxy6digI0T7yDQtCLxT0mQbDyyF25oHk\n7ho22fJWuNfR6oYJHOrVeWd7E+Spdpj9GEfdYCfzkGz00lpiTyXDeijhjUC1PXYk\nPtSQNZT/3EjEafQGQjd0CuwMaQKBgQDSPOHNe0Y+8YT3ag2+ywQhjRHMhlPwT/pI\nRP3NDhjOCnNKryzt9NQR+pennSb7za5WZr6kURXLV6BOETKi4hGZIqu/aHbv1qA7\nLR4Vg1mR0Brskhj3sb3JU21QsHk+t0qAL065p2hO6lsTceSAvmOebXENI+U5cPJH\nzR/dEKiajQKBgBVCm45W/95plFCGAmdH4xtqS3ctEd1tO6b+pTvEMbcWYPW3R5hC\nASGj/wf8+6VTQqYFpqEy5KZ97jMAA0mY74fR1zx2oq8k2WzTKQVOnJDQgmvA07ou\nsJblsbJx2TRNS/H7g4D9C63CcVsLskWlexnmvUCWpW8A8GLWvzABfsv5AoGAdA8+\nDCR4g/jqkXcPfXsvnaH16HVjUy+jmE/V2GRm1x+3w8vuvrJAfGhdXh+ITMuf6Xyw\n058bq/SEv3QJAxhP5LzaGUF/HynZrLFcgT3QrYk3w89nTx3lCoYuu7OgSzn+O8Nh\n72V2VNJVUue14Ei6T9RU648cVNiAN5kKdQxkN2UCgYA7OZISpvGtKwUpkr5Jsxy6\n1xu6/jaiZaqFx0sAmF7CYDWaaMQGYisC0V76EeOz47C1NvBjBJe6Jnyg6HK7two6\nLg98LqrVb2rPsYJvn2Od8MiTRv93s6/MM3bW6+++aXUi6vVOR4vMV4+06OU+zf15\nHdLPmtBC4PbN5rekuPOc0w==\n-----END PRIVATE KEY-----\n',
      client_email: 'firebase-adminsdk-161wz@lfmachadodasilva-dev.iam.gserviceaccount.com',
      client_id: '107587945077183294620',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-161wz%40lfmachadodasilva-dev.iam.gserviceaccount.com',
      universe_domain: 'googleapis.com'
    } as any),
    projectId: firebaseProjectId,
    databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
    storageBucket: `${firebaseProjectId}.appspot.com`
  });
  return firebaseAdminApp;
};

export const getFirebaseAdminFirestore = () => {
  firebaseAdminFirestore ??= getFirestore(getFirebaseAdminApp());
  return firebaseAdminFirestore;
};

export const getFirebaseAdminAuth = () => {
  firebaseAdminAuth ??= getAuth(getFirebaseAdminApp());
  return firebaseAdminAuth;
};

export const getFirebaseAdminStorage = () => {
  firebaseAdminStorage ??= getStorage(getFirebaseAdminApp());
  return firebaseAdminStorage;
};
