import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Initialiser Firebase Admin SDK
export function initializeFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: "gestion-cabinet-avocat",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCSQsfzPb6meLBi\nZPzFTek8ExvmTaAQdVTvr1T+eD2RhWxUfxtzFwRCf75vsL5Ttu5maTA+B4RHdl8c\n+WEQlQwFETvU1dMwxjNTIFFKYTqMrCWj06LQOzTW28/JxmWLEeKxgxcIwXUiGMMp\nmz/GthD9zD4P3GJg4OZpobadzXd9NJ+9VcA/g4Fxf2vXUyfd5vPIeWshd3fcgPr0\nuMcxrwfTAPLaACL4o+3q1MwZrou8lpcnnEkXZoqxTK7jjw+W9Xjl0SQcZHtiTU8+\nTfzrV7booXXtOakXDAfs2nAFiOQrsbwYCVZkALbme5KPEFy/00nGiDaHtWp/WTeD\nxQY6WfvRAgMBAAECggEAF7OjbBiabPxr4QC/3EgcPsmooMaoOg05iWn0BRTT2Awz\nb5ygLyNmDlIIjgL/T4OlLeASmvVkNfcfF2FA8zX5b6zI8bGrpWDJGnRx7UgaUTI9\nxfGwQGcH0LW9qNNyIHpH2T+xcOV2J44JumlX3sohsMSeCLtMZKoCzNARpDroB9hL\nf+0i/c29gNczh6aeorZN6mKbrPQjdg41IaFBPWp3OtZV6skdgj/XSXryXuPUx9uX\nImDyIhP/s+79sf+b0R/QkQVsTl5lzW1PrOFOu0xDBbdkk7a8sxQGwtV4AWIgHSBN\nb1GpZsjv8+fK13fnuNcCRTfi28SaCzfqc+hONtV//QKBgQDLpC+ASawNPtmQ/eYX\nAgdnEyo49yfCWxig1wFsspHStrapF8aVegW+yMcrqIBFbuo9GmMs3R8tLGZTWEX0\n1vgRTuto/sWWlDTljFp/7pe6Tm1TWtsQEiov7VN6AagxAgkmFv0gkyF72J1pk53O\n/ZzZoEjMuxZWG4HGMmoLyKTk3wKBgQC33cWwObPsmEnYqMuS0L8QwuRMVFagBgYM\nbCjhu1vdN6rjvqHnJbQKzKsx2omdg4GVCV9YFD0FieF9RlzmHqhtTFVwt7BjwLC+\nfakP8GiTShf9YCjuQfx3nWZBObNMeHqa0W43+X0AloYF98YKMXp5l80bXvVAHspk\n0+mL8eEFTwKBgA3eJXn4CmZwhEJyd+vTMIvdaz+r3SJIL9osKiWr13BhDvle7CAb\nyi5e3+liNTIFRqBYnq5cdJYP8vv0A/eTeBs9o5xn1S7W8u866qLRrbV7R8ioZEio\n5ASVhdzGJh0IRXU5lY1VV69mZfndmp6Q+NB9MNf4WaINh33myv/4bvpDAoGBAI7v\ntTNeaGVRrnbkIf4skZxyJhDAr+cPR7x4iP+TK8M593u9Qxfy05hhq+TBw6HUDfTS\nqHBMq3OW0NkWzjmHM+BkKzfJVTL3JW+xOLDPcDywqR2sl6VBXweOMWQbeyvDrWyV\ny11wcqD2Y5JYIHjkJhZI0Iaqt3X1edoQc8r7arc5AoGAAY/ET3NSSBaXgqSofKDh\n3oCAxY+vWP9oB+K0h+Vrv0Dr15MphpZwiklnFX91IgH0w2GlYjJujGS/H5rlKJND\n299sKcM9aCZ086pywN1G9Ml1VJjiE4sXb5VvenBzeI3PcHJPhE1KicBL9fRyNOIZ\ntDZsYAX3s22tdNXEjMmdeMs=\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-fbsvc@gestion-cabinet-avocat.iam.gserviceaccount.com"
      }),
      databaseURL: "https://gestion-cabinet-avocat.firebaseio.com"
    });
  }
  return admin.app();
}

// Initialiser l'application Firebase
const app = initializeFirebaseAdmin();

// Exporter l'instance Firestore
export const db = getFirestore(app); 