const admin = require('firebase-admin');
const serviceAccount = require('./service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function checkKits() {
  const kitsSnap = await db.collection('kits').get();
  console.log(`Encontrados ${kitsSnap.size} kits.`);
  kitsSnap.docs.slice(0, 5).forEach(doc => {
    console.log(`Kit: ${doc.data().titulo}`);
  });

  const metaSnap = await db.collection('meta').get();
  console.log('Documentos em meta:');
  metaSnap.forEach(doc => {
    console.log(` - ${doc.id}: ${JSON.stringify(doc.data())}`);
  });
}

checkKits().catch(console.error);
