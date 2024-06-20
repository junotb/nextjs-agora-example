const AGORA_API_DOMAIN = process.env.AGORA_API_DOMAIN!;
const AGORA_API_KEY = process.env.AGORA_API_KEY!;
const AGORA_PROJECT_ID = process.env.AGORA_PROJECT_ID!;
const AGORA_APP_ID = process.env.AGORA_APP_ID!;
const AGORA_APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE!;
const AGORA_CUSTOMER_ID = process.env.AGORA_CUSTOMER_ID!;
const AGORA_CUSTOMER_CERTIFICATE = process.env.AGORA_CUSTOMER_CERTIFICATE!;
const S3_BUCKET = process.env.S3_BUCKET!;
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY!;
const S3_SECRET_KEY = process.env.S3_SECRET_KEY!;

const getCredential = async () => {
  return btoa(`${AGORA_APP_ID}:${AGORA_APP_CERTIFICATE}`);
};

const createToken = async () => {
  /*{"token":string,"user":{"user_id":string,"user_auid":number,"screen_auid":number}}*/
  const data = await fetch(`${AGORA_API_DOMAIN}/v1/token/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': AGORA_API_KEY,
      'X-Project-ID': AGORA_PROJECT_ID,
    },
  })
    .then((res) => res.json());
  
  if (!data) return null;
  return data.token;
};

const createChannel = async (title: string, enable_pstn: boolean) => {
  /*{"id":number,"host_pass_phrase":string,"viewer_pass_phrase":string,"channel":string,"title":string,"pstn":null}*/
  const data = await fetch(`${AGORA_API_DOMAIN}/v1/channel`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': AGORA_API_KEY,
      'X-Project-ID': AGORA_PROJECT_ID,
    },
    body: JSON.stringify({ title, enable_pstn }),
  })
    .then((res) => res.json());
  
  if (!data) return null;
  return data;
}

const acquireResource = async (cname: string, uid: string) => {
  const token = await createToken();

  /*{"cname":string,"uid":string,"resourceId":string}*/
  const data = await fetch(`https://api.agora.io/v1/apps/${AGORA_APP_ID}/cloud_recording/acquire`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`
    },
    body: JSON.stringify({
      cname: cname,
      uid: uid,
      clientRequest: {
        startParameter: {
          storageConfig: {
            vendor: 1,
            region: 0,
            bucket: S3_BUCKET,
            accessKey: S3_ACCESS_KEY,
            secretKey: S3_SECRET_KEY,
            fileNamePrefix: [
              'recording'
            ]
          }            
        }
      }
    }),
  })
    .then(response => response.json());
  
  if (!data) return null;
  return data;
}

const startRecording = async (cname: string, uid: string, resourceId: string) => {
  const token = await createToken();

  /*{"cname":string,"uid":string,"resourceId":string,"sid":string}*/
  const data = await fetch(`https://api.agora.io/v1/apps/${AGORA_APP_ID}/cloud_recording/resourceid/${resourceId}/mode/mix/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${token}`
    },
    body: JSON.stringify({
      cname: cname,
      uid: uid,
      clientRequest: {
        startParameter: {
          storageConfig: {
            vendor: 1,
            region: 0,
            bucket: S3_BUCKET,
            accessKey: S3_ACCESS_KEY,
            secretKey: S3_SECRET_KEY,
            fileNamePrefix: [
              'recording'
            ]
          }            
        }
      }
    }),
  })
    .then(response => response.json());
  
  if (!data) return null;
  return data;
}